import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function walk(directory) {
  const result = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') {
      continue;
    }

    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      result.push(...walk(target));
    } else {
      result.push(target);
    }
  }
  return result;
}

const requiredFiles = [
  'README.md',
  'LICENSE',
  'CONTRIBUTING.md',
  'CODE_OF_CONDUCT.md',
  'GOVERNANCE.md',
  'roadmap/role-model.md',
  'roadmap/competency-map.md',
  'roadmap/proficiency-levels.md',
  'delivery-lifecycle/README.md',
  'organization-maturity/README.md',
  'learning-paths/12-week-practice.md',
  'case-studies/beauty-d2c-voc/README.md',
  'research/ax-engineer-role-review.md',
  'research/source-policy.md'
];

const koreanMarkdownFiles = walk(root)
  .filter((file) => file.endsWith('.md'))
  .map((file) => path.relative(root, file).split(path.sep).join('/'))
  .filter(
    (file) =>
      !file.startsWith('en/') &&
      !file.startsWith('.github/') &&
      !file.startsWith('.claude/') &&
      !file.startsWith('site/')
  );

for (const file of koreanMarkdownFiles) {
  requiredFiles.push(`en/${file}`);
}

const lifecycleConfigs = [
  {
    directory: 'delivery-lifecycle',
    headings: ['## 목적', '## 주요 작업', '## 산출물', '## 통과 기준']
  },
  {
    directory: 'en/delivery-lifecycle',
    headings: ['## Purpose', '## Key activities', '## Deliverables', '## Exit criteria']
  }
];

for (const config of lifecycleConfigs) {
  for (let index = 1; index <= 8; index += 1) {
    const prefix = String(index).padStart(2, '0');
    const match = fs
      .readdirSync(path.join(root, config.directory))
      .find((name) => name.startsWith(`${prefix}-`) && name.endsWith('.md'));

    if (!match) {
      requiredFiles.push(`${config.directory}/${prefix}-*.md`);
    }
  }
}

const failures = [];
const retiredFiles = [
  'delivery-lifecycle/08-productization-and-scale.md',
  'research/existing-roadmaps-review.md',
  'en/delivery-lifecycle/08-productization-and-scale.md',
  'en/research/existing-roadmaps-review.md'
];

for (const file of new Set(requiredFiles)) {
  if (file.includes('*') || !fs.existsSync(path.join(root, file))) {
    failures.push(`필수 파일 누락: ${file}`);
  }
}

for (const file of retiredFiles) {
  if (fs.existsSync(path.join(root, file))) {
    failures.push(`이전 범위 파일이 남아 있음: ${file}`);
  }
}

const lifecycleCounts = [];

for (const config of lifecycleConfigs) {
  const lifecycleFiles = fs
    .readdirSync(path.join(root, config.directory))
    .filter((name) => /^\d{2}-.*\.md$/.test(name));

  lifecycleCounts.push(`${config.directory} ${lifecycleFiles.length}단계`);

  if (lifecycleFiles.length !== 8) {
    failures.push(`${config.directory}: 생애주기 문서가 8개가 아님`);
  }

  for (const file of lifecycleFiles) {
    const content = fs.readFileSync(path.join(root, config.directory, file), 'utf8');
    for (const heading of config.headings) {
      if (!content.includes(heading)) {
        failures.push(`${config.directory}/${file}: ${heading} 누락`);
      }
    }
  }
}

const blockedTerms = [
  '\uc640\uc774\uc5b4\ud2b8',
  '\ub354\ud30c\uc6b4\ub354\uc988',
  ['INTERVIEW', 'NOTE'].join('_'),
  ['/', 'Users', '/', 'woogi'].join(''),
  ['career', '-', 'docs', '/'].join('')
];

for (const file of walk(root).filter((target) => {
  const ignoredSegments = [
    `${path.sep}.claude${path.sep}goals${path.sep}`,
    `${path.sep}site${path.sep}dist${path.sep}`,
    `${path.sep}site${path.sep}.vinext${path.sep}`,
    `${path.sep}site${path.sep}.design-runs${path.sep}`
  ];
  return ignoredSegments.every((segment) => !target.includes(segment));
})) {
  const content = fs.readFileSync(file, 'utf8');
  for (const term of blockedTerms) {
    if (content.includes(term)) {
      failures.push(`${path.relative(root, file)}: 공개 금지 문자열 발견`);
    }
  }
}

if (failures.length > 0) {
  console.error(`로드맵 검사 실패 ${failures.length}건`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`로드맵 구조 통과: ${lifecycleCounts.join(', ')}, 영문 미러 ${koreanMarkdownFiles.length}개`);
