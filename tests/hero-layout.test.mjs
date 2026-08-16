import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

test('candidate 20D is promoted without the prototype selector', async () => {
  const source = await readFile(resolve(projectRoot, 'src/pages/index.astro'), 'utf8');
  const css = await readFile(resolve(projectRoot, 'src/styles/global.css'), 'utf8');

  assert.match(source, /<section class="hero hero--selected"/);
  assert.match(source, /class="title-name">Shawn Salat<\/span><span class="title-separator"[^>]*>:<\/span><span class="title-type"><span class="title-role">\{profile\.title\}<\/span><span class="title-specialties">/);
  assert.match(source, /title-argument">Frontend/);
  assert.match(source, /title-argument">Backend/);
  assert.match(source, /title-argument">AI Systems/);
  assert.doesNotMatch(source, /HeaderTypographyPrototypeSwitcher|HeroLayoutPrototypeSwitcher|data-hero-layout/);
  assert.doesNotMatch(css, /data-header-variant|data-hero-layout|Direct-authored hero candidates/);
  assert.match(css, /\/\* Selected hero: candidate 20D/);
});

test('selected hero preserves header, photo-blurb, then CTA source order', async () => {
  const source = await readFile(resolve(projectRoot, 'src/pages/index.astro'), 'utf8');
  const heroStart = source.indexOf('<section class="hero hero--selected"');
  const header = source.indexOf('<h1 id="page-title"', heroStart);
  const body = source.indexOf('<div class="hero-body">', heroStart);
  const middle = source.indexOf('<div class="hero-middle">', body);
  const portrait = source.indexOf('<figure class="hero-portrait">', middle);
  const blurb = source.indexOf('<div class="hero-blurb">', middle);
  const cta = source.indexOf('<div class="hero-cta">', blurb);
  const actions = source.indexOf('<div class="actions"', cta);
  const actionsEnd = source.indexOf('</div>', actions);

  assert.ok(heroStart < header && header < body && body < middle);
  assert.ok(middle < portrait && portrait < blurb && blurb < cta);
  assert.ok(cta < actions && actions < actionsEnd);
  assert.doesNotMatch(source, /\.docx|alternate-download/i);
});

test('selected hero retains the 20D type hierarchy and implicit grouping', async () => {
  const css = await readFile(resolve(projectRoot, 'src/styles/global.css'), 'utf8');
  const rule = (selector) => {
    const start = css.indexOf(selector);
    return css.slice(start, css.indexOf('}', start) + 1);
  };

  assert.match(rule('.hero--selected h1'), /display:\s*flex/);
  assert.match(rule('.hero--selected h1'), /flex-wrap:\s*nowrap/);
  assert.match(rule('.hero--selected h1'), /font-family:\s*"Shawn Header Name"/);
  assert.match(rule('.hero--selected h1'), /font-size:\s*clamp\(1\.15rem, 2\.15vw, 1\.7rem\)/);
  assert.match(rule('.hero--selected .title-role'), /font-family:\s*"Shawn Header Role"/);
  assert.match(rule('.hero--selected .title-role'), /font-size:\s*1em/);
  assert.match(rule('.hero--selected .title-role'), /font-weight:\s*520/);
  assert.match(rule('.hero--selected .title-specialties'), /font-family:\s*"Shawn Header Detail"/);
  assert.match(rule('.hero--selected .title-specialties'), /font-size:\s*1em/);
  assert.match(css, /url\("\/fonts\/header-name\.woff2"\)/);
  assert.match(css, /url\("\/fonts\/header-role\.woff2"\)/);
  assert.match(css, /url\("\/fonts\/header-detail\.woff2"\)/);
  assert.match(rule('.hero--selected .intro'), /line-height:\s*1\.62/);
  assert.match(rule('.hero--selected .hero-middle'), /background:/);
  assert.doesNotMatch(rule('.hero--selected .hero-middle'), /\bborder:/);
  assert.match(rule('.hero--selected .spotify-strip'), /border:\s*0/);
  assert.match(rule('.hero--selected + .section'), /border-top:\s*0/);
});
