import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const casesRoot = path.join(root, 'case-studies');
const schemaPath = path.join(casesRoot, '_schema', 'case.schema.json');
const failures = [];

const allowed = {
  type: new Set(['workflow', 'shared-integration', 'organizational-capstone']),
  primary_domain: new Set([
    'customer-revenue',
    'people-collaboration',
    'finance-procurement',
    'data-operations',
    'shared-operations'
  ]),
  capabilities: new Set([
    'workflow-discovery',
    'data-contracts',
    'retrieval-analysis',
    'document-processing',
    'human-approval',
    'saas-integration',
    'identity-access',
    'transaction-reconciliation',
    'policy-checks',
    'master-data-controls',
    'event-driven-operations',
    'evaluation',
    'observability',
    'audit',
    'recovery',
    'reuse-governance'
  ]),
  status: new Set(['draft', 'ready', 'archived']),
  evidence_stage: new Set([
    'simulation-design',
    'public-simulation',
    'anonymized-practice',
    'limited-pilot',
    'operating-evidence'
  ]),
  readiness: new Set(['low', 'saas', 'it']),
  risk: new Set(['low', 'moderate', 'high']),
  write_impact: new Set([
    'none',
    'draft-only',
    'approved-sandbox-write',
    'approved-limited-write',
    'mixed'
  ])
};

const requiredFields = [
  '$schema',
  'id',
  'title',
  'type',
  'primary_domain',
  'difficulty',
  'capabilities',
  'recommended_after',
  'status',
  'evidence_stage',
  'readiness',
  'risk',
  'entry_channels',
  'systems',
  'write_impact',
  'autonomy',
  'project_stages',
  'verified_at',
  'owner',
  'limitations'
];
const allowedFields = new Set(requiredFields);

if (!fs.existsSync(schemaPath)) {
  failures.push('case-studies/_schema/case.schema.json 누락');
}

const indexFiles = [
  path.join(casesRoot, 'README.md'),
  path.join(root, 'en', 'case-studies', 'README.md')
];

for (const file of indexFiles) {
  if (!fs.existsSync(file)) {
    failures.push(`${path.relative(root, file)} 누락`);
  }
}

const directories = fs
  .readdirSync(casesRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name !== '_schema')
  .map((entry) => entry.name)
  .sort();

const ids = new Set();
const metadataById = new Map();
const evidenceStageLabels = new Map([
  ['simulation-design', '시뮬레이션 설계'],
  ['public-simulation', '공개 실행·평가'],
  ['anonymized-practice', '익명화 실습'],
  ['limited-pilot', '제한 파일럿'],
  ['operating-evidence', '운영 근거']
]);

function nonEmptyStringArray(value) {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((item) => typeof item === 'string' && item.trim().length > 0) &&
    new Set(value).size === value.length
  );
}

