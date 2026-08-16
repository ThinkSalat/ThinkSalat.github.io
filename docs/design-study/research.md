# Resume interface design study and operating protocol

## Purpose

This document replaces unguided variant generation with a four-stage study and evaluation process for the resume site:

1. visual and interface design fundamentals;
2. the official *Refactoring UI* material from Adam Wathan and Steve Schoger;
3. human-computer interaction (HCI), meaning the study of how people understand and operate interactive systems;
4. advanced composition and evidence-based evaluation.

The sequence matters. A new hero is not ready to be called an advanced design because it contains an unusual rail, overlap, shelf, border, or card. It is ready only when the designer can explain the content hierarchy, grouping, alignment, interaction behavior, responsive behavior, and evidence for the result. Apple treats placement and alignment as tools for communicating importance and organization, while Nielsen's minimalist-design heuristic says every irrelevant unit competes with relevant information. [Apple: Layout](https://developer.apple.com/design/human-interface-guidelines/layout) [Nielsen: 10 usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)

This is a working protocol, not proof that a design is good. Passing a source check proves that the implementation matches an intended rule. Passing a build proves that the site compiles. Neither proves that the visual composition works in a browser or that people can use it. Heuristic review can expose likely problems, but it cannot replace observation of actual users performing realistic tasks. [Nielsen Norman Group: How to conduct a heuristic evaluation](https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/)

## The design problem, stated before styling

The hero has five jobs, in this order:

1. identify Shawn Salat;
2. identify the professional role;
3. communicate the professional focus accurately and quickly;
4. make the PDF resume and email actions easy to find;
5. keep the editable DOCX and personal listening detail discoverable without letting either compete with the main message.

That order is a project decision derived from the page's content, not a universal law. It should be challenged only with evidence about the site's actual audience and goals. Human-centred design begins with real user needs, tests assumptions with real people, and iterates rather than treating an author's preference as proof. [U.S. Web Design System: Design principles](https://designsystem.digital.gov/design-principles/) [ISO 9241-210:2019](https://www.iso.org/standard/77520.html)

Before changing CSS, write a one-sentence hypothesis. Example: “The CTA feels detached because it follows the blurb's inner axis while sitting outside the surface that establishes that axis.” A variant must test that statement; it must not quietly change five other relationships at the same time.

---

## Stage 1 — Visual and interface design fundamentals

### 1.1 Perception and grouping

People do not perceive a page as a collection of independent pixels. Wertheimer's original work on perceptual organization describes how elements are seen as arrangements and groups, including grouping by proximity and similarity. For interface work, the practical lesson is to ask what the spacing, alignment, shape, and color cause the viewer to see as one unit before adding an explicit separator. [Max Wertheimer, “Laws of Organization in Perceptual Forms” (1923), York University](https://psychclassics.yorku.ca/Wertheimer/Forms/forms)

