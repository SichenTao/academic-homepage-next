# Design QA

## Scope and source of truth

- Reference: Ran Cheng homepage, `https://chengran.tech/`, captured in light theme at 1440 × 1000.
- Implementation: Sichen Tao academic homepage, local Jekyll build at the `/academic-homepage-next/` base path.
- Fidelity target: reproduce the reference's compact academic information architecture, typographic rhythm, five-item news block, and publication-list geometry while preserving Sichen Tao's content, purple identity, and original paper figures.

## Comparison evidence

| Surface                            | Reference                                                           | Implementation                                                   | Viewport and state                                              |
| ---------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------- |
| Full homepage top                  | `design-qa/ran-reference-1440x1000.jpg`                             | `design-qa/home-implementation-1440x1000-final.jpg`              | 1440 × 1000, light theme, scroll top                            |
| Focused selected-publications view | `design-qa/ran-reference-publications-1440x1000.jpg`                | `design-qa/publications-implementation-1440x1000-final.jpg`      | 1440 × 1000, light theme, section heading aligned at y = 180 px |
| Homepage mobile                    | N/A; responsive behavior judged against the same reference language | `design-qa/home-implementation-390x844-final.jpg`                | 390 × 844, light theme, scroll top                              |
| Homepage publications mobile       | N/A                                                                 | `design-qa/publications-implementation-390x844-final2.jpg`       | 390 × 844, light theme, selected-publications section           |
| Full Publications page desktop     | N/A                                                                 | `design-qa/full-publications-implementation-1440x1000-final.jpg` | 1440 × 1000, light theme, scroll top                            |
| Full Publications page mobile      | N/A                                                                 | `design-qa/full-publications-implementation-390x844-final.jpg`   | 390 × 844, light theme, selected-publications section           |
| Dark-theme homepage publications   | N/A                                                                 | `design-qa/publications-implementation-1440x1000-dark-final.jpg` | 1440 × 1000, dark theme, selected-publications section          |

The reference and implementation images were inspected together in the same visual comparison input for both the homepage top and selected-publications surfaces.

## Fidelity findings

- Structure: passed. Navigation order, portrait-led biography, compact five-row news block, selected-publications heading, and five-row publication list follow the reference's hierarchy.
- Typography: passed. Body density, heading scale, author/venue hierarchy, abbreviated venue labels, and minimal outline buttons match the reference language. The existing Roboto Slab page headings remain as a deliberate identity detail.
- Spacing and alignment: passed. Both desktop pages use a 900 px content rail. The focused publication comparison aligns the section heading to the same y-position; image, title, author, venue, and action columns share a consistent baseline rhythm.
- Color and contrast: passed. The implementation retains Sichen Tao's purple rather than copying Ran Cheng's magenta. Light-theme purple on white is 7.82:1. Dark-theme light purple on `#1c1c1d` is 8.07:1. Dark venue badges use `#1c1c1d` text on the light-purple surface at 8.07:1.
- Image quality: passed. Homepage figures are uniformly framed, use `object-fit: contain`, and are resized copies of original paper figures documented in `assets/img/publication_preview/SOURCES.md`; no AI-generated publication art is used.
- Responsive behavior: passed. At 390 px, the profile becomes a centered 300 × 225 block, publication labels and figures have matching 240 px widths on the homepage, the full Publications cards stack to 360 px, and document width remains 390 px with no horizontal overflow.
- Content and interactions: passed. Homepage News renders five items; homepage selected publications renders five CAS Q1 journal papers; the full Publications page renders eight CAS Q1 highlights plus all 47 publications. ABS disclosure, DOI links, navigation, theme toggle, and publication search were exercised. The search query `adversarial game optimization` returned `Showing 1 of 47 publications.`
- Runtime integrity: passed. Desktop and mobile documents reached `complete`, all tested routes retained their expected base path, and the browser reported zero incomplete or zero-width images after load.

## Iteration history

1. Initial desktop implementation: `design-qa/home-implementation-1440x1000-pass1.jpg`, `design-qa/publications-implementation-1440x1000-pass1.jpg`, and `design-qa/full-publications-implementation-1440x1000-pass1.jpg`.
2. P2 mobile profile failure: the first responsive pass left the portrait oversized (`design-qa/home-implementation-390x844-pass1.jpg`); the second pass exposed Tailwind's important float utility and wrapped biography text beside the portrait (`design-qa/home-implementation-390x844-pass2.jpg`). Fixed by providing a local About layout with a dedicated `profile-left` class and an explicit mobile float reset. Verified in `design-qa/home-implementation-390x844-final.jpg`.
3. P2 mobile publication-label mismatch: the abbreviated venue strip initially spanned the full 360 px row while the paper figure was 240 px (`design-qa/publications-implementation-390x844-final.jpg`). Fixed by constraining the abbreviation column to 270 px including its 15 px side padding. Verified in `design-qa/publications-implementation-390x844-final2.jpg`.
4. P2 dark-theme badge contrast: white text on the light-purple badge surface measured 2.11:1. Fixed by switching dark-theme badge text to `#1c1c1d`, producing 8.07:1. Verified in `design-qa/publications-implementation-1440x1000-dark-final.jpg`.

## Remaining findings

- P0: none.
- P1: none.
- P2: none.
- P3: none that block release. Original paper figures naturally vary in internal text density; their common frame, dimensions, and non-stretched rendering keep the list visually coherent without altering scholarly source material.

final result: passed
