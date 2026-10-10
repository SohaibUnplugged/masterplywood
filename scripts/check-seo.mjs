import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';

const pages = JSON.parse(readFileSync('src/data/pages.json', 'utf8'));
const titles = new Set();
const descriptions = new Set();
for (const [route, { title, description }] of Object.entries(pages)) {
  assert(title.length >= 50 && title.length <= 60, `${route}: title has ${title.length} characters (expected 50–60)`);
  assert(description.length >= 140 && description.length <= 160, `${route}: description has ${description.length} characters (expected 140–160)`);
  assert(!titles.has(title), `${route}: duplicate title`);
  assert(!descriptions.has(description), `${route}: duplicate description`);
  titles.add(title); descriptions.add(description);
  assert(route === '/' || /^\/[a-z0-9/-]+$/.test(route) && !route.endsWith('/'), `${route}: invalid slug`);
  const source = route.startsWith('/catalogue/') ? 'src/app/catalogue/[brand]/page.tsx' : `src/app${route === '/' ? '' : route}/page.tsx`;
  assert(existsSync(source), `${route}: missing page`);
}
const catalogue = JSON.parse(readFileSync('src/data/catalogue.json', 'utf8'));
const ids = new Set();
const articleCodes = new Set();
for (const design of catalogue) {
  assert(!ids.has(design.id), `Duplicate design: ${design.id}`);
  ids.add(design.id);
  assert(typeof design.code === 'string' && design.code.trim().length > 0, `${design.id}: missing article code`);
  const articleKey = `${design.brand}:${design.code}`;
  assert(!articleCodes.has(articleKey), `${design.id}: duplicate article code ${articleKey}`);
  articleCodes.add(articleKey);
  for (const field of ['thumbnail', 'fullImage', 'sourcePdf']) assert(existsSync(`public${design[field]}`), `${design.id}: missing ${field}`);
  assert(design.width > 0 && design.height > 0 && design.sourcePage > 0, `${design.id}: invalid image or source dimensions`);
}
console.log(`Verified metadata for ${titles.size} pages, assets and unique article codes for ${ids.size} designs.`);
