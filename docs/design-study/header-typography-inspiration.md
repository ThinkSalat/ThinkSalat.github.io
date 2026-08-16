# Header typography inspiration

Captured 2026-08-15 for the single-line signature:

`Shawn Salat: Software Engineer<Frontend, Backend, Agentic Coding>`

## Correction to the previous study

The git-diff, command-palette, token-inspector, blueprint, and editor-tab variants were weak because they changed the header into unrelated interface props. They did not improve the identity → role → specialties relationship. The stronger online references treat a developer's introduction as a text lockup: one readable line, few type roles, and personality coming from letterforms, weight, spacing, and restrained color.

Current first-party portfolio examples support that direction:

- [Emil Kowalski](https://emilkowal.ski/) opens with name and role at essentially equal scale and lets whitespace do the grouping.
- [Paco Coursey](https://paco.me/) mixes a restrained sans with localized editorial serif/italic moments inside otherwise quiet text.
- [Rauno Freiberg](https://rauno.me/) identifies person and role in one direct sentence; the current site also ships JetBrains Mono without turning the introduction into a fake editor.
- [Anthony Fu](https://antfu.me/) uses technical typography locally inside a largely grayscale system.
- [Lee Robinson](https://leerob.com/) uses a compact Geist Sans/Geist Mono system with very little visual ceremony.
- [Brittany Chiang](https://brittanychiang.com/) uses a conventional name → role → summary hierarchy and explicitly identifies Inter as the only typeface used on the site.

The transferable pattern is **one size, no more than two families, two or three weights/colors, and no simulated tool chrome**. The one requested code-editor treatment should be an authentic bare editor line, not a terminal window, tab strip, command palette, or source-control joke.

## Controls held constant

These are typography studies, not twelve new UI concepts:

- exact text and semantic spans stay unchanged;
- every visible token inherits `font-size: 1em` and the same line height;
- desktop remains one line; narrow screens may wrap at semantic boundaries;
- no prompt character, badge, border, title bar, tab, grid, scanline, gradient, or explanatory label, except the real-editor study may use a flat editor background and line number;
- vary only family, weight, tracking, and a maximum of three foreground colors;
- compare every study at the same viewport against the current Cascadia version.

This follows the existing design-study rule that one controlled variable should test one hypothesis. IBM's typography guidance also emphasizes consistency, hierarchy, alignment, and giving Plex enough tracking to breathe. [IBM Design Language: type basics](https://www.ibm.com/design/language/typography/type-basics/)

## Strongest design directions

### 1. Cascadia, properly restrained

**Hypothesis:** The existing Cascadia idea works once weight does the hierarchy and punctuation stops competing.

- Family: Cascadia Mono or Cascadia Code throughout.
- Weight: name 650; role 500; specialties 400; punctuation 400.
- Color: navy for words, rust only for `:` and angle brackets, commas in muted blue-gray.
- Tracking: about `-0.035em` across the line; no per-token size changes.
- Surface: none.

Microsoft describes Cascadia as its coding font for Windows Terminal and Visual Studio and supplies variable weights from 200–700 plus WOFF2 web fonts. [Microsoft: Cascadia Code](https://github.com/microsoft/cascadia-code)

### 2. A real VS Code line

**Hypothesis:** Authentic editor conventions feel more credible than decorative “developer” UI.

- Family: JetBrains Mono or Cascadia Mono, weight 400 for every token.
- Flat background: VS Code Dark Modern `#1f1f1f`.
- Default foreground: `#cccccc`; line number: `#6e7681`.
- Semantic color: name/identifier `#9cdcfe`; role and specialties/type references `#4ec9b0`; punctuation gray.
- One line number is enough. No tab, filename, window controls, border, or fake cursor.

These values come from Microsoft's current Dark Modern theme and its included token rules, rather than a GitHub-themed approximation. VS Code distinguishes workbench colors from syntax-token colors; using both as one arbitrary rainbow would be inauthentic. [VS Code Dark Modern source](https://github.com/microsoft/vscode/blob/main/extensions/theme-defaults/themes/dark_modern.json) [VS Code color-theme guide](https://code.visualstudio.com/api/extension-guides/color-theme)

### 3. IBM Developer voice

**Hypothesis:** A light humanist mono can communicate “technical” without looking like terminal output.

- Family: IBM Plex Mono throughout.
- Weight: name 500; role 400; specialties 300; punctuation 400.
- Color: near-black name; slate role/specialties; cobalt or rust punctuation only.
- Tracking: `-0.015em` or normal—Plex should not be crushed.
- Surface: none.

IBM Developer uses Plex Mono Light as its primary expressive face for headlines, code, and data points, while IBM's broader type system explicitly treats Mono as the coding member of the Plex family. [IBM Developer: typography](https://www.ibm.com/brand/experience-guides/developer/brand/typography/) [IBM Design Language: typeface](https://www.ibm.com/design/language/typography/typeface/)

### 4. Geist precision

**Hypothesis:** A quieter geometric mono makes the type-signature joke feel like professional identity rather than cosplay.

- Family: Geist Mono throughout.
- Weight: name 650; role 500; specialties 400.
- Color: navy name; role and specialties one cooler gray; rust punctuation.
- Tracking: `-0.03em`; no surface.

Vercel describes Geist Mono as the code/editor/diagram counterpart to Geist Sans, built around minimalism, precision, and simplicity. [Vercel: Geist](https://github.com/vercel/geist-font)

### 5. Terminal color, without terminal furniture

**Hypothesis:** The liked green-terminal personality can survive after removing the prompt, scanlines, glow, and box.

- Family: Cascadia Mono.
- Weight: name 600; everything else 400.
- Color: deep navy/black text with one clear green accent on `:` and brackets; specialties use a quieter green-gray.
- Surface: either none or one flat near-black strip—never a terminal window.
- No leading `>`, blinking cursor, glow, or phosphor texture.

This keeps the part that carries meaning—the coding font and limited green palette—while dropping visual units that compete with the name. Cascadia's actual Windows Terminal role makes the association credible without literal imitation. [Microsoft: Cascadia Code](https://github.com/microsoft/cascadia-code)

### 6. Monaspace texture, not rainbow syntax

**Hypothesis:** Closely related letterform “voices” can create semantic variation while every token keeps identical metrics and size.

- Family: Monaspace Neon for the name; Argon for role; Krypton or Xenon for specialties.
- Weight: 600 / 500 / 400.
- Color: one foreground plus rust punctuation; let the letterforms supply the difference.
- Tracking: normal; enable texture healing if browser support and testing are acceptable.

GitHub Next designed the five Monaspace faces to be mixed while preserving compatible metrics, specifically proposing font mixing as another layer of code hierarchy beyond color and weight. [GitHub Next: Monaspace](https://monaspace.githubnext.com/)

### 7. Recursive variable calibration

**Hypothesis:** One variable family can move from personal to technical without looking assembled from unrelated fonts.

- Family: Recursive throughout at the same size.
- Name: `MONO 1`, `CASL .25`, weight 650.
- Role: `MONO 1`, `CASL 0`, weight 500.
- Specialties: `MONO 1`, `CASL 0`, weight 400.
- Color: one dark foreground; rust punctuation only.

Recursive exposes independent Monospace, Casual, Weight, Slant, and Cursive axes, allowing a controlled difference in voice inside one coherent family. [Recursive Sans & Mono](https://www.recursive.design/)

### 8. Commit Mono “super normal”

**Hypothesis:** The unusual content is enough; a deliberately neutral font will make it land more confidently.

- Family: Commit Mono throughout with smart kerning enabled.
- Weight: name 600; role 475; specialties 400.
- Color: two tones only—dark text and muted rust punctuation.
- Tracking: 0 or `-0.01em`; no surface.

Commit Mono is explicitly designed to be anonymous and neutral, offers a continuous 200–700 weight range, and uses smart kerning while retaining the monospaced grid. Its own guidance recommends roughly 400 on dark backgrounds and 450 on light ones. [Commit Mono](https://commitmono.com/)

### 9. Input family switch

**Hypothesis:** A single related superfamily can make the name feel authored and the type expression feel technical without changing size.

- Family: Input Serif Mono for `Shawn Salat`; Input Sans Mono for role; Input Mono for specialties.
- Weight: 600 / 500 / 400.
- Color: nearly monochrome; punctuation rust.
- Tracking: consistent across the full line.
- Licensing must be confirmed before web embedding.

Input is explicitly a programming type system spanning serif/sans and variable-width/monospaced forms, with extensive weight and width controls. [David Jonathan Ross: Input specimen](https://typeset.djr.com/?ff=input)

### 10. Editorial splice

**Hypothesis:** One typographic surprise is more memorable than a whole simulated interface.

- Family: a clean mono such as Geist Mono for the entire line.
- Switch only `Agentic Coding` to a same-size Newsreader italic or the mono family's true italic.
- Keep the name 600 and all remaining text 400–500.
- Use one text color; rust punctuation; no background.

This derives from Paco Coursey's restrained use of a localized editorial face within an otherwise quiet typographic system. It should be tested both with a second family and with the mono's native italic; if the second family breaks baseline or apparent size, reject it. [Paco Coursey](https://paco.me/)

### 11. JetBrains legibility

**Hypothesis:** A tall-x-height coding face can remain readable when the long signature must shrink to stay on one desktop line.

- Family: JetBrains Mono throughout.
- Weight: name 650; role 500; specialties 400.
- Color: navy plus one rust punctuation color.
- Tracking: `-0.025em`; line height about 1.15.

JetBrains designed the family around code reading, increased letter height, multiple weights, matching italics, and code-specific ligatures. [JetBrains Mono](https://www.jetbrains.com/lp/mono/)

### 12. Sparse Alabaster syntax

**Hypothesis:** Syntax color becomes tasteful when most of the line remains ordinary text.

- Family: Commit Mono or JetBrains Mono, all weight 400 except name 600.
- Light background; near-black base text.
- Highlight only the name as the top-level definition; dim `:`, `<`, `>`, and commas.
- Leave role and specialties at the base color.
- No editor frame; optional line number only if compared directly with direction 2.

Niki Tonsky's Alabaster rationale argues that if everything is highlighted, nothing stands out; it recommends very few memorable colors, emphasizing names and dimming punctuation. That is a better model for this one-line introduction than assigning a bright color to every span. [Niki Tonsky: syntax highlighting](https://tonsky.me/blog/syntax-highlighting/)

## Recommended next ten

Implement directions **1–10** as the next selector set. Directions 11 and 12 are substitutes if two of those fail at the font-loading or licensing stage. Keep the actual font files and color systems faithful enough that the comparison is about typography, then capture all ten at the same desktop viewport.

The first review question should be: **Can someone read Shawn's name and “Software Engineer” immediately, before noticing the type-signature joke?** Any treatment that makes its visual metaphor the first answer should be removed, regardless of novelty.

## Outcome — 2026-08-15

Shawn selected **Monaspace voices**: Neon for the name, Argon for the role, and Xenon for the type arguments. The production signature is:

`Shawn Salat: Software Engineer<Frontend, Backend, AI Systems>`

The font sizes remain identical across the full signature; family, weight, and restrained color provide the hierarchy. The selected faces are self-hosted as renamed, header-only subsets under the SIL Open Font License. The selector and comparison page were removed after promotion.
