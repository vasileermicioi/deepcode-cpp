# Tasks

## 1. Setup and prerequisites

- [x] 1.1 Confirm prerequisites exist (`src/lib/tasks-begin.ts`, `src/lib/tasks-begin-tests.ts`, `src/lib/tasks-integer.ts`, `src/lib/tasks-integer-tests.ts`, `src/App.tsx` registry, `src/lib/test-runner.ts`) and verify `bunx tsc -b` exits 0 before changes
- [x] 1.2 Skim ptaskbook Boolean en source plus ru reference and confirm the 40 Scope-table formulas need no runtime validation (digit-count preconditions, `A != 0`, nonzero `x,y`, `1..8` chess range, valid-triangle preconditions)

## 2. Catalogue data — `src/lib/tasks-boolean.ts`

- [x] 2.1 Create `src/lib/tasks-boolean.ts` exporting `BOOLEAN_TASKS` with 40 entries (`Boolean1..Boolean40`, `BeginTask` shape via `import type { BeginTask }`) and verify `bunx tsc -b` exits 0
- [x] 2.2 Author neutral starters in Begin/Integer style (`cin >>` exact inputs per Scope table, `// TODO: write your solution here` + `// <-- your code here`, `bool result = false;` + `cout << result;`, `#include <cmath>` only for Boolean32) and verify by inspection that each reads its documented inputs with no solution in comments
- [x] 2.3 Author trilingual `text` for all 40 tasks (en from ptaskbook en, ru against ru page, ro in Begin tone with `Verificați propoziția`) and verify en/ru/ro render correctly by inspection of the data file
- [x] 2.4 Set a representative default `stdin` per task and verify each parses under its starter's `cin >>` chain

## 3. Test data — `src/lib/tasks-boolean-tests.ts`

- [x] 3.1 Create `src/lib/tasks-boolean-tests.ts` exporting `BOOLEAN_TESTS` with exactly 5 deterministic `{stdin, expected}` cases per task (200 total, `expected` only `"0"`/`"1"`) and verify every expectation by hand-computing its Scope formula
- [x] 3.2 Cover true/false edges per task (zero/negative, boundary splits, ordering permutations, parity mixes incl. negatives with `!= 0`, sign mixes incl. `0`, digit boundaries, equal/opposite triples, digit-order cases, `D > 0 / = 0 / < 0`, quadrants, inside/outside/on-border, triangle triples, black/white and piece-reachability pairs) and verify edge list against the spec's pinned semantics
- [x] 3.3 Confirm `compareOutputs`/`runBeginTests` evaluate Boolean `0`/`1` cases unchanged, generalizing only the test-case type name if the `Begin` prefix confuses, and verify `bunx tsc -b` exits 0 with no threshold/timeout change by diff inspection

## 4. UI wiring — `src/App.tsx` and docs

- [x] 4.1 Extend the three-section registry (`[...BEGIN_TASKS, ...INTEGER_TASKS, ...BOOLEAN_TASKS]`, combined `ALL_TESTS`) routing `getInitialTaskId`, task lookup, `selectTask`, `loadSource`, source/stdin persistence, and `runTests` case lookup through it, and verify `bunx tsc -b` exits 0 with Begin/Integer selection still working
- [x] 4.2 Add the Boolean option to the existing category selector (Begin / Integer / Boolean, labels from `UI_TEXT` incl. new `booleanGroup`), derive the section from the task id, filter the task dropdown with existing `Select` primitives, route category switch to that section's first task, and verify visually that both solved and selection marks show when a Boolean task is solved and current
- [x] 4.3 Expand `loadSolvedIds` whitelist to combined ids (keep `SOLVED_KEY = "deepcode-cpp-solved-v1"`), update progress to combined total (`N/110`, `role="progressbar"` with correct aria values), extend `resetCode`/`resetProgress` to all three sections, add `booleanGroup: "Boolean"` to `UI_TEXT` en/ru/ro, and verify `bunx biome check .` and `bunx tsc -b` both exit 0 with no hard-coded English strings
- [x] 4.4 Update `README.md` progress paragraph (Begin + Integer + Boolean coverage, count `N/110`, key unchanged) and verify the rendered paragraph matches shipped behavior by inspection

## 5. Verification

- [x] 5.1 Run `bunx tsc -b`, `bunx biome check .`, and `bun run build` and verify all three succeed
- [ ] 5.2 Walk Boolean1–Boolean40 in `bun dev` (default-stdin `Run`, reference solution `Run tests` for 5/5 PASS, solved emerald mark distinct from selection check, count/bar live update, reload persists, `Reset code` clears only that task, corrupt `localStorage["deepcode-cpp-solved-v1"]` falls back cleanly) plus spot-check one Begin and one Integer task, and verify 40 × 5/5 PASS observed with no regressions
