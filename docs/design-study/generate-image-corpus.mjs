import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), 'images');
await mkdir(root, { recursive: true });

const C = {
  ink: '#102a43',
  muted: '#52606d',
  orange: '#9c4221',
  orangeSoft: '#fde5d8',
  page: '#f7f9fc',
  soft: '#e8eef5',
  softer: '#f0f4f8',
  white: '#ffffff',
  line: '#bcccdc',
  green: '#2f7d5b',
  red: '#b42318',
};

const escapeXml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const text = (x, y, value, size = 22, weight = 500, fill = C.ink, anchor = 'start') =>
  `<text x="${x}" y="${y}" fill="${fill}" font-family="Segoe UI, Arial, sans-serif" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${escapeXml(value)}</text>`;
const box = (x, y, w, h, fill = C.white, stroke = 'none', radius = 18, sw = 2) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const line = (x1, y1, x2, y2, stroke = C.line, sw = 2, dash = '') =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
const circle = (cx, cy, r, fill = C.white, stroke = 'none', sw = 2) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const copyLines = (x, y, widths, gap = 20, color = C.muted, height = 8) =>
  widths.map((w, i) => `<rect x="${x}" y="${y + i * gap}" width="${w}" height="${height}" rx="${height / 2}" fill="${color}"/>`).join('');

const frame = (slug, titleValue, subtitle, body, description) => ({
  slug,
  svg: `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1200 720" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(titleValue)}</title>
  <desc id="desc">${escapeXml(description)}</desc>
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="${C.orange}"/></marker>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="${C.ink}" flood-opacity=".12"/></filter>
  </defs>
  <rect width="1200" height="720" fill="${C.page}"/>
  ${text(60, 66, titleValue, 34, 760)}
  ${text(60, 102, subtitle, 18, 500, C.muted)}
  ${body}
  ${line(60, 672, 1140, 672, C.line, 1)}
  ${text(60, 700, `DESIGN STUDY · ${slug.toUpperCase()}`, 13, 700, C.muted)}
</svg>`,
});

