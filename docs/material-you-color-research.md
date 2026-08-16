# Material You color direction for the resume site

## Decision-ready summary

Use the liked orange as the single **source color** (also called a seed), then generate a light `SchemeTonalSpot` color scheme with Material Color Utilities at the default contrast level (`0.0`). Expose the result through semantic CSS roles such as `--surface`, `--on-surface`, and `--primary`, rather than naming tokens after visual locations or copying the orange hex into multiple jobs.

For this resume, the practical result should be:

- a very light, subtly orange-related neutral for the page;
- `surface-container-low` or `surface-container` for grouped sections;
- `surface-container-lowest` for cards that should lift above the page;
- `on-surface` for primary text and `on-surface-variant` for supporting text;
- `outline-variant` for quiet dividers and borders;
- `primary` orange for the highest-emphasis accents, links, active states, and focus treatment;
- the paired `on-*` role whenever text or an icon sits on a filled color role.

This applies Material's color-management philosophy without copying Android component styling. The typography, spacing, and editorial resume layout can remain site-specific.

## What Material's system actually does

Material 3 begins with one source color, derives five key colors (primary, secondary, tertiary, neutral, and neutral variant), expands them into tonal palettes, and maps particular tones to named UI roles. HCT means hue, chroma, and tone; tone is the lightness axis used to manage contrast. A supplied orange is therefore an input to the system, not necessarily the exact hex used for text or controls. [Android color system](https://developer.android.com/design/ui/mobile/guides/styles/color)

The official Material Color Utilities guide recommends creating a `DynamicScheme` variant from a source color, light/dark choice, and contrast level. Its recommended levels are `0.0` for default, `0.5` for higher, `1.0` for highest, and `-1.0` for reduced contrast. `SchemeTonalSpot` is the restrained default-style choice; it is more suitable for a content-heavy resume than the intentionally louder expressive variants. [Creating a color scheme](https://github.com/material-foundation/material-color-utilities/blob/main/dev_guide/creating_color_scheme.md) [SchemeTonalSpot source](https://github.com/material-foundation/material-color-utilities/blob/main/typescript/scheme/scheme_tonal_spot.ts)

HCT combines CAM16 hue and chroma with L* tone. The official implementation states that a difference of 40 HCT tone guarantees at least 3:1 contrast, while 50 guarantees at least 4.5:1. This is why changing tones within a related palette is preferable to independently darkening or desaturating arbitrary hex colors. [HCT implementation](https://github.com/material-foundation/material-color-utilities/blob/main/typescript/hct/hct.ts)

## Role-based tokens

Material roles describe purpose, not literal hue:

- `surface` is for the background and other large, low-emphasis areas;
- `primary`, `secondary`, and `tertiary` are accent roles with different emphasis;
- `container` roles are fills and should not themselves be used as text/icon colors;
- `on-*` roles are foreground colors designed for their paired fill;
- `variant` roles provide lower emphasis.

Material calls these roles the connective tissue between UI elements and their colors. The practical rule is to change a role pairing as a unit: if a fill changes, re-check or regenerate its `on-*` foreground rather than assuming the old foreground still works. [Color roles and tokens](https://developer.android.com/design/ui/wear/guides/styles/color/roles-tokens) [Material Components color guidance](https://github.com/material-components/material-components-android/blob/master/docs/theming/Color.md)

Recommended CSS vocabulary for this site:

```css
--surface
--surface-container-lowest
--surface-container-low
--surface-container
--surface-container-high
--on-surface
--on-surface-variant
--primary
--on-primary
--primary-container
--on-primary-container
--outline
--outline-variant
--inverse-surface
--inverse-on-surface
```

Avoid retaining generic tokens such as `--ink`, `--canvas`, `--muted`, and `--line` as the source of truth. They obscure which foreground/background pair is expected to carry contrast.

## Light-theme surface hierarchy

Material's light surface roles use a neutral tonal ladder rather than unrelated whites and grays:

| Role | Standard light tone | Resume use |
| --- | ---: | --- |
| `surface-container-lowest` | 100 | lifted cards or the brightest contained area |
| `surface` / `surface-bright` | 98 | page background |
| `surface-container-low` | 96 | quiet grouped content |
| `surface-container` | 94 | ordinary contained section |
| `surface-container-high` | 92 | higher-emphasis contained area |
| `surface-container-highest` | 90 | highest tonal elevation |
| `surface-dim` | 87 | deliberately dim large surface |

In a light theme, higher container levels become slightly darker. This creates hierarchy through small tone changes while every surface remains related to the orange-derived neutral palette. Material recommends using surfaces generously because they contain content, guide the reader, and give the eye quiet space. [Material Components surface colors](https://github.com/material-components/material-components-android/blob/master/docs/theming/Color.md#using-surface-colors) [Android color system: surface colors](https://developer.android.com/design/ui/mobile/guides/styles/color#surface-colors)

For the current layout, use the page as `surface`, skill pills and quiet groupings as `surface-container-low`, role/education cards as `surface-container-lowest`, and reserve `surface-container` or `surface-container-high` for areas that truly need more visual weight. The dark project cards and footer should use the generated inverse-surface pair instead of the current unrelated navy family.

## Accessibility rules

Generated role pairs are designed around contrast, but correct generation does not make arbitrary token reuse safe. For this website:

- normal body text must reach at least 4.5:1 against its actual background;
- large text and meaningful non-text boundaries need at least 3:1;
- color must not be the only signal for links, focus, state, or structure;
- every actual foreground/background combination still needs Lighthouse or equivalent validation after mapping roles to components.

The official Android accessibility guidance gives the 4.5:1 text and 3:1 non-text baselines. Material's role guidance also emphasizes accessible pairings, but those guarantees depend on using the intended role pairs. [Android accessibility foundations](https://developer.android.com/design/ui/mobile/guides/foundations/accessibility) [Color roles and tokens](https://developer.android.com/design/ui/wear/guides/styles/color/roles-tokens)

## Harmony, specifically

Material's main source of harmony is algorithmic: accents and neutral surfaces come from tonal palettes derived from the same source color. **Harmonization** is a narrower operation for a retained custom brand or semantic color that must sit beside the generated scheme. It shifts that custom color's hue toward the theme primary while keeping the custom color recognizable. It is not a reason to hand-blend every UI color. [Material Components harmonization guidance](https://github.com/material-components/material-components-android/blob/master/docs/theming/Color.md#using-color-harmonization) [Material Color Utilities capabilities](https://github.com/material-foundation/material-color-utilities)

This resume does not currently need extra custom hues. The cleanest system is one orange source plus generated accent and neutral roles. If a future success, warning, or brand color must be retained, harmonize that exception and still validate its foreground pair.

## Example palette direction from the current orange

Using the current `#aa4217` orange as the source with the official tonal palette machinery produces the following representative light-role direction:

```text
surface-container-lowest  #ffffff
surface                   #fff8f6
surface-container-low     #fef1ed
surface-container         #f8ebe7
surface-container-high    #f3e5e2
surface-container-highest #ede0dc
on-surface                #201a18
on-surface-variant        #53433e
outline                   #85736d
outline-variant           #d8c2bb
primary                   #a33d12
on-primary                #ffffff
primary-container         #ffdbcf
on-primary-container      #380d00
```

These values are an implementation snapshot from the official Material Color Utilities tonal palettes and standard light tones, not a replacement for generating roles in code. The final implementation should generate the scheme from the chosen orange source and store the resulting static role values in CSS; the browser does not need the color library at runtime.

## Sources

- [Android Developers: Color system](https://developer.android.com/design/ui/mobile/guides/styles/color)
- [Android Developers: Accessibility foundations](https://developer.android.com/design/ui/mobile/guides/foundations/accessibility)
- [Android Developers: Color roles and tokens](https://developer.android.com/design/ui/wear/guides/styles/color/roles-tokens)
- [Material Color Utilities: Creating a color scheme](https://github.com/material-foundation/material-color-utilities/blob/main/dev_guide/creating_color_scheme.md)
- [Material Color Utilities: HCT implementation](https://github.com/material-foundation/material-color-utilities/blob/main/typescript/hct/hct.ts)
- [Material Color Utilities repository](https://github.com/material-foundation/material-color-utilities)
- [Material Components Android: Color theming](https://github.com/material-components/material-components-android/blob/master/docs/theming/Color.md)