Negative space, background shapes, color, material, and separators can all express grouping. Alignment also supports scanning and communicates organization and hierarchy. A separator is therefore one option among several, not the default proof that two areas differ. [Apple: Layout](https://developer.apple.com/design/human-interface-guidelines/layout)

**Practice:** annotate the hero without editing it. Mark:

- every left and right alignment axis;
- every perceived group;
- the reading path from first to fifth item;
- the strongest and weakest visual elements;
- every gap, border, fill, radius, shadow, and size change that claims to communicate hierarchy.

If a relationship requires a verbal excuse that cannot be seen in the annotation, the composition is not yet communicating it.

### 1.2 Hierarchy

Visual hierarchy is the ordering of attention. Position, size, font, weight, and color can distinguish foreground information from supporting information; these tools should be judged as a whole rather than optimized in isolation. Butterick recommends deciding the body text first because the rest of a page is experienced in relation to it. [Matthew Butterick: Maxims of page layout](https://practicaltypography.com/maxims-of-page-layout.html)

Typography can communicate hierarchy through weight, size, and color, but too many typefaces can obscure the hierarchy and make the interface feel inconsistent. [Apple: Typography](https://developer.apple.com/design/human-interface-guidelines/typography)

**Practice:** make a plain grayscale version using only one type family, three type roles, and spacing. It must still make name → role → professional summary → actions → supporting details apparent. Color and containers may be restored only after the grayscale hierarchy works.

### 1.3 Typography and readable measure

Body-text appearance is controlled substantially by font choice, size, line spacing, and line length. Butterick's author-published starting ranges for web body text are 15–25 pixels, 120–145% line spacing, and 45–90 characters per line; these are starting points to test, not automatic pass conditions. [Matthew Butterick: Summary of key rules](https://practicaltypography.com/summary-of-key-rules.html)

WCAG's enhanced visual-presentation criterion uses an average line width of no more than 80 characters as one accessible presentation target. The W3C also documents relative column widths as a sufficient technique for maintaining that measure as the browser is resized. [WCAG 2.2: Visual Presentation](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html) [W3C technique C20](https://www.w3.org/WAI/WCAG22/Techniques/css/C20)

**Practice:** measure the actual hero lines at desktop, tablet, narrow mobile, 200% zoom, and increased text size. Do not judge the paragraph only from a single wide screenshot.

### 1.4 Color, contrast, and shape

Normal text needs at least 4.5:1 contrast against its actual background under WCAG 2.2 AA; large text needs at least 3:1. Meaningful control boundaries and states also have non-text contrast requirements. [WCAG 2.2: Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum) [WCAG 2.2: Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)

Color, radius, border, and shadow are not decoration-free choices. Repetition makes them a visual grammar: a large soft capsule, circular framed portrait, square solid button, and thin outlined button can imply several unrelated component families unless their differences have a clear purpose. This “grammar” framing is a project synthesis from the grouping and consistency sources, not a quoted rule. [Wertheimer (1923)](https://psychclassics.yorku.ca/Wertheimer/Forms/forms) [Nielsen: Consistency and standards](https://www.nngroup.com/articles/consistency-and-standards/)

### Stage 1 gate

Do not move on until a hero can be explained with:

- no more alignment axes than its content model needs;
- named type roles and measured line lengths;
- a repeatable spacing scale;
- a small set of foreground/background roles;
- a single, deliberate radius and depth language;
- verified text and control contrast.

---

## Stage 2 — Apply *Refactoring UI* as tactics, not slogans

The official *Refactoring UI* curriculum covers starting with a feature instead of a layout, choosing a personality, limiting choices, separating visual hierarchy from document hierarchy, establishing spacing and type scales, avoiding ambiguous spacing, controlling line length and line height, and using fewer borders. The authors present these as concrete tactics for developers, not as permission to decorate every variant differently. [Official *Refactoring UI* site and table of contents](https://refactoringui.com/)

### 2.1 Use the least explicit device that communicates the relationship

The authors' published “use fewer borders” example says borders can distinguish elements but too many make a design busy; alternatives include a shadow, a contrasting background, or simply more space. The correct lesson is not “borders are forbidden.” It is to choose the quietest device that makes the relationship clear. [Official *Refactoring UI* site](https://refactoringui.com/)

For this hero, the pale surface around the portrait and blurb can establish a group without an `<hr>`. It succeeds only if its size and shape support the content rather than becoming the most dominant object on the page. That application is an inference from the authors' tactic, not wording from the book.

### 2.2 De-emphasize supporting information

The official “Labels are a last resort” preview explains that naive label/value presentation gives items equal emphasis. When a label is necessary, it should normally support the value through smaller size, lower contrast, lighter weight, or a combination. [*Refactoring UI*: Labels are a last resort](https://refactoringui.com/previews/labels-are-a-last-resort)

Applied here:

- “Software Engineer” supports the name; it should not rival it.
- “Download DOCX” supports the PDF action; it should remain findable without becoming a third primary button.
- “Listening lately” is personal supporting detail; its signifier must be clear, but its salience must remain below the resume and email actions.

### 2.3 Make spacing unambiguous

The official table of contents names “avoid ambiguous spacing” as a layout principle. In this project, that means an action row must be visibly owned by the entire hero or by a specific inner column; it should not hover at a distance that makes both readings plausible. [Official *Refactoring UI* site](https://refactoringui.com/)

Spacing should come from a limited scale rather than a new one-off value for every gap. That constraint makes comparisons legible: a viewer can learn which gaps mean “inside this group” and which mean “new group.” The official curriculum explicitly includes establishing a spacing and sizing system. [Official *Refactoring UI* site](https://refactoringui.com/)

### 2.4 Treat line height as contextual

The official line-height preview says line height should respond to both line length and font size: longer lines need more help returning to the next line, while large headlines generally need proportionally less line height. [*Refactoring UI*: Line-height is proportional](https://refactoringui.com/previews/line-height-is-proportional)

### Stage 2 exercise

Refactor one composition in controlled passes:

1. alignment only;
2. spacing only;
3. type hierarchy only;
4. surface/border explicitness only;
5. shape and depth consistency only.

Capture each pass at the same viewport. Do not call these five design candidates; they are five controlled studies of one design. Preserve the original beside them so improvement is judged comparatively rather than from memory.

### Stage 2 gate

Move on only when one coherent revision uses a spacing scale, type scale, and one shape/depth language; every border, fill, shadow, and offset must name the relationship it clarifies. If it clarifies none, remove it.

---

## Stage 3 — Human-computer interaction

Visual design determines more than attractiveness. It provides clues about what can be acted on, predicts the result of an action, and helps people maintain orientation.

### 3.1 Design around people, goals, and context

ISO 9241-210 describes human-centred design principles and activities across the life cycle of an interactive system. USWDS translates that into practical public guidance: start with real user needs, test assumptions with real people, prototype, embrace accessibility, and maintain continuity. [ISO 9241-210:2019](https://www.iso.org/standard/77520.html) [USWDS: Design principles](https://designsystem.digital.gov/design-principles/)

For this site, the primary evaluation tasks are:

| Task | Observable success |
| --- | --- |
| Identify the person and role | Participant states “Shawn Salat, software engineer” without searching |
| Understand professional focus | Participant gives a materially accurate one-sentence summary |
| Get the resume | Participant locates and activates the PDF action |
| Get an editable file | Participant locates the DOCX option without mistaking it for the primary format |
| Make contact | Participant locates and understands the email action |
| Explore personal detail | Participant recognizes that “Listening lately” reveals optional music detail |

The last task is intentionally subordinate. If it is noticed before the role or primary actions in a five-second exposure, the hierarchy has probably inverted the project priorities.

### 3.2 Use signifiers, not mystery

Don Norman distinguishes an affordance (the possible relationship between a person and an object) from a signifier (a perceptible clue about where or how to act). Digital interfaces need visible signifiers because their possible actions are not physically self-evident. [Don Norman: Signifiers, not affordances](https://jnd.org/signifiers-not-affordances/)

The listening disclosure therefore needs to look operable, communicate its state, and predict that more content will appear. But clarity does not require giving it the same visual weight as the primary CTA. Hierarchy and signification are separate design questions.

### 3.3 Apply interaction heuristics

Nielsen's heuristics are broad inspection rules, not substitutes for user research. The most relevant here are match with the real world, consistency and standards, recognition rather than recall, and aesthetic/minimalist design. The last says irrelevant information competes with relevant information and reduces its relative visibility. [Nielsen: 10 usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)

For the hero, that means conventional link/button behavior, plain labels, visible current state for the disclosure, and no decorative interaction that must be decoded before the resume can be downloaded.

### 3.4 Preserve focus and reading order

W3C guidance says keyboard focus should move predictably in the reading order of the page's language, remain visible, and follow consistent patterns. A CSS-only visual reordering that leaves DOM focus jumping through a different order is therefore not an acceptable shortcut. [WAI-ARIA Authoring Practices: Developing a keyboard interface](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/) [WCAG 2.2: Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html)

WCAG 2.2's minimum target-size criterion uses 24 by 24 CSS pixels, with specified exceptions. This is a floor for operability, not a visual recommendation that every action become a large filled button. [WCAG 2.2: Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)

### 3.5 Do not cargo-cult “HCI laws”

Fitts's original experiment modeled a speed/accuracy relationship for aimed movements as target width and movement amplitude changed. Hick's original experiments related choice reaction time to information in controlled sets of alternatives. Neither paper says “make every control huge” or “all interfaces must have fewer choices.” [Paul Fitts, “The Information Capacity of the Human Motor System in Controlling the Amplitude of Movement” (1954)](https://www2.psychology.uiowa.edu/faculty/mordkoff/infoproc/pdfs/Fitts%201954.pdf) [W. E. Hick, “On the Rate of Gain of Information” (1952)](https://doi.org/10.1080/17470215208416600)

The resume hero has a small action set. Its immediate HCI problems are more likely to be signification, hierarchy, focus order, grouping, and target operability than choice overload.

### Stage 3 gate

Do not move on until:

- visual order and keyboard order agree;
- every action has a clear label, state, and visible focus;
- contrast and target-size checks pass;
- the layout survives keyboard use, zoom, increased text size, and mobile widths;
- people unfamiliar with the implementation can complete the six tasks without explanation.

---

## Stage 4 — Advanced composition and evaluation

Advanced design is not more novelty. It is tighter control of multiple systems with less visible effort.

### 4.1 Compose systems, not isolated components

Use one content grid, one type scale, one spacing scale, one color-role system, and one radius/depth grammar across the hero and the section that follows it. Edward Tufte argues for spare, straightforward, self-effacing design that directs attention to content, and distinguishes spare design from merely deleting content; his “smallest effective difference” is a useful standard for choosing how much visual distinction a relationship needs. [Edward Tufte: Analytical design and human factors](https://www.edwardtufte.com/notebook/analytical-design-and-human-factors/)

The web also has no single canonical canvas. Ethan Marcotte's original responsive-web-design essay treats fluid grids, flexible media, and media queries as a way to adapt one experience across changing contexts. A desktop screenshot is therefore one observation, not the design itself. [Ethan Marcotte: Responsive Web Design](https://alistapart.com/article/responsive-web-design/)

### 4.2 Respect first impressions without designing only for them

Tuch and colleagues found that visual complexity and prototypicality affected website aesthetic judgments in exposures as short as 50 milliseconds; low-complexity, high-prototypicality pages were judged most appealing in their experiments. This supports recognizable resume structure and purposeful differentiation over novelty for its own sake. It does not prove that conventional pages are more usable or that every visually simple page is good. [Tuch et al., “The role of visual complexity and prototypicality regarding first impression of websites”](https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/)

Use a five-second prompt for first-glance comprehension: “Who is this, what do they do, and what would you click next?” Then use the concrete PDF, DOCX, email, and disclosure tasks. The first test addresses immediate hierarchy; the later tasks address operation. This test sequence is a project method inferred from the first-impression and usability sources.

### 4.3 Evaluate alternatives as hypotheses

A heuristic evaluation is an inspection against explicit guidelines. It can identify likely problems early, but it does not replace user research because usability is contextual. Evaluators should work independently before results are consolidated so one person's judgment does not anchor the others. [Nielsen Norman Group: How to conduct a heuristic evaluation](https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/)

For each future variation, record:

| Field | Required entry |
| --- | --- |
| Hypothesis | One relationship expected to improve |
| Controlled variable | Alignment, spacing, type, surface, or shape/depth — one primary variable |
| Fixed content | Exact text, portrait, CTA labels, and order that remain unchanged |
| Viewports | Same agreed desktop and mobile dimensions for every comparison |
| Predicted benefit | What a viewer should understand or do more easily |
| Predicted risk | What might become less clear or less usable |
| Source check | Which documented principle the change applies |
| Build check | Whether the implementation compiles and tests pass |
| Browser evidence | Screenshots and interaction checks from the real rendered page |
| User evidence | Task outcome and observed hesitation, error, or comment |
| Decision | Keep, revise, or reject, with reason |

Do not label five uncontrolled compositions as “five attempts.” A valid set of five studies might isolate axis, spacing, surface explicitness, type hierarchy, and shape grammar while keeping the rest stable. Only after those relationships are understood should genuinely different compositions be compared.

### 4.4 Maintain an evidence corpus

The corpus should teach a principle, not merely collect attractive portfolios. Each entry needs:

- source creator and direct source URL;
- date captured and viewport;
- the relationship being studied;
- an original annotation of alignment axes, grouping, salience, spacing, or interaction state;
- what succeeds, what fails, and what is transferable to this site;
- copyright or license notes before any image is redistributed.

Start with paired examples because they expose a controlled design difference better than unrelated inspiration boards. Useful first-party sources include the official *Refactoring UI* fewer-borders example, labels preview, and line-height preview; W3C's target-size and focus examples provide interaction/accessibility cases. [Official *Refactoring UI* site](https://refactoringui.com/) [Labels are a last resort](https://refactoringui.com/previews/labels-are-a-last-resort) [Line-height is proportional](https://refactoringui.com/previews/line-height-is-proportional) [WCAG 2.2: Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) [WCAG 2.2: Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html)

The most valuable initial corpus entries are annotated versions of this site's own screenshots: axis overlay, proximity map, salience ranking, type-role map, and measured vertical rhythm. Those annotations convert “something feels weird” into testable observations.

### Stage 4 gate

A candidate is ready for a keep/reject decision only when it has:

- a stated hypothesis and controlled comparison;
- real-browser screenshots at agreed viewports;
- keyboard, zoom, text-resize, and interaction evidence;
- first-glance and task-based observations from people other than the implementer;
- a written reason grounded in evidence, not in variant number or novelty.

---

## Candidate 20: concise diagnosis of the supplied screenshot

The following are observations and hypotheses from the supplied desktop screenshot, not results of a user study.

1. **The page has too many unrelated horizontal axes.** The navigation and “Experience” heading begin near the page edge; the name and pale surface begin much farther right; the blurb and CTA begin on a third axis. The CTA's alignment to the blurb is internally plausible, but because it sits outside the surface that established that inner column, it looks as though it fell out of the card. Alignment is supposed to aid scanning and communicate organization; here it creates competing organizations. [Apple: Layout](https://developer.apple.com/design/human-interface-guidelines/layout)

2. **The vertical rhythm breaks after the CTA.** The large empty zone between the DOCX line and “Experience” reads less like useful breathing room and more like an accidental section boundary. The action cluster becomes an orphan, and the next section loses continuity with the hero. *Refactoring UI* explicitly includes avoiding ambiguous spacing and establishing a spacing system. [Official *Refactoring UI* site](https://refactoringui.com/)

3. **The ownership of the CTA is unresolved.** It is close to the pale group and shares the blurb's axis, but it is not inside the group. A viewer must infer whether the actions belong to the blurb, the portrait/blurb unit, or the whole hero. The fix should clarify that ownership with alignment and proximity before inventing a separator, rail, shelf, or overlap. [Wertheimer (1923)](https://psychclassics.yorku.ca/Wertheimer/Forms/forms) [Apple: Layout](https://developer.apple.com/design/human-interface-guidelines/layout)

4. **The shape language is inconsistent.** The huge soft capsule, circular portrait with a white ring and shadow, small-radius filled button, and outlined secondary button feel like pieces from different systems. Consistency helps people transfer expectations, while unnecessary visual units compete with the primary information. [Nielsen: Consistency and standards](https://www.nngroup.com/articles/consistency-and-standards/) [Nielsen: Aesthetic and minimalist design](https://www.nngroup.com/articles/aesthetic-minimalist-design/)

5. **The optional listening action steals local attention.** Bold underlined text, arrow, and adjacent punctuation create a dense interaction inside casual copy. It needs a clear signifier, but its current emphasis competes with the professional summary and the actual resume/email actions. [Don Norman: Signifiers, not affordances](https://jnd.org/signifiers-not-affordances/) [Nielsen: Aesthetic and minimalist design](https://www.nngroup.com/articles/aesthetic-minimalist-design/)

6. **The pale surface is larger and louder than the relationship requires.** It does group portrait and text without an `<hr>`, which is directionally sound, but its width and extreme radius make the background object itself a major subject. The right question is not “card or no card”; it is the smallest visible difference that groups the introduction without turning it into a dashboard component. [Official *Refactoring UI* site](https://refactoringui.com/) [Edward Tufte: Analytical design and human factors](https://www.edwardtufte.com/notebook/analytical-design-and-human-factors/)

7. **The page-level type hierarchy does not yet repeat coherently.** The name is intentionally dominant, but after the large void the “Experience” heading returns with substantial weight on another axis. The problem is not a single font size; it is that hero and body do not yet feel governed by one type and spacing system. [Apple: Typography](https://developer.apple.com/design/human-interface-guidelines/typography) [Matthew Butterick: Maxims of page layout](https://practicaltypography.com/maxims-of-page-layout.html)

### Most likely next study

Keep the content order **header → portrait beside uninterrupted blurb → separate CTA row**. Do not add another component. First test one coherent page grid shared by the hero and “Experience,” then test whether the CTA should align to the hero's outer axis or be visibly related to the full portrait/blurb group. Fix the large vertical dead zone before exploring a novel structure.

That is a hypothesis to test, not an approved design.

---

## Primary and authoritative source index

### Visual/interface fundamentals

- [Max Wertheimer, “Laws of Organization in Perceptual Forms” (1923), York University](https://psychclassics.yorku.ca/Wertheimer/Forms/forms)
- [Matthew Butterick: Maxims of page layout](https://practicaltypography.com/maxims-of-page-layout.html)
- [Matthew Butterick: Summary of key rules](https://practicaltypography.com/summary-of-key-rules.html)
- [Apple Human Interface Guidelines: Layout](https://developer.apple.com/design/human-interface-guidelines/layout)
- [Apple Human Interface Guidelines: Typography](https://developer.apple.com/design/human-interface-guidelines/typography)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)

### *Refactoring UI*

- [Official *Refactoring UI* site and table of contents](https://refactoringui.com/)
- [Labels are a last resort](https://refactoringui.com/previews/labels-are-a-last-resort)
- [Line-height is proportional](https://refactoringui.com/previews/line-height-is-proportional)
- [Building your color palette](https://refactoringui.com/previews/building-your-color-palette)

### HCI and accessibility

- [ISO 9241-210:2019](https://www.iso.org/standard/77520.html)
- [Don Norman: Signifiers, not affordances](https://jnd.org/signifiers-not-affordances/)
- [Nielsen: 10 usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)
- [USWDS: Design principles](https://designsystem.digital.gov/design-principles/)
- [WAI-ARIA Authoring Practices: Developing a keyboard interface](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)
- [WCAG 2.2: Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html)
- [WCAG 2.2: Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [Paul Fitts (1954)](https://www2.psychology.uiowa.edu/faculty/mordkoff/infoproc/pdfs/Fitts%201954.pdf)
- [W. E. Hick (1952)](https://doi.org/10.1080/17470215208416600)

### Advanced composition and evaluation

- [Edward Tufte: Analytical design and human factors](https://www.edwardtufte.com/notebook/analytical-design-and-human-factors/)
- [Ethan Marcotte: Responsive Web Design](https://alistapart.com/article/responsive-web-design/)
- [Tuch et al.: Visual complexity, prototypicality, and first impressions](https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/)
- [Nielsen Norman Group: How to conduct a heuristic evaluation](https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/)
