import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'dist');
const pages = [
  'index.html', 'contacts.html', 'documents.html', 'partners.html', 'services.html', 'image-catalog.html',
  'en/index.html', 'en/contacts.html', 'en/documents.html', 'en/partners.html', 'en/services.html',
  'mk101/index.html', 'mk101/copy.html', 'privacy/index.html',
  ...['ultra', 'acrylic', 'base', 'finish', 'epoxy', 'cable', 'therma-ultra', 'therma-epoxy', 'system-t-ultra', 'system-t-epoxy']
    .map((slug) => `products/${slug}.html`),
];
const copied = new Set();
const stylesheets = new Set();
const localOrigin = 'https://pyroflex.invalid/';

const withinRoot = (file) => {
  const relative = path.relative(root, file);
  return relative && !relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative);
};

function resolveReference(baseFile, raw) {
  const value = raw.trim().replace(/^['"]|['"]$/g, '').replaceAll('&amp;', '&');
  if (!value || /^(?:data:|https?:|[\/]{2}|mailto:|tel:|javascript:|blob:|#)/i.test(value)) return null;
  try {
    const base = new URL(baseFile.replaceAll('\\', '/'), localOrigin);
    const targetUrl = new URL(value, base);
    if (targetUrl.origin !== new URL(localOrigin).origin) return null;
    const target = path.resolve(root, `.${decodeURIComponent(targetUrl.pathname)}`);
    if (!withinRoot(target)) return null;
    if (fs.existsSync(target) && fs.statSync(target).isFile()) return target;
    const directoryIndex = path.join(target, 'index.html');
    if (fs.existsSync(directoryIndex) && fs.statSync(directoryIndex).isFile()) return directoryIndex;
  } catch {
    return null;
  }
  return null;
}

function collectHtmlReferences(html, page) {
  const refs = [];
  for (const match of html.matchAll(/\b(?:src|href|poster|data-src|srcset|data-srcset)\s*=\s*(["'])(.*?)\1/gi)) {
    if (/srcset/i.test(match[0])) {
      for (const entry of match[2].split(',')) refs.push(resolveReference(page, entry.trim().split(/\s+/)[0]));
    } else refs.push(resolveReference(page, match[2]));
  }
  for (const match of html.matchAll(/url\(\s*(["']?)([^"')]+)\1\s*\)/gi)) refs.push(resolveReference(page, match[2]));
  return refs.filter(Boolean);
}

function collectCssReferences(css, stylesheet) {
  const refs = [];
  for (const match of css.matchAll(/url\(\s*(["']?)([^"')]+)\1\s*\)/gi)) refs.push(resolveReference(stylesheet, match[2]));
  for (const match of css.matchAll(/@import\s+(?:url\()?\s*["']([^"']+)["']\s*\)?/gi)) refs.push(resolveReference(stylesheet, match[1]));
  return refs.filter(Boolean);
}

function copyFile(source) {
  if (copied.has(source)) return;
  copied.add(source);
  const relative = path.relative(root, source);
  const destination = path.join(output, relative);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
  if (path.extname(source).toLowerCase() === '.css') stylesheets.add(relative.replaceAll('\\', '/'));
}

function decoratePage(html, page) {
  const directory = path.posix.dirname(page);
  const manifestHref = path.posix.relative(directory === '.' ? '.' : directory, 'site.webmanifest') || 'site.webmanifest';
  const iconHref = path.posix.relative(directory === '.' ? '.' : directory, 'assets/site/icons/pwa-192.png');
  const registerSrc = path.posix.relative(directory === '.' ? '.' : directory, 'assets/site/pwa-register.js');
  const addition = [
    `<meta name="theme-color" content="#151719">`,
    `<link rel="manifest" href="${manifestHref}">`,
    `<link rel="icon" type="image/png" sizes="192x192" href="${iconHref}">`,
    `<link rel="apple-touch-icon" href="${iconHref}">`,
    `<script src="${registerSrc}" defer></script>`,
  ].join('\n  ');
  return /<\/head>/i.test(html) ? html.replace(/<\/head>/i, `  ${addition}\n</head>`) : `${addition}\n${html}`;
}

if (!withinRoot(output) || path.dirname(output) !== root || path.basename(output) !== 'dist') {
  throw new Error(`Refusing to build outside the generated dist folder: ${output}`);
}
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

for (const page of pages) {
  const source = path.join(root, page);
  if (!fs.existsSync(source)) throw new Error(`Required page is missing: ${page}`);
  const content = fs.readFileSync(source, 'utf8');
  const destination = path.join(output, page);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, decoratePage(content, page), 'utf8');
  copied.add(source);
  for (const resource of collectHtmlReferences(content, page)) copyFile(resource);
}

for (let cursor = 0; cursor < stylesheets.size; cursor += 1) {
  const stylesheet = [...stylesheets][cursor];
  const source = path.join(root, stylesheet);
  const css = fs.readFileSync(source, 'utf8');
  for (const resource of collectCssReferences(css, stylesheet)) copyFile(resource);
}

for (const required of ['assets/site/pwa-register.js', 'assets/site/icons/pwa-192.png', 'assets/site/icons/pwa-512.png']) {
  const source = path.join(root, required);
  if (!fs.existsSync(source)) throw new Error(`Required PWA asset is missing: ${required}`);
  copyFile(source);
}

const buildId = (process.env.GITHUB_SHA || new Date().toISOString()).replace(/[^a-zA-Z0-9-]/g, '').slice(0, 40);
const worker = fs.readFileSync(path.join(root, 'sw.js'), 'utf8').replaceAll('__BUILD_ID__', buildId);
fs.writeFileSync(path.join(output, 'sw.js'), worker, 'utf8');
fs.writeFileSync(path.join(output, 'site.webmanifest'), JSON.stringify({
  id: './',
  name: 'ПИРОФЛЕКС — огнезащитные системы и инженерные решения',
  short_name: 'ПИРОФЛЕКС',
  description: 'Огнезащитные материалы, системы и инженерные сервисы ПИРОФЛЕКС.',
  start_url: './',
  scope: './',
  display: 'standalone',
  background_color: '#151719',
  theme_color: '#151719',
  lang: 'ru',
  icons: [
    { src: './assets/site/icons/pwa-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
    { src: './assets/site/icons/pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
  ],
}, null, 2), 'utf8');
fs.writeFileSync(path.join(output, '.nojekyll'), '', 'utf8');
fs.writeFileSync(path.join(output, '404.html'), `<!doctype html>
<html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#151719"><title>Страница не найдена — ПИРОФЛЕКС</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#151719;color:#f5f5f5;font:16px/1.6 Montserrat,Arial,sans-serif}main{max-width:640px;padding:48px 24px;text-align:center}strong{display:block;color:#d84143;font-size:clamp(64px,15vw,120px);line-height:1}a{display:inline-block;margin-top:24px;padding:14px 20px;border-radius:8px;background:#d84143;color:#fff;text-decoration:none}</style>
<main><strong>404</strong><h1>Такой страницы нет</h1><p>Возможно, адрес изменился или ссылка устарела.</p><a href="./">На главную</a></main></html>\n`, 'utf8');

const bytes = [...copied].reduce((sum, file) => sum + fs.statSync(file).size, 0);
const outputFiles = [];
const walk = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(file);
    else outputFiles.push(file);
  }
};
walk(output);
const outputBytes = outputFiles.reduce((sum, file) => sum + fs.statSync(file).size, 0);
console.log(JSON.stringify({ pages: pages.length, copiedSourceFiles: copied.size, stylesheets: stylesheets.size, copiedSourceMB: +(bytes / 1_000_000).toFixed(1), deployFiles: outputFiles.length, deployMB: +(outputBytes / 1_000_000).toFixed(1), buildId, output: 'dist/' }, null, 2));
