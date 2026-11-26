import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const productPages = ['ultra', 'acrylic', 'base', 'finish', 'epoxy', 'cable', 'therma-ultra', 'therma-epoxy', 'system-t-ultra', 'system-t-epoxy'].map((slug) => `products/${slug}.html`);
const pages = ['index.html', 'en/index.html', 'contacts.html', 'documents.html', 'partners.html', 'services.html', 'mk101/index.html', 'mk101/copy.html', 'en/contacts.html', 'en/documents.html', 'en/partners.html', 'en/services.html', 'privacy/index.html', ...productPages];
const externalChecksFile = path.join(root, 'docs/external-checks.json');
const externalChecks = fs.existsSync(externalChecksFile)
  ? new Map(JSON.parse(fs.readFileSync(externalChecksFile, 'utf8')).map((item) => [item.url, item]))
  : new Map();
const issues = [];
const links = [];
const resources = new Set();
const idsByPage = new Map();
const htmlSources = new Map(pages.map((file) => [file, fs.readFileSync(path.join(root, file), 'utf8')]));
const decode = (value) => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const stripText = (value) => decode(value.replace(/<style\b[\s\S]*?<\/style>/gi, '').replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());

for (const [page, html] of htmlSources) {
  const ids = [...html.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)].map((m) => decode(m[1]));
  idsByPage.set(page, ids);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  for (const id of [...new Set(dupes)]) issues.push(`${page}: duplicate id #${id}`);
  const h1Count = [...html.matchAll(/<h1\b/gi)].length;
  if (h1Count !== 1) issues.push(`${page}: expected one h1; found ${h1Count}`);
  const imageTags = [...html.matchAll(/<img\b([^>]*)>/gi)].map((match) => match[1]);
  const sourcedImages = imageTags.filter((attrs) => /\bsrc\s*=\s*["'][^"']+["']/i.test(attrs));
  const imagesWithoutDimensions = sourcedImages.filter((attrs) => !/\bwidth\s*=\s*["'][^"']+["']/i.test(attrs) || !/\bheight\s*=\s*["'][^"']+["']/i.test(attrs));
  if (imagesWithoutDimensions.length) issues.push(`${page}: ${imagesWithoutDimensions.length} images missing width/height`);
  const expectedLang = page.startsWith('en/') ? 'en' : 'ru';
  if (!new RegExp(`<html\\b[^>]*\\blang\\s*=\\s*["']${expectedLang}["']`, 'i').test(html)) issues.push(`${page}: missing lang="${expectedLang}"`);

  for (const match of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a\s*>/gi)) {
    const attrs = match[1];
    const href = decode((attrs.match(/\bhref\s*=\s*["']([^"']*)["']/i) || [])[1] || '');
    if (!href) { links.push({ page, label: stripText(match[2]) || '(empty link)', href: '(missing)', kind: 'broken', status: 'FAIL' }); issues.push(`${page}: link without href: ${stripText(match[2]) || '(empty link)'}`); continue; }
    const label = stripText(match[2]) || (attrs.match(/aria-label\s*=\s*["']([^"']*)["']/i) || [])[1] || '(image/decorative link)';
    if (href.startsWith('#')) {
      const target = decode(href.slice(1));
      const ok = ids.includes(target);
      links.push({ page, label, href, kind: 'anchor', status: ok ? 'OK' : 'FAIL' });
      if (!ok) issues.push(`${page}: unresolved anchor ${href}`);
    } else if (/^(mailto:|tel:)/i.test(href)) {
      links.push({ page, label, href, kind: href.slice(0, href.indexOf(':')), status: 'OK' });
    } else if (/^https?:\/\//i.test(href)) {
      let host = '';
      try { host = new URL(href).hostname; } catch { /* invalid URL */ }
      const checked = externalChecks.get(href);
      const status = !host ? 'FAIL' : checked ? `${checked.status}${checked.ok ? ' OK' : ' FAIL'} (${checked.method})` : 'needs HTTP check';
      links.push({ page, label, href, kind: 'external', status });
      if (!host) issues.push(`${page}: invalid external URL ${href}`);
      if (checked && !checked.ok) issues.push(`${page}: external URL failed (${checked.status || checked.error}): ${href}`);
      if (attrs.includes('target="_blank"') && !/\brel\s*=\s*["'][^"']*noopener/i.test(attrs)) issues.push(`${page}: target=_blank without rel=noopener: ${href}`);
    } else {
      const parsed = new URL(href, new URL(page, 'http://local.test/'));
      const relative = decodeURIComponent(parsed.pathname).replace(/^\//, '');
      const target = path.join(root, relative || 'index.html');
      const candidates = [target, path.join(target, 'index.html'), `${target}.html`];
      const ok = candidates.some((file) => fs.existsSync(file) && fs.statSync(file).isFile());
      links.push({ page, label, href, kind: 'local', status: ok ? 'OK' : 'FAIL' });
      if (!ok) issues.push(`${page}: local link target missing: ${href}`);
    }
  }

  for (const match of html.matchAll(/\b(?:src|href)\s*=\s*["']([^"']+)["']/gi)) {
    const ref = decode(match[1]);
    if (/^(https?:|mailto:|tel:|#|data:|\/\/)/i.test(ref)) continue;
    const parsed = new URL(ref, new URL(page, 'http://local.test/'));
    const refPath = decodeURIComponent(parsed.pathname);
    const target = path.resolve(root, `.${refPath}`);
    if (path.extname(target)) resources.add(target);
  }
}

for (const stylesheet of [...resources].filter((file) => file.endsWith('.css'))) {
  if (!fs.existsSync(stylesheet)) { issues.push(`Missing stylesheet: ${path.relative(root, stylesheet)}`); continue; }
  const css = fs.readFileSync(stylesheet, 'utf8');
  for (const match of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)) {
    const ref = match[1].trim();
    if (/^(https?:|data:|\/\/|#)/i.test(ref)) continue;
    const target = path.resolve(path.dirname(stylesheet), decodeURIComponent(ref));
    resources.add(target);
  }
}

for (const resource of resources) {
  if (!fs.existsSync(resource) || !fs.statSync(resource).isFile()) issues.push(`Missing local resource: ${path.relative(root, resource)}`);
}

const activeFiles = [...pages.map((f) => path.join(root, f)), ...['assets/site/site.css', 'assets/site/site.js', 'assets/site/fonts.css', 'assets/site/product-detail.css', 'assets/site/utility-pages.css', 'assets/site/document-index.js', 'mk101/assets/css/mk101.css'].map((f) => path.join(root, f))];
for (const file of activeFiles) {
  const body = fs.readFileSync(file, 'utf8');
  if (/tilda|tildacdn|tildaapi|tildacopy/i.test(body)) issues.push(`${path.relative(root, file)} contains a platform reference`);
}

const external = [...new Set(links.filter((l) => l.kind === 'external').map((l) => l.href))];
const internals = links.filter((l) => ['anchor', 'local'].includes(l.kind));
const missing = links.filter((l) => l.status === 'FAIL');
const report = [
  '# Проверка ссылок автономного сайта', '',
  `Создано автоматически: ${new Date().toISOString()}. Проверяются активные страницы: ${pages.join(', ')}. Резервная страница reference.html в автономную сборку не входит.`, '',
  `Всего ссылок: **${links.length}**; локальные переходы/якоря: **${internals.length}**; внешние URL: **${external.length}**; обнаружено ошибок структуры: **${issues.length}**.`, '',
  fs.existsSync(externalChecksFile) ? 'Статусы внешних URL взяты из последнего запуска `node tools/check-external-links.mjs`; `mailto:` и `tel:` являются обработчиками устройства пользователя.' : 'HTTP-доступность внешних документов проверяется отдельно командой `node tools/check-external-links.mjs`; `mailto:` и `tel:` являются обработчиками устройства пользователя.', '',
  '| Страница | Ссылка | Назначение | Тип | Результат |', '|---|---|---|---|---|',
  ...links.map((l) => `| \`${l.page}\` | ${l.href.startsWith('http') ? `[${l.href}](${l.href})` : `\`${l.href}\``} | ${l.label.replace(/\|/g, '\\|')} | ${l.kind} | ${l.status} |`), '',
  '## Итог', '',
  ...(issues.length ? issues.map((issue) => `- **FAIL:** ${issue}`) : ['- Все внутренние якоря и локальные страницы разрешаются.', '- Все локальные CSS, JS, шрифты и медиа существуют.', '- В активных HTML/CSS/JS нет ссылок на платформенный runtime/CDN.']), '',
  'Поддержка отправки формы на сервер не настроена: форма открывает письмо через локальный почтовый клиент. Политика конфиденциальности — локальная страница с пометкой об ожидающем утверждении тексте.'
].join('\n');
fs.writeFileSync(path.join(root, 'docs/LINK_AUDIT.md'), report, 'utf8');
const summary = { pages, anchors: internals.filter((l) => l.kind === 'anchor').length, localPages: internals.filter((l) => l.kind === 'local').length, externalUrls: external.length, links: links.length, localResources: resources.size, sourcedImages: htmlSources.size ? [...htmlSources.values()].reduce((count, html) => count + [...html.matchAll(/<img\b([^>]*)>/gi)].filter((match) => /\bsrc\s*=\s*["'][^"']+["']/i.test(match[1])).length, 0) : 0, duplicateIds: issues.filter((x) => x.includes('duplicate id')).length, brokenLinks: missing.length, issues };
fs.writeFileSync(path.join(root, 'docs/audit-result.json'), JSON.stringify(summary, null, 2), 'utf8');
console.log(JSON.stringify(summary, null, 2));
if (issues.length) process.exitCode = 1;
