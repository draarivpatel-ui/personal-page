# Personal Site build log

Numbered devlog chunks for the Hack Club Stardance "Personal Site" mission (`draarivpatel-ui/personal-page`).

## 2026-10-25 - Devlog #1: Swiss drafting-table layout, 6-project showcase, tabla stepper, and keyboard controls

1. **Drafting-sheet HTML architecture (`index.html`)**: Structured the site around four numbered specification rails (`01 SPEC // IDENTITY`, `02 INDEX // SYSTEMS`, `03 PRACTICE // CRAFT`, `04 COLOPHON // SPEC`). Replaced any portrait photo with a custom SVG geometric monogram (`a.`) framed by dimension callouts (`R28.0`, `FIG 1.0`).
2. **Custom CSS tokens & blueprint grid (`styles.css`)**: Wrote a responsive stylesheet from scratch with zero external frameworks. Defined two complete color palettes using CSS custom properties: `Dark Draft` (`#0b0f17` obsidian surface, `#e05a2b` drafting vermilion, `#38bdf8` blueprint cyan) and `Daylight Paper` (`#f5f2eb` archival vellum). Layered a fixed CSS radial-and-linear blueprint grid underneath the layout.
3. **Interactive project filter & Tintal tabla visualizer (`script.js`)**: Wired category filtering (`All`, `Developer Tools`, `Web Systems`, `Games`) across six shipped projects (`Regatta`, `wasitme`, `AarivOS`, `Pulse`, `Devlog Timer`, `Garlic Panic`), a live cursor X/Y coordinate readout in the sticky header, an interactive 16-beat *Tintal* (`4 + 4 + 4 + 4`) tabla matra stepper showing traditional *bols* (`Dha`, `Dhin`, `Tin`, `Ta`) and *vibhag* markers (`Sam`, `Tali`, `Khali`), and keyboard shortcuts (`1-4` section jump, `t` theme toggle, `f` filter cycle, `m` matra step).
4. **Verification & screenshot**: Validated `script.js` with `node --check`, audited all files for strict privacy and typography compliance (zero em/en-dashes, zero emojis, no city names or personal email), and captured a 1280x800 headless Chrome screenshot at `screenshot.png`.
