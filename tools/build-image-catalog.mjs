import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imageRoot = path.join(root, 'assets', 'images');
const names = (await readdir(imageRoot)).filter((name) => /\.(png|jpe?g|webp|svg)$/i.test(name)).sort();
const cards = names.map((name) => `<figure><img src="assets/images/${name}" alt="${name}"><figcaption>${name}</figcaption></figure>`).join('\n');
const html = `<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Библиотека изображений Пирофлекс</title><style>body{margin:0;padding:28px;background:#111418;color:#f7f8fa;font:14px Montserrat,Arial,sans-serif}h1{font-size:24px}main{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:14px}figure{margin:0;padding:12px;background:#1a1e24}img{width:100%;height:180px;object-fit:contain;background:#090a0c}figcaption{padding-top:10px;overflow-wrap:anywhere}</style><h1>Локальная библиотека изображений</h1><main>${cards}</main></html>`;
await writeFile(path.join(root, 'image-catalog.html'), html);
console.log(`Wrote image-catalog.html with ${names.length} labeled files.`);
