# Tasks

## 1. Setup and prerequisites

- [x] 1.1 Confirm prerequisites exist (`src/lib/tasks-begin.ts`, `src/lib/tasks-begin-tests.ts`, `src/lib/tasks-integer.ts`, `src/lib/tasks-integer-tests.ts`, `src/lib/tasks-boolean.ts`, `src/lib/tasks-boolean-tests.ts`, `src/App.tsx` registry, `src/lib/test-runner.ts`) and verify `bunx tsc -b` exits 0 before changes
- [x] 1.2 Skim ptaskbook If en source plus ru reference and confirm the 30 Scope-table formulas need no runtime validation (digit-count preconditions If30 1..999, `x != 0 && y != 0` for If22, valid-rectangle for If23, exactly-one-differs for If18/If19, distinct distances for If20 tests)

## 2. Catalogue data — `src/lib/tasks-if.ts`

- [x] 2.1 Create `src/lib/tasks-if.ts` exporting `IF_TASKS` with 30 entries (`If1..If30`, `BeginTask` shape via `import type { BeginTask }`) and verify `bunx tsc -b` exits 0
- [x] 2.2 Author neutral starters in Begin/Integer/Boolean style (`cin >>` exact inputs per Scope table, `// TODO: write your solution here` + `// <-- your code here`, no `std::` prefixes, no fast-io guards; `int` for If1–5/If10–11/If18–19/If21/If23/If25/If28–30, `double` for If6–9/If12–17/If20/If22/If24/If26–27; `string desc` + `cout << desc` with `<string>` for If29/If30, `<cmath>` only for If24/If27) and verify by inspection each starter reads its documented inputs with no solution in comments
- [x] 2.3 Author trilingual `text` for all 30 tasks (en from ptaskbook en, ru against ru page, ro in Begin tone) and verify en/ru/ro render correctly by inspection of the data file
- [x] 2.4 Set a representative default `stdin` per task and verify each parses under its starter's `cin >>` chain

## 3. Test data — `src/lib/tasks-if-tests.ts`

- [x] 3.1 Create `src/lib/tasks-if-tests.ts` exporting `IF_TESTS` with exactly 5 deterministic `{stdin, expected}` cases per task (150 total) and verify every expectation by hand-computing its Scope formula
- [x] 3.2 Cover every branch per task (positive/negative/zero for If1–5, equal-pair zeroing for If10–11, min/middle/max permutations for If12–15, ordered ascending/descending vs unordered incl. equals for If16–17, differing-position 1..3/1..4 for If18–19, B-nearer vs C-nearer with coordinate+distance form for If20, origin/axis/off-axis for If21, all 4 quadrants for If22, missing-vertex variants for If23, piecewise boundaries `x = 0 / ±2 / 2` and `sin`/`floor` values for If24–27, leap/ordinary/centenary/400-year for If28, all 5 description strings for If29, all 6 digit×parity strings for If30) and verify edge list against the spec's pinned semantics
- [x] 3.3 Confirm string outputs (If29/If30 exact lowercase English, e.g. `zero number`, `two-digit odd number`) pass through the existing string-token path and numeric tasks through the numeric path, generalizing only the test-case type name if the `Begin` prefix confuses, and verify `bunx tsc -b` exits 0 with no `compareOutputs` threshold/timeout change by diff inspection

## 4. UI wiring — `src/App.tsx` and docs

- [x] 4.1 Extend the four-section registry (`[...BEGIN_TASKS, ...INTEGER_TASKS, ...BOOLEAN_TASKS, ...IF_TASKS]`, combined `ALL_TESTS`) routing `getInitialTaskId`, task lookup, `selectTask`, `loadSource`, source/stdin persistence, and `runTests` case lookup through it, and verify `bunx tsc -b` exits 0 with Begin/Integer/Boolean selection still working
- [x] 4.2 Add the If option to the existing category selector (Begin / Integer / Boolean / If, labels from `UI_TEXT` incl. new `ifGroup`), derive the section from the task id, filter the task dropdown with existing `Select` primitives, route category switch to that section's first task, and verify visually both solved and selection marks show when an If task is solved and current
- [x] 4.3 Expand `loadSolvedIds` whitelist to combined ids (keep `SOLVED_KEY = "deepcode-cpp-solved-v1"`), update progress to combined total (`N/140`, `role="progressbar"` with correct aria values), extend `resetCode`/`resetProgress` to all four sections, add `ifGroup: "If"` to `UI_TEXT` en/ru/ro, and verify `bunx biome check .` and `bunx tsc -b` both exit 0 with no hard-coded English strings
- [x] 4.4 Update `README.md` progress paragraph (Begin + Integer + Boolean + If coverage, count `N/140`, key unchanged) and verify the rendered paragraph matches shipped behavior by inspection
- [x] 4.5 Write `openspec/specs/if-tasks/spec.md` (new) and the `solved-progress` delta to match shipped behavior and verify `openspec validate --strict` passes for the change

## 5. Verification

- [x] 5.1 Run `bunx tsc -b`, `bunx biome check .`, and `bun run build` and verify all three succeed
- [x] 5.2 Walk If1–If30 in `bun dev` (default-stdin `Run`, reference solution `Run tests` for 5/5 PASS each for 150/150, solved emerald mark distinct from selection check, count/bar live update, reload persists, `Reset code` clears only that task, corrupt `localStorage["deepcode-cpp-solved-v1"]` falls back cleanly) plus spot-check one Begin, one Integer, and one Boolean task, and verify 30 × 5/5 PASS observed with no regressions