const images = [
  frame('01-hierarchy-signals', 'Hierarchy is a ranking, not a collection of boxes', 'Size, weight, contrast, and space can establish order before borders do.', `
    ${text(80, 160, 'EVERYTHING SHOUTS', 15, 760, C.red)}
    ${box(80, 185, 470, 400, C.white, C.line, 14)}
    ${box(110, 220, 410, 68, C.softer, C.line, 8)}${text(132, 264, 'SHAWN SALAT', 26, 760)}
    ${box(110, 310, 410, 68, C.softer, C.line, 8)}${text(132, 354, 'SOFTWARE ENGINEER', 26, 760)}
    ${box(110, 400, 410, 68, C.softer, C.line, 8)}${text(132, 444, 'INTRODUCTION', 26, 760)}
    ${box(110, 490, 410, 68, C.orangeSoft, C.orange, 8)}${text(315, 534, 'ACTION', 26, 760, C.orange, 'middle')}
    ${text(650, 160, 'ONE CLEAR PATH', 15, 760, C.green)}
    ${text(650, 250, 'Shawn Salat', 58, 760)}
    ${text(650, 292, 'Software Engineer', 24, 620, C.muted)}
    ${copyLines(650, 345, [410, 380, 330], 25, C.muted, 9)}
    ${box(650, 455, 215, 58, C.orange, 'none', 8)}${text(757, 492, 'Download resume', 18, 720, C.white, 'middle')}
    ${text(650, 552, 'The eye can explain the order instantly.', 17, 560, C.green)}
  `, 'A comparison between a bordered interface where every element has equal emphasis and a clean hierarchy using varied typography, contrast, and spacing.'),

  frame('02-alignment-axes', 'Alignment makes relationships visible', 'Every strong left edge is a promise that the elements belong together.', `
    ${text(90, 160, 'COMPETING AXES', 15, 760, C.red)}
    ${line(120, 190, 120, 590, C.red, 2, '8 8')}${line(260, 190, 260, 590, C.orange, 2, '8 8')}${line(390, 190, 390, 590, C.ink, 2, '8 8')}
    ${text(120, 235, 'Header', 38, 750)}
    ${circle(260, 340, 70, C.soft, C.white, 5)}
    ${copyLines(390, 285, [170, 150, 190, 125], 26)}
    ${box(390, 440, 155, 52, C.orange, 'none', 7)}${text(467, 473, 'Action', 17, 720, C.white, 'middle')}
    ${text(90, 570, 'Three unrelated starting points', 17, 560, C.red)}
    ${text(670, 160, 'SHARED AXIS', 15, 760, C.green)}
    ${line(730, 190, 730, 590, C.green, 3, '8 8')}
    ${text(730, 235, 'Header', 38, 750)}
    ${text(730, 292, 'Role and introduction', 22, 620, C.muted)}
    ${copyLines(730, 335, [360, 330, 285], 26)}
    ${box(730, 440, 155, 52, C.orange, 'none', 7)}${text(807, 473, 'Action', 17, 720, C.white, 'middle')}
    ${circle(650, 350, 52, C.soft, C.white, 4)}
    ${text(730, 570, 'One scan path; the portrait hangs from it', 17, 560, C.green)}
  `, 'A bad composition with three competing vertical axes contrasted with a composition where header, copy, and action share a single alignment.'),

  frame('03-proximity-grouping', 'Proximity should answer “what belongs together?”', 'Internal gaps stay smaller than gaps between groups.', `
    ${text(80, 160, 'AMBIGUOUS', 15, 760, C.red)}
    ${box(80, 190, 480, 390, C.white, 'none', 18)}
    ${text(120, 245, 'Heading', 28, 720)}${copyLines(120, 275, [350], 20)}
    ${text(120, 360, 'Supporting detail', 22, 620)}${copyLines(120, 392, [330], 20)}
    ${box(120, 480, 165, 52, C.orange, 'none', 7)}${text(202, 513, 'Continue', 17, 720, C.white, 'middle')}
    ${text(325, 510, 'Every gap = 60', 16, 650, C.red)}
    ${text(650, 160, 'GROUPED', 15, 760, C.green)}
    ${box(650, 190, 470, 390, C.white, 'none', 18)}
    ${text(690, 245, 'Heading', 28, 720)}${copyLines(690, 275, [350], 20)}
    ${line(1070, 245, 1070, 296, C.green, 3)}${text(1055, 326, '16', 14, 700, C.green)}
    ${text(690, 375, 'Supporting detail', 22, 620)}${copyLines(690, 407, [330], 20)}
    ${line(1070, 296, 1070, 375, C.orange, 3)}${text(1055, 360, '48', 14, 700, C.orange)}
    ${box(690, 482, 165, 52, C.orange, 'none', 7)}${text(772, 515, 'Continue', 17, 720, C.white, 'middle')}
    ${text(690, 560, 'Small inside; large between', 17, 560, C.green)}
  `, 'Two content cards show how equal gaps create ambiguity while smaller internal gaps and larger group gaps clarify relationships.'),

  frame('04-spacing-rhythm', 'Use a spacing scale, then make semantic choices', 'Consistency creates rhythm; meaning decides which step to use.', `
    ${text(80, 165, 'RANDOM VALUES', 15, 760, C.red)}
    ${[17, 29, 43, 22, 61].map((gap, i) => `${box(100, 210 + i * 72, 240 + i * 20, 28, C.soft, 'none', 5)}${text(465, 232 + i * 72, `${gap}px`, 16, 650, C.red)}`).join('')}
    ${text(650, 165, 'TOKEN SCALE', 15, 760, C.green)}
    ${[4, 8, 16, 24, 32, 48, 64].map((value, i) => `${box(680, 205 + i * 53, value * 5.5, 24, i < 3 ? C.soft : C.orangeSoft, 'none', 4)}${text(1045, 224 + i * 53, `${value}`, 15, 700, i < 3 ? C.muted : C.orange)}`).join('')}
    ${text(680, 605, 'Choose 8 for tight pairs, 24 for groups, 48 for sections.', 17, 560, C.green)}
  `, 'Random spacing values are contrasted with a limited token scale used for different semantic relationships.'),

  frame('05-typography-measure', 'Typography is layout', 'Measure, line height, weight, and baseline determine reading comfort and hierarchy.', `
    ${text(80, 160, 'TOO WIDE / TOO TIGHT', 15, 760, C.red)}
    ${box(80, 190, 1040, 145, C.white, 'none', 16)}
    ${text(110, 235, 'A long line forces the eye to travel far and makes the next line harder to locate.', 22, 500, C.muted)}
    ${text(110, 266, 'Tight leading turns multiple lines into a dense texture instead of readable prose.', 22, 500, C.muted)}
    ${text(80, 395, 'CONTROLLED MEASURE / OPEN LEADING', 15, 760, C.green)}
    ${box(80, 425, 650, 175, C.white, 'none', 16)}
    ${text(115, 475, 'A controlled line length gives the eye', 22, 500, C.muted)}
    ${text(115, 513, 'a reliable return path. Generous leading', 22, 500, C.muted)}
    ${text(115, 551, 'keeps each line distinct without drifting apart.', 22, 500, C.muted)}
    ${line(780, 445, 780, 575, C.orange, 3)}${line(760, 445, 800, 445, C.orange, 3)}${line(760, 575, 800, 575, C.orange, 3)}
    ${text(830, 505, 'Measure and leading', 21, 700)}${text(830, 538, 'are compositional tools.', 18, 500, C.muted)}
  `, 'A wide tightly spaced paragraph is contrasted with a narrower paragraph using open line height and a controlled measure.'),

  frame('06-fewer-borders', 'Use fewer borders', 'Space, surface tone, and shadow can separate content without drawing every boundary.', `
    ${text(80, 160, 'BOUNDARIES EVERYWHERE', 15, 760, C.red)}
    ${box(80, 190, 470, 390, C.white, C.ink, 10, 2)}
    ${box(110, 220, 410, 80, C.white, C.ink, 6, 2)}${box(110, 320, 195, 100, C.white, C.ink, 6, 2)}${box(325, 320, 195, 100, C.white, C.ink, 6, 2)}${box(110, 440, 410, 105, C.white, C.ink, 6, 2)}
    ${text(650, 160, 'SEPARATION WITHOUT NOISE', 15, 760, C.green)}
    ${box(650, 190, 470, 390, C.softer, 'none', 22)}
    ${text(695, 255, 'One quiet field', 30, 740)}${copyLines(695, 292, [345, 310], 24)}
    ${box(695, 375, 180, 95, C.white, 'none', 12)}${box(895, 375, 180, 95, C.white, 'none', 12)}
    ${box(695, 505, 170, 50, C.orange, 'none', 7)}${text(780, 537, 'Primary action', 16, 720, C.white, 'middle')}
  `, 'A heavily bordered panel is contrasted with a quiet surface that uses spacing, subtle tonal shifts, and one emphasized action.'),

  frame('07-deemphasis', 'De-emphasize most things to emphasize one thing', 'When everything is strong, importance becomes invisible.', `
    ${text(80, 160, 'UNIFORM EMPHASIS', 15, 760, C.red)}
    ${[0,1,2,3,4].map((i) => `${box(80, 195 + i * 78, 470, 58, C.ink, 'none', 8)}${text(110, 232 + i * 78, ['Name','Role','Summary','Personal detail','Download'][i], 20, 740, C.white)}`).join('')}
    ${text(650, 160, 'RANKED EMPHASIS', 15, 760, C.green)}
    ${text(650, 238, 'Shawn Salat', 48, 760)}
    ${text(650, 286, 'Software Engineer', 24, 620, C.muted)}
    ${copyLines(650, 337, [390, 340, 300], 25, C.muted, 8)}
    ${text(650, 455, 'Outside work…', 16, 500, C.muted)}
    ${box(650, 500, 210, 58, C.orange, 'none', 8)}${text(755, 537, 'Download resume', 17, 720, C.white, 'middle')}
  `, 'Five equally strong bars are contrasted with a ranked typographic composition containing one primary action.'),

  frame('08-gestalt-grouping', 'People perceive groups before individual parts', 'Proximity, similarity, and common region create grouping automatically.', `
    ${text(80, 165, 'PROXIMITY', 15, 760, C.ink)}
    ${[0,1,2].map(i => circle(115 + i * 42, 235, 15, C.orange)).join('')}${[0,1,2].map(i => circle(315 + i * 42, 235, 15, C.ink)).join('')}
    ${text(80, 295, 'Two groups appear without labels.', 16, 500, C.muted)}
    ${text(450, 165, 'SIMILARITY', 15, 760, C.ink)}
    ${[0,1,2,3,4,5].map((i) => circle(480 + (i % 3) * 55, 220 + Math.floor(i / 3) * 55, 16, i % 2 ? C.orange : C.ink)).join('')}
    ${text(450, 330, 'Shared appearance implies shared role.', 16, 500, C.muted)}
    ${text(820, 165, 'COMMON REGION', 15, 760, C.ink)}
    ${box(820, 195, 290, 125, C.soft, 'none', 20)}${circle(875, 257, 18, C.orange)}${circle(935, 257, 18, C.orange)}${circle(995, 257, 18, C.orange)}
    ${text(820, 350, 'A surface is a powerful grouping cue.', 16, 500, C.muted)}
    ${box(80, 410, 1030, 155, C.white, 'none', 18)}
    ${text(120, 462, 'Design implication', 24, 720)}
    ${text(120, 505, 'A card, shared color, or tight spacing all assert a relationship.', 20, 500, C.muted)}
    ${text(120, 538, 'Do not assert three conflicting relationships at the same time.', 20, 650, C.orange)}
  `, 'Three diagrams illustrate grouping through proximity, similarity, and a shared enclosing region.'),

  frame('09-fitts-targets', 'Target acquisition trades distance against size', 'Frequent or important actions should be easier to reach and easier to hit.', `
    ${text(80, 160, 'HARDER', 15, 760, C.red)}
    ${circle(135, 360, 18, C.ink)}${text(135, 405, 'Pointer', 15, 650, C.muted, 'middle')}
    ${line(160, 350, 505, 230, C.orange, 4)}<line x1="160" y1="350" x2="505" y2="230" stroke="${C.orange}" stroke-width="4" marker-end="url(#arrow)"/>
    ${box(520, 200, 42, 42, C.orange, 'none', 6)}${text(541, 270, 'Small + far', 16, 650, C.red, 'middle')}
    ${text(650, 160, 'EASIER', 15, 760, C.green)}
    ${circle(705, 360, 18, C.ink)}${text(705, 405, 'Pointer', 15, 650, C.muted, 'middle')}
    <line x1="730" y1="350" x2="855" y2="310" stroke="${C.orange}" stroke-width="4" marker-end="url(#arrow)"/>
    ${box(870, 260, 190, 92, C.orange, 'none', 12)}${text(965, 316, 'Primary action', 18, 720, C.white, 'middle')}
    ${text(965, 390, 'Large + nearby', 16, 650, C.green, 'middle')}
    ${box(80, 500, 1030, 85, C.softer, 'none', 14)}${text(595, 552, 'Visual prominence and physical usability should agree.', 22, 680, C.ink, 'middle')}
  `, 'A pointer moving to a small distant target is contrasted with a nearby large primary action.'),

  frame('10-choice-load', 'More equal choices increase decision work', 'Reduce visible equality; group, prioritize, or progressively disclose secondary options.', `
    ${text(80, 160, 'EIGHT EQUAL CHOICES', 15, 760, C.red)}
    ${[0,1,2,3,4,5,6,7].map((i) => `${box(80 + (i % 2) * 200, 195 + Math.floor(i / 2) * 75, 180, 54, C.white, C.line, 8)}${text(170 + (i % 2) * 200, 229 + Math.floor(i / 2) * 75, `Option ${i + 1}`, 16, 650, C.ink, 'middle')}`).join('')}
    ${text(650, 160, 'PRIORITIZED PATH', 15, 760, C.green)}
    ${box(650, 200, 285, 66, C.orange, 'none', 9)}${text(792, 241, 'Download resume', 19, 720, C.white, 'middle')}
    ${box(650, 290, 210, 56, C.white, C.line, 8)}${text(755, 326, 'Email me', 17, 680, C.ink, 'middle')}
    ${text(650, 405, 'More formats  ›', 17, 650, C.muted)}
    ${text(650, 470, 'One primary, one secondary,', 19, 650, C.green)}
    ${text(650, 500, 'the rest available on demand.', 19, 650, C.green)}
  `, 'Eight identical options are contrasted with a primary action, a secondary action, and progressive disclosure for the remainder.'),

  frame('11-signifier-feedback', 'A control must signal action, mapping, and outcome', 'Appearance says “you can act”; feedback says “the action worked.”', `
    ${text(80, 160, 'AMBIGUOUS', 15, 760, C.red)}
    ${text(170, 300, '♫', 70, 500, C.muted, 'middle')}
    ${text(170, 365, 'Topic? Button? Status?', 18, 600, C.red, 'middle')}
    ${text(440, 160, 'CLEAR INTERACTION CHAIN', 15, 760, C.green)}
    ${box(440, 250, 190, 66, C.white, C.orange, 9, 2)}${text(535, 291, 'Listening lately ›', 17, 700, C.orange, 'middle')}
    <line x1="650" y1="283" x2="755" y2="283" stroke="${C.orange}" stroke-width="4" marker-end="url(#arrow)"/>
    ${box(780, 215, 320, 145, C.soft, 'none', 14)}${text(815, 260, 'Listening lately', 18, 720)}${copyLines(815, 292, [220, 180], 24)}
    ${text(535, 385, 'Signifier', 16, 700, C.muted, 'middle')}${text(940, 385, 'Visible outcome', 16, 700, C.muted, 'middle')}
    ${box(440, 470, 660, 95, C.white, 'none', 14)}${text(475, 510, 'Mapping', 16, 760, C.orange)}${text(575, 510, 'The label predicts exactly what appears.', 18, 520, C.muted)}${text(475, 545, 'Feedback', 16, 760, C.orange)}${text(575, 545, 'The changed state remains perceivable.', 18, 520, C.muted)}
  `, 'An ambiguous music glyph is contrasted with a labeled disclosure control, an arrow showing action, and visible revealed content.'),

  frame('12-optical-alignment', 'Optical alignment can differ from geometric alignment', 'Curves, capitals, and mixed type sizes often need small visual compensation.', `
    ${text(80, 160, 'GEOMETRIC', 15, 760, C.red)}
    ${box(80, 200, 430, 220, C.white, 'none', 14)}${line(295, 220, 295, 400, C.line, 2, '6 6')}${line(100, 310, 490, 310, C.line, 2, '6 6')}${circle(295, 310, 78, C.soft, C.orange, 4)}
    ${text(295, 460, 'Measured center', 17, 650, C.red, 'middle')}
    ${text(650, 160, 'OPTICAL', 15, 760, C.green)}
    ${box(650, 200, 470, 220, C.white, 'none', 14)}${text(700, 320, 'Shawn', 62, 760)}${text(905, 320, 'Software Engineer', 22, 650, C.muted)}
    ${line(690, 324, 1080, 324, C.green, 2, '6 6')}
    ${text(885, 460, 'Different sizes share a perceived baseline', 17, 650, C.green, 'middle')}
    ${box(80, 520, 1040, 70, C.softer, 'none', 12)}${text(600, 564, 'Use the grid as a starting point; judge the final relationship with your eyes.', 20, 650, C.ink, 'middle')}
  `, 'A circle centered mathematically in a box is compared with different-sized title and role text aligned on a perceived baseline.'),

  frame('13-density-balance', 'Whitespace needs tension, not emptiness', 'Space should separate or focus; unexplained voids feel unfinished.', `
    ${text(80, 160, 'DEAD SPACE', 15, 760, C.red)}
    ${box(80, 195, 470, 390, C.white, 'none', 16)}${text(115, 245, 'Hero content', 27, 720)}${copyLines(115, 278, [300, 260], 22)}${box(115, 345, 155, 48, C.orange, 'none', 7)}${text(192, 376, 'Action', 16, 720, C.white, 'middle')}${text(315, 530, 'Unexplained void', 18, 650, C.red, 'middle')}
    ${text(650, 160, 'PURPOSEFUL RHYTHM', 15, 760, C.green)}
    ${box(650, 195, 470, 190, C.soft, 'none', 16)}${text(685, 245, 'Hero content', 27, 720)}${copyLines(685, 278, [300, 260], 22)}${box(685, 325, 155, 48, C.orange, 'none', 7)}${text(762, 356, 'Action', 16, 720, C.white, 'middle')}
    ${line(650, 425, 1120, 425, C.line, 1)}${text(650, 478, 'Experience', 30, 740)}${copyLines(650, 510, [350, 310], 22)}
    ${text(650, 585, 'The next section enters before attention dissipates.', 17, 560, C.green)}
  `, 'A sparse hero card with a large unexplained void is contrasted with a compact hero followed by a clearly paced next section.'),

  frame('14-responsive-invariants', 'Responsive design preserves relationships, not coordinates', 'The layout may reflow; importance, reading order, and grouping must survive.', `
    ${text(80, 160, 'DESKTOP', 15, 760, C.ink)}
    ${box(80, 190, 650, 360, C.white, 'none', 18)}${text(120, 245, 'Shawn Salat', 38, 760)}${circle(155, 360, 55, C.soft, C.white, 4)}${copyLines(250, 320, [390, 350, 300], 24)}${box(250, 435, 170, 52, C.orange, 'none', 7)}${text(335, 468, 'Download', 16, 720, C.white, 'middle')}
    <line x1="760" y1="365" x2="825" y2="365" stroke="${C.orange}" stroke-width="4" marker-end="url(#arrow)"/>
    ${text(860, 160, 'MOBILE', 15, 760, C.ink)}
    ${box(850, 190, 270, 430, C.white, 'none', 18)}${text(880, 240, 'Shawn Salat', 28, 760)}${circle(920, 315, 40, C.soft, C.white, 4)}${copyLines(880, 380, [205, 190, 175], 22)}${box(880, 500, 170, 52, C.orange, 'none', 7)}${text(965, 533, 'Download', 16, 720, C.white, 'middle')}
    ${text(80, 605, 'Invariant: name → portrait + introduction → action', 18, 650, C.green)}
  `, 'A desktop hero reflows to a mobile stack while preserving the same importance and reading order.'),

  frame('15-hero-forensics', 'Forensics: why the candidate-20 screenshot feels wrong', 'The design asserts several different organizing systems and leaves the handoff unresolved.', `
    ${text(80, 155, 'SIMPLIFIED SCREENSHOT', 15, 760, C.ink)}
    ${text(100, 235, 'Shawn Salat', 48, 760)}${text(425, 235, '—  Software Engineer', 23, 650, C.muted)}
    ${box(100, 285, 860, 210, C.soft, 'none', 36)}${circle(210, 390, 70, C.white, C.white, 5)}${copyLines(360, 345, [500, 460, 410, 520, 350], 24)}
    ${box(360, 525, 190, 54, C.orange, 'none', 7)}${text(455, 559, 'Download resume', 16, 720, C.white, 'middle')}${box(570, 525, 130, 54, C.white, C.line, 7)}${text(635, 559, 'Email', 16, 700, C.ink, 'middle')}
    ${line(100, 180, 100, 620, C.red, 2, '7 7')}${line(360, 300, 360, 620, C.orange, 2, '7 7')}${line(210, 300, 210, 500, C.ink, 2, '7 7')}
    ${text(100, 645, 'container/header', 14, 700, C.red, 'middle')}${text(360, 645, 'copy/action', 14, 700, C.orange, 'middle')}${text(210, 615, 'portrait center', 14, 700, C.ink, 'middle')}
    ${circle(940, 303, 22, C.red)}${text(940, 311, '1', 24, 760, C.white, 'middle')}${text(975, 309, 'Competing axes', 15, 650, C.red)}
    ${circle(940, 375, 22, C.red)}${text(940, 383, '2', 24, 760, C.white, 'middle')}${text(975, 381, 'CTA leaves the field', 15, 650, C.red)}
    ${circle(940, 447, 22, C.red)}${text(940, 455, '3', 24, 760, C.white, 'middle')}${text(975, 453, 'Roundness overgroups', 15, 650, C.red)}
    ${circle(940, 519, 22, C.red)}${text(940, 527, '4', 24, 760, C.white, 'middle')}${text(975, 525, 'Dead space breaks rhythm', 15, 650, C.red)}
  `, 'A simplified version of the rejected hero is annotated with three vertical axes and four identified composition problems.'),

  frame('16-evaluation-loop', 'Advanced design is disciplined evaluation', 'Compose a hypothesis, compare it, observe it in context, and keep only evidence-backed improvements.', `
    ${box(80, 215, 210, 110, C.white, 'none', 16)}${text(185, 258, '1 · RANK', 18, 760, C.orange, 'middle')}${text(185, 292, 'What matters first?', 16, 550, C.muted, 'middle')}
    <line x1="310" y1="270" x2="390" y2="270" stroke="${C.orange}" stroke-width="4" marker-end="url(#arrow)"/>
    ${box(410, 215, 210, 110, C.white, 'none', 16)}${text(515, 258, '2 · COMPOSE', 18, 760, C.orange, 'middle')}${text(515, 292, 'Choose one hypothesis.', 16, 550, C.muted, 'middle')}
    <line x1="640" y1="270" x2="720" y2="270" stroke="${C.orange}" stroke-width="4" marker-end="url(#arrow)"/>
    ${box(740, 215, 210, 110, C.white, 'none', 16)}${text(845, 258, '3 · OBSERVE', 18, 760, C.orange, 'middle')}${text(845, 292, 'Use a real browser.', 16, 550, C.muted, 'middle')}
    <path d="M950 270 C1090 270 1090 450 845 450 C600 450 380 450 185 450 C90 450 80 380 150 340" fill="none" stroke="${C.orange}" stroke-width="4" stroke-dasharray="8 8" marker-end="url(#arrow)"/>
    ${box(270, 500, 660, 105, C.soft, 'none', 16)}
    ${text(320, 540, 'Keep only if:', 18, 760)}${text(470, 540, 'hierarchy reads instantly', 17, 600, C.muted)}${text(710, 540, 'groups are unambiguous', 17, 600, C.muted)}
    ${text(320, 575, 'reading order survives', 17, 600, C.muted)}${text(565, 575, 'actions are discoverable', 17, 600, C.muted)}${text(790, 575, 'rhythm reaches the next section', 17, 600, C.muted)}
  `, 'A four-stage design evaluation loop moves from ranking and composition to real-browser observation and evidence-based iteration.'),
];

for (const image of images) {
  await writeFile(resolve(root, `${image.slug}.svg`), image.svg, 'utf8');
}

console.log(`Generated ${images.length} design-study images in ${root}`);
