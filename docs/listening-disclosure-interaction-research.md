# Listening disclosure interaction direction

## Recommendation

Treat the playlist as **secondary editorial detail**, not as a mini music player in the hero.

Keep the personal sentence entirely plain:

> Outside work, I’m usually taking photos with my Sony A7 II, listening to music, or playing video games.

Immediately below it, use one quiet disclosure control:

```text
Listening lately  ›
```

The label should be a real `<button>`, visually treated like a restrained text action rather than a filled or outlined button. The chevron points right while collapsed and down while expanded. Activating it reveals the existing track presentation directly below the control.

This is a stronger fit than embedding the control inside the sentence. It preserves the sentence's reading rhythm, gives the action a familiar show/hide signifier, and keeps the filled **Download resume** button unquestionably dominant.

## Visual treatment

- Use the same body typeface at roughly `0.875rem`, medium weight.
- Use the quieter `on-surface-variant` blue at rest; reserve orange for hover, focus, and the expanded state.
- Use no pill, card fill, album art, vinyl, equalizer, dotted underline, shadow, or perpetual animation in the collapsed state.
- Give the text a conventional solid underline or bottom rule so clickability is not communicated by color alone.
- Put a small chevron immediately after the label. Rotate it from right to down only when the state changes.
- Make the invisible click area about 44–48 CSS pixels high while leaving the visible treatment typographic and compact.
- Align the revealed panel to the control and separate it with whitespace or one quiet top rule, not a heavy rounded container.
- Keep the disclosure above the primary actions only if it remains clearly quieter; otherwise place it after the DOCX line.

NN/g reports that flat controls lose discoverability when familiar cues are removed, and recommends retaining consistent cues such as color, borders, placement, and familiar conventions. It also warns that many colorful boxes weaken hierarchy because controls begin competing with one another. [Beyond Blue Links: Making Clickable Elements Recognizable](https://www.nngroup.com/articles/clickable-elements/)

## Interaction and semantics

Use the standard disclosure pattern:

```html
<button
  type="button"
  aria-expanded="false"
  aria-controls="listening-lately"
>
  <span>Listening lately</span>
  <svg aria-hidden="true"><!-- right/down chevron --></svg>
</button>

<section id="listening-lately" hidden>
  <!-- current track presentation -->
</section>
```

- Keep the visible label stable as `Listening lately`; the chevron and `aria-expanded` communicate state.
- Let native button behavior provide Enter and Space activation.
- Keep keyboard focus on the disclosure after opening or closing it.
- Use `aria-controls` to identify the revealed section.
- Give the control an obvious `:focus-visible` outline.
- Do not place the entire personal sentence inside the button. WAI notes that rich summaries inside disclosure buttons can create cumbersome or inaccurate accessible names. [WAI disclosure-card example](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-card/)

WAI defines a disclosure as a button plus the content it controls, with `aria-expanded` reflecting visibility and an optional `aria-controls` relationship. Its conventional visual cue is a right-pointing triangle when closed and a downward-pointing one when open. [WAI Disclosure Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)

Apple similarly recommends hiding details until relevant, using a label that describes what will be revealed, and placing the disclosure close to the content it controls. [Apple Human Interface Guidelines: Disclosure controls](https://developer.apple.com/design/human-interface-guidelines/disclosure-controls)

## Rotation behavior after disclosure

The five-second rotation should begin only after the user expands the section. It should not create motion or network work while hidden.

- Put **Pause rotation** before the changing track in keyboard order.
- Change that control's label to the action it will perform: `Pause rotation` or `Resume rotation`.
- Stop rotation when keyboard focus enters the revealed area or the pointer hovers over it; require an explicit resume afterward.
- Keep automatic changes out of an ARIA live region. If rotation is paused and tracks change only by user action, a polite live region can be considered.
- For reduced motion, reveal the section without movement and default the track rotation to paused.

These are the WAI carousel recommendations for automatically changing content: the rotation control precedes the rotating content, its label states the available action, and live announcements stay off during automatic rotation. [WAI Carousel Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)

Motion itself should be subordinate. NN/g notes that moving elements attract attention and recommends little or no positional motion for contextual features that should not interrupt the primary task. [Animation for Attention and Comprehension](https://www.nngroup.com/articles/animation-usability/)

## Why this hierarchy works

Progressive disclosure is useful only when the initial view contains the truly important material and the path to secondary material is obvious. The label must set a clear expectation for what appears next. `Listening lately` is specific without becoming another promotional call to action. [NN/g: Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/)

The control still needs redundant visual cues. WCAG says color cannot be the only means of indicating an action, and keyboard-operable controls need a visible focus indicator. [WCAG 2.2: Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color) [WCAG 2.2: Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible)

## Avoid

- An icon-only music control: a record, equalizer, or note identifies the topic but not the show/hide action.
- A pill embedded mid-sentence: it interrupts reading and resembles a tag or filter.
- A dotted underline: it commonly suggests an abbreviation, tooltip, or uncertain help affordance.
- Album art in the collapsed state: it gives the playlist more visual weight than the resume and email actions.
- A second filled or outlined button: the hero already has a clear action hierarchy.
- Motion before the user asks to see the secondary content.

## Sources

- [W3C WAI: Disclosure (Show/Hide) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)
- [W3C WAI: Example Disclosure Card](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-card/)
- [W3C WAI: Carousel Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)
- [WCAG 2.2: Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color)
- [WCAG 2.2: Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible)
- [WCAG 2.2: Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [Apple Human Interface Guidelines: Disclosure controls](https://developer.apple.com/design/human-interface-guidelines/disclosure-controls)
- [NN/g: Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/)
- [NN/g: Beyond Blue Links](https://www.nngroup.com/articles/clickable-elements/)
- [NN/g: Animation for Attention and Comprehension](https://www.nngroup.com/articles/animation-usability/)
