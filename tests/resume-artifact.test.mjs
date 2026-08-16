import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pdfPath = resolve(projectRoot, 'public/files/Shawn_Salat_Resume.pdf');
const docxPath = resolve(projectRoot, 'public/files/Shawn_Salat_Resume.docx');

test('the approved 2026 PDF is the only published resume artifact', async () => {
  const pdf = await readFile(pdfPath);
  const sha256 = createHash('sha256').update(pdf).digest('hex');

  assert.equal(sha256, '33c805b3e9d745bff19c2c0f32b0c38bdd9dfb466aa9d14a59a3bedd95d13418');
  await assert.rejects(access(docxPath));
});
