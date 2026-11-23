import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Creates loss-aware WebP derivatives for large images loaded by active pages.
// Originals remain untouched and downloadable; only display references switch.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = [
  'index.html', 'en/index.html', 'contacts.html', 'documents.html', 'partners.html', 'services.html',
  'mk101/index.html', 'en/contacts.html', 'en/documents.html', 'en/partners.html', 'en/services.html',
  'privacy/index.html',
  ...['ultra', 'acrylic', 'base', 'finish', 'epoxy', 'cable', 'therma-ultra', 'therma-epoxy', 'system-t-ultra', 'system-t-epoxy']
    .map((slug) => `products/${slug}.html`),
];
const threshold = 500_000;
const localBase = 'http://pyroflex.local/';
const absolute = (baseFile, reference) => {
  const clean = reference.trim().replace(/^['"]|['"]$/g, '');
  if (!clean || /^(?:data:|https?:|\/\/|#)/i.test(clean)) return null;
  try {
    const base = new URL(baseFile.replaceAll('\\', '/'), localBase);
    const target = new URL(clean, base);
    return path.resolve(root, `.${decodeURIComponent(target.pathname)}`);
  } catch {
    return null;
  }
};
const cssUrls = (text, baseFile) => {
  const found = [];
  for (const match of text.matchAll(/url\(\s*(["']?)([^"')]+)\1\s*\)/gi)) {
    const file = absolute(baseFile, match[2]);
    if (file) found.push(file);
  }
  return found;
};
const parseCandidates = (text, baseFile) => {
  const found = [];
  for (const match of text.matchAll(/\b(src|data-src|poster|srcset|data-srcset)\s*=\s*(["'])(.*?)\2/gi)) {
    if (match[1].toLowerCase().includes('srcset')) {
      for (const candidate of match[3].split(',')) {
        const url = candidate.trim().split(/\s+/)[0];
        const file = absolute(baseFile, url);
        if (file) found.push(file);
      }
    } else {
      const file = absolute(baseFile, match[3]);
      if (file) found.push(file);
    }
  }
  found.push(...cssUrls(text, baseFile));
  return found;
};

const stylesheets = new Set();
const candidates = new Set();
for (const page of pages) {
  const html = fs.readFileSync(path.join(root, page), 'utf8');
  for (const file of parseCandidates(html, page)) candidates.add(file);
  for (const match of html.matchAll(/\bhref\s*=\s*(["'])([^"']+\.css(?:[?#][^"']*)?)\1/gi)) {
    const file = absolute(page, match[2]);
    if (file && fs.existsSync(file)) stylesheets.add(file);
  }
}
for (const file of [...stylesheets]) {
  const relative = path.relative(root, file).replaceAll('\\', '/');
  const css = fs.readFileSync(file, 'utf8');
  for (const image of cssUrls(css, relative)) candidates.add(image);
}

const largeImages = [...candidates]
  .filter((file) => fs.existsSync(file) && fs.statSync(file).isFile())
  .filter((file) => /\.(?:png|jpe?g)$/i.test(file) && fs.statSync(file).size > threshold)
  .sort();
const derivatives = new Map();
const records = [];

for (const source of largeImages) {
  const output = source.replace(/\.(?:png|jpe?g)$/i, '.optimized.webp');
  if (!fs.existsSync(output)) {
    const result = spawnSync('magick', [
      source,
      '-strip',
      '-define', 'webp:method=6',
      '-define', 'webp:alpha-quality=100',
      '-quality', '90',
      output,
    ], { encoding: 'utf8' });
    if (result.status !== 0) {
      throw new Error(`ImageMagick failed for ${path.relative(root, source)}: ${result.stderr || result.error}`);
    }
  }
  if (!fs.existsSync(output) || fs.statSync(output).size === 0) {
    throw new Error(`No WebP derivative generated for ${path.relative(root, source)}`);
  }
  const originalSize = fs.statSync(source).size;
  const optimizedSize = fs.statSync(output).size;
  if (optimizedSize >= originalSize) {
    fs.rmSync(output);
    console.warn(`Skipped ${path.relative(root, source)}: WebP was not smaller.`);
    continue;
  }
  derivatives.set(path.resolve(source), path.resolve(output));
  records.push({ source, output, originalSize, optimizedSize });
}

const rewriteReference = (raw, baseFile) => {
  const match = raw.match(/^([^?#]*)([?#].*)?$/);
  if (!match) return raw;
  const source = absolute(baseFile, match[1]);
  const derivative = source && derivatives.get(path.resolve(source));
  if (!derivative) return raw;
  const optimizedPath = match[1].replace(/\.(?:png|jpe?g)$/i, '.optimized.webp');
  return `${optimizedPath}${match[2] || ''}`;
};
const rewriteUrls = (text, baseFile) => text.replace(/url\(\s*(["']?)([^"')]+)\1\s*\)/gi, (full, quote, raw) => {
  const next = rewriteReference(raw, baseFile);
  return next === raw ? full : `url(${quote}${next}${quote})`;
});
const rewriteHtml = (text, page) => {
  let result = text.replace(/\b(src|data-src|poster|srcset|data-srcset)\s*=\s*(["'])(.*?)\2/gi, (full, attr, quote, value) => {
    const next = attr.toLowerCase().includes('srcset')
      ? value.split(',').map((candidate) => candidate.replace(/^(\s*)(\S+)([\s\S]*)$/, (item, leading, url, trailing) => `${leading}${rewriteReference(url, page)}${trailing}`)).join(',')
      : rewriteReference(value, page);
    return next === value ? full : `${attr}=${quote}${next}${quote}`;
  });
  result = rewriteUrls(result, page);
  return result;
};

for (const page of pages) {
  const file = path.join(root, page);
  const original = fs.readFileSync(file, 'utf8');
  const next = rewriteHtml(original, page);
  if (next !== original) fs.writeFileSync(file, next, 'utf8');
}
for (const file of stylesheets) {
  const relative = path.relative(root, file).replaceAll('\\', '/');
  const original = fs.readFileSync(file, 'utf8');
  const next = rewriteUrls(original, relative);
  if (next !== original) fs.writeFileSync(file, next, 'utf8');
}

const beforeBytes = records.reduce((sum, item) => sum + item.originalSize, 0);
const afterBytes = records.reduce((sum, item) => sum + item.optimizedSize, 0);
console.log(JSON.stringify({
  converted: records.length,
  activeLargeImageBytesBefore: beforeBytes,
  activeLargeImageBytesAfter: afterBytes,
  savedBytes: beforeBytes - afterBytes,
  savedPercent: beforeBytes ? Math.round((beforeBytes - afterBytes) / beforeBytes * 100) : 0,
  records: records.map(({ source, output, originalSize, optimizedSize }) => ({
    source: path.relative(root, source).replaceAll('\\', '/'),
    derivative: path.relative(root, output).replaceAll('\\', '/'),
    originalSize,
    optimizedSize,
  })),
}, null, 2));
