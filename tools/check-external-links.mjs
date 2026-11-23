import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8') + fs.readFileSync(path.join(root, 'privacy/index.html'), 'utf8');
const urls = [...new Set([...html.matchAll(/\bhref\s*=\s*["'](https?:\/\/[^"']+)/gi)].map((m) => m[1].replaceAll('&amp;', '&')))];
const result = [];
for (const url of urls) {
  let status = 0;
  let method = 'HEAD';
  let error = '';
  try {
    let response = await fetch(url, { method, redirect: 'follow', signal: AbortSignal.timeout(15000) });
    status = response.status;
    if (status === 403 || status === 405 || status === 501) {
      method = 'GET';
      response = await fetch(url, { method, redirect: 'follow', signal: AbortSignal.timeout(15000), headers: { Range: 'bytes=0-0' } });
      status = response.status;
      await response.body?.cancel();
    }
  } catch (e) { error = e.message; }
  result.push({ url, method, status, ok: status >= 200 && status < 400, error: error || undefined, checkedAt: new Date().toISOString() });
  console.log(`${status || 'ERR'} ${method} ${url}${error ? ` — ${error}` : ''}`);
}
fs.writeFileSync(path.join(root, 'docs/external-checks.json'), JSON.stringify(result, null, 2), 'utf8');
if (result.some((item) => !item.ok)) process.exitCode = 1;
