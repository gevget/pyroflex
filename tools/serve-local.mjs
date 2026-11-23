import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rootArg = process.argv.findIndex((argument) => argument === '--root');
const root = rootArg >= 0 && process.argv[rootArg + 1]
  ? path.resolve(projectRoot, process.argv[rootArg + 1])
  : projectRoot;
const portArg = process.argv.findIndex((argument) => argument === '--port');
const port = portArg >= 0 && Number.isInteger(Number(process.argv[portArg + 1]))
  ? Number(process.argv[portArg + 1])
  : 4173;
const mime = new Map([
  ['.html', 'text/html; charset=utf-8'], ['.css', 'text/css; charset=utf-8'], ['.js', 'text/javascript; charset=utf-8'],
  ['.svg', 'image/svg+xml'], ['.png', 'image/png'], ['.jpg', 'image/jpeg'], ['.jpeg', 'image/jpeg'],
  ['.webp', 'image/webp'], ['.woff2', 'font/woff2'], ['.woff', 'font/woff'], ['.ttf', 'font/ttf'],
]);

createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const target = path.resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
    if (target !== root && !target.startsWith(`${root}${path.sep}`)) throw new Error('Forbidden');
    if (!(await stat(target)).isFile()) throw new Error('Not found');
    response.writeHead(200, { 'content-type': mime.get(path.extname(target).toLowerCase()) || 'application/octet-stream' });
    response.end(await readFile(target));
  } catch {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
}).listen(port, '127.0.0.1', () => console.log(`Pyroflex local site: http://127.0.0.1:${port} (root: ${root})`));