for (const directory of directories) {
  const relativeMetadata = `case-studies/${directory}/case.json`;
  const metadataPath = path.join(root, relativeMetadata);
  const koreanReadme = path.join(root, 'case-studies', directory, 'README.md');
  const englishReadme = path.join(root, 'en', 'case-studies', directory, 'README.md');

  for (const file of [metadataPath, koreanReadme, englishReadme]) {
    if (!fs.existsSync(file)) {
      failures.push(`${path.relative(root, file)} 누락`);
    }
  }

  if (!fs.existsSync(metadataPath)) {
    continue;
  }

  let metadata;
  try {
    metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
  } catch (error) {
    failures.push(`${relativeMetadata}: JSON 파싱 실패 (${error.message})`);
    continue;
  }

  for (const field of requiredFields) {
    if (!(field in metadata)) {
      failures.push(`${relativeMetadata}: ${field} 누락`);
    }
  }

  for (const field of Object.keys(metadata)) {
    if (!allowedFields.has(field)) {
      failures.push(`${relativeMetadata}: 허용되지 않은 필드 ${field}`);
    }
  }

  if (metadata.$schema !== '../_schema/case.schema.json') {
    failures.push(`${relativeMetadata}: $schema 경로 오류`);
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(metadata.id ?? '')) {
    failures.push(`${relativeMetadata}: id 형식 오류`);
  }

  if (metadata.id !== directory) {
    failures.push(`${relativeMetadata}: id와 디렉터리 이름이 다름`);
  }

  if (ids.has(metadata.id)) {
    failures.push(`${relativeMetadata}: 중복 id ${metadata.id}`);
  }
  ids.add(metadata.id);
  metadataById.set(metadata.id, metadata);

  if (
    !metadata.title ||
    typeof metadata.title.ko !== 'string' ||
    !metadata.title.ko.trim() ||
    typeof metadata.title.en !== 'string' ||
    !metadata.title.en.trim()
  ) {
    failures.push(`${relativeMetadata}: title.ko/title.en 오류`);
  }

  for (const field of ['type', 'status', 'evidence_stage', 'risk', 'write_impact']) {
    if (!allowed[field].has(metadata[field])) {
      failures.push(`${relativeMetadata}: 허용되지 않은 ${field}`);
    }
  }

  if (!allowed.primary_domain.has(metadata.primary_domain)) {
    failures.push(`${relativeMetadata}: 허용되지 않은 primary_domain`);
  }

  if (
    !Number.isInteger(metadata.difficulty) ||
    metadata.difficulty < 1 ||
    metadata.difficulty > 5
  ) {
    failures.push(`${relativeMetadata}: difficulty 오류`);
  }

  if (
    !Array.isArray(metadata.capabilities) ||
    metadata.capabilities.length === 0 ||
    new Set(metadata.capabilities).size !== metadata.capabilities.length ||
    metadata.capabilities.some((value) => !allowed.capabilities.has(value))
  ) {
    failures.push(`${relativeMetadata}: capabilities 오류`);
  }

  if (
    !Array.isArray(metadata.recommended_after) ||
    new Set(metadata.recommended_after).size !== metadata.recommended_after.length ||
    metadata.recommended_after.some(
      (value) =>
        typeof value !== 'string' ||
        !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) ||
        value === metadata.id
    )
  ) {
    failures.push(`${relativeMetadata}: recommended_after 오류`);
  }

  if (
    !Array.isArray(metadata.readiness) ||
    metadata.readiness.length === 0 ||
    new Set(metadata.readiness).size !== metadata.readiness.length ||
    metadata.readiness.some((value) => !allowed.readiness.has(value))
  ) {
    failures.push(`${relativeMetadata}: readiness 오류`);
  }

  for (const field of ['entry_channels', 'systems', 'limitations']) {
    if (!nonEmptyStringArray(metadata[field])) {
      failures.push(`${relativeMetadata}: ${field} 오류`);
    }
  }

  if (!/^A[0-4](?:-A[0-4])?$/.test(metadata.autonomy ?? '')) {
    failures.push(`${relativeMetadata}: autonomy 오류`);
  }

  if (
    !Array.isArray(metadata.project_stages) ||
    metadata.project_stages.length === 0 ||
    new Set(metadata.project_stages).size !== metadata.project_stages.length ||
    metadata.project_stages.some(
      (value) => !Number.isInteger(value) || value < 1 || value > 5
    )
  ) {
    failures.push(`${relativeMetadata}: project_stages 오류`);
  }

  const verifiedAt = metadata.verified_at ?? '';
  const verifiedDate = new Date(`${verifiedAt}T00:00:00Z`);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(verifiedAt) ||
    Number.isNaN(verifiedDate.valueOf()) ||
    verifiedDate.toISOString().slice(0, 10) !== verifiedAt
  ) {
    failures.push(`${relativeMetadata}: verified_at 형식 오류`);
  }

  if (typeof metadata.owner !== 'string' || !metadata.owner.trim()) {
    failures.push(`${relativeMetadata}: owner 오류`);
  }

  if (fs.existsSync(koreanReadme)) {
    const koreanReadmeContent = fs.readFileSync(koreanReadme, 'utf8');
    if (!koreanReadmeContent.includes('## 현재 실행물과 근거')) {
      failures.push(`${path.relative(root, koreanReadme)}: 현재 실행물과 근거 섹션 누락`);
    }
  }

  for (const file of indexFiles.filter((target) => fs.existsSync(target))) {
    const indexContent = fs.readFileSync(file, 'utf8');
    if (!indexContent.includes(`(${directory}/README.md)`)) {
      failures.push(`${path.relative(root, file)}: ${directory} 링크 누락`);
    }
  }

  const koreanIndex = indexFiles[0];
  if (fs.existsSync(koreanIndex)) {
    const koreanIndexContent = fs.readFileSync(koreanIndex, 'utf8');
    const evidenceLabel = evidenceStageLabels.get(metadata.evidence_stage);
    const evidenceLink =
      `[${evidenceLabel}](${directory}/README.md#현재-실행물과-근거)`;
    if (!koreanIndexContent.includes(evidenceLink)) {
      failures.push(
        `case-studies/README.md: ${directory}의 근거 단계 또는 바로가기 불일치`
      );
    }
  }
}

for (const [id, metadata] of metadataById) {
  for (const dependency of metadata.recommended_after) {
    if (!ids.has(dependency)) {
      failures.push(`case-studies/${id}/case.json: 존재하지 않는 recommended_after ${dependency}`);
    }
  }
}

if (failures.length > 0) {
  console.error(`사례 메타데이터 검사 실패 ${failures.length}건`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`사례 메타데이터 통과: ${directories.length}개`);
