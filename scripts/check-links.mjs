import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (
      entry.name === '.git' ||
      entry.name === 'node_modules' ||
      entry.name === '.design-runs' ||
      entry.name === '.orchestration'
    ) {
      continue;
    }

    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(target);
    } else if (entry.name.endsWith('.md')) {
      files.push(target);
    }
  }
}

walk(root);

const failures = [];
const linkPattern = /\[[^\]]*]\(([^)]+)\)/g;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');

  for (const match of content.matchAll(linkPattern)) {
    let target = match[1].trim().replace(/^<|>$/g, '');
    if (!target || /^(https?:|mailto:|#)/.test(target)) {
      continue;
    }

    target = target.split('#')[0];
    const resolved = path.resolve(path.dirname(file), decodeURIComponent(target));
    if (!fs.existsSync(resolved)) {
      failures.push(`${path.relative(root, file)} -> ${target}`);
    }
  }
}

if (failures.length > 0) {
  console.error(`깨진 내부 링크 ${failures.length}개`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`내부 링크 통과: Markdown ${files.length}개`);
