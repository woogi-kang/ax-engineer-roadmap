import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const casesRoot = path.join(root, 'case-studies');
const schemaPath = path.join(casesRoot, '_schema', 'case.schema.json');
const failures = [];

if (!fs.existsSync(schemaPath)) {
  failures.push('case-studies/_schema/case.schema.json 누락');
}

const schema = fs.existsSync(schemaPath)
  ? JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
  : { required: [], properties: {} };
const requiredFields = schema.required ?? [];
const allowedFields = new Set(Object.keys(schema.properties ?? {}));
const enumValues = (field) => new Set(schema.properties?.[field]?.enum ?? []);
const arrayEnumValues = (field) =>
  new Set(schema.properties?.[field]?.items?.enum ?? []);
const allowed = {
  type: enumValues('type'),
  primary_domain: enumValues('primary_domain'),
  industry: enumValues('industry'),
  capabilities: arrayEnumValues('capabilities'),
  status: enumValues('status'),
  evidence_stage: enumValues('evidence_stage'),
  readiness: arrayEnumValues('readiness'),
  risk: enumValues('risk'),
  writeImpact: enumValues('current_write_impact')
};

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
const learningOrders = new Set();
const metadataById = new Map();
const evidenceStageLabels = new Map([
  ['simulation-design', '시뮬레이션 설계'],
  ['public-simulation', '재현 가능한 공개 시뮬레이션'],
  ['anonymized-practice', '익명화 실습'],
  ['limited-pilot', '제한 파일럿'],
  ['operating-evidence', '운영 근거']
]);
const promotionDecisionCases = new Set([
  'public-service-petition-response',
  'credit-underwriting-review',
  'equipment-anomaly-maintenance',
  'care-conversation-record',
  'regulated-evidence-document'
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

  if (!Number.isInteger(metadata.learning_order) || metadata.learning_order < 1) {
    failures.push(`${relativeMetadata}: learning_order 오류`);
  } else if (learningOrders.has(metadata.learning_order)) {
    failures.push(`${relativeMetadata}: 중복 learning_order ${metadata.learning_order}`);
  } else {
    learningOrders.add(metadata.learning_order);
  }

  if (
    !metadata.title ||
    typeof metadata.title.ko !== 'string' ||
    !metadata.title.ko.trim() ||
    typeof metadata.title.en !== 'string' ||
    !metadata.title.en.trim()
  ) {
    failures.push(`${relativeMetadata}: title.ko/title.en 오류`);
  }

  for (const field of ['type', 'status', 'evidence_stage', 'risk']) {
    if (!allowed[field].has(metadata[field])) {
      failures.push(`${relativeMetadata}: 허용되지 않은 ${field}`);
    }
  }

  for (const field of ['current_write_impact', 'designed_write_impact']) {
    if (!allowed.writeImpact.has(metadata[field])) {
      failures.push(`${relativeMetadata}: 허용되지 않은 ${field}`);
    }
  }

  if (!allowed.primary_domain.has(metadata.primary_domain)) {
    failures.push(`${relativeMetadata}: 허용되지 않은 primary_domain`);
  }

  if (!allowed.industry.has(metadata.industry)) {
    failures.push(`${relativeMetadata}: 허용되지 않은 industry`);
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

  for (const field of ['current_autonomy', 'designed_autonomy']) {
    if (!/^A[0-4](?:-A[0-4])?$/.test(metadata[field] ?? '')) {
      failures.push(`${relativeMetadata}: ${field} 오류`);
    }
  }

  for (const field of ['implemented_project_stages', 'designed_project_stages']) {
    const stages = metadata[field];
    if (
      !Array.isArray(stages) ||
      (field === 'designed_project_stages' && stages.length === 0) ||
      new Set(stages).size !== stages.length ||
      stages.some((value) => !Number.isInteger(value) || value < 1 || value > 5)
    ) {
      failures.push(`${relativeMetadata}: ${field} 오류`);
    }
  }

  const designedStages = new Set(metadata.designed_project_stages ?? []);
  if (
    (metadata.implemented_project_stages ?? []).some(
      (stage) => !designedStages.has(stage)
    )
  ) {
    failures.push(`${relativeMetadata}: implemented_project_stages가 designed_project_stages의 부분집합이 아님`);
  }

  if (
    metadata.evidence_stage === 'simulation-design' &&
    (metadata.current_write_impact !== 'none' ||
      metadata.current_autonomy !== 'A0' ||
      metadata.implemented_project_stages?.length !== 0)
  ) {
    failures.push(
      `${relativeMetadata}: simulation-design의 현재 범위는 none / A0 / 빈 P 단계여야 함`
    );
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

  if (promotionDecisionCases.has(directory)) {
    const koreanContent = fs.readFileSync(koreanReadme, 'utf8');
    const englishContent = fs.readFileSync(englishReadme, 'utf8');
    if (!koreanContent.includes('## 9. 다음 결정')) {
      failures.push(`${path.relative(root, koreanReadme)}: 공개 실행 승격 조건 누락`);
    }
    if (!englishContent.includes('## 6. Next decision')) {
      failures.push(`${path.relative(root, englishReadme)}: public-simulation promotion gate missing`);
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

for (let order = 1; order <= directories.length; order += 1) {
  if (!learningOrders.has(order)) failures.push(`learning_order ${order} 누락`);
}

if (failures.length > 0) {
  console.error(`사례 메타데이터 검사 실패 ${failures.length}건`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`사례 메타데이터 통과: ${directories.length}개`);
