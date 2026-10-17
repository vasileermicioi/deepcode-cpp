# Tasks

## 1. Setup and Prerequisites

- [x] 1.1 Confirm prerequisites exist (`src/lib/tasks-begin.ts`, `src/lib/tasks-begin-tests.ts`, `src/App.tsx` solved/progress block, `src/lib/test-runner.ts`) and verify with `bunx tsc -b` exiting 0 before making changes.
- [x] 1.2 Skim ptaskbook Integer source (en, plus ru reference) and record the 30 formulas/stdins from the step plan, verifying digit-task contracts (10–99, 100–999, `>999`, `A>B`, `K`/`N` ranges) need no runtime validation.

## 2. Data — `src/lib/tasks-integer.ts`

- [x] 2.1 Create `src/lib/tasks-integer.ts` exporting `INTEGER_TASKS` with 30 entries (`Integer1..Integer30`, `{id, number, text:{en,ru,ro}, stdin, starter}`) reusing the Begin shape, and verify `bunx tsc -b` exits 0.
- [x] 2.2 Author `int`-only starters in Begin style (`#include <iostream>` + `using namespace std;`, `cin >>`, neutral `// TODO: write your solution here` with `// <-- your code here`, single-line `cout`), verifying each starter reads its documented inputs and contains no solution or `<cmath>`/`std::` usage by inspection.
- [x] 2.3 Author trilingual `text` for all 30 tasks from the ptaskbook en source (ru checked against ru page, ro in Begin ro tone), verifying each task renders correctly in en/ru/ro by inspection of the data file.

## 3. Tests Data — `src/lib/tasks-integer-tests.ts`

- [x] 3.1 Create `src/lib/tasks-integer-tests.ts` exporting `INTEGER_TESTS` with exactly 5 deterministic `{stdin, expected}` cases per task (150 total) in canonical integer form, verifying every expected value by hand-computing its formula (especially 13/14/15/16 reversals and 24–28 weekday arithmetic) before wiring the UI.
- [x] 3.2 Confirm `compareOutputs`/`runBeginTests` evaluate Integer cases unchanged (canonical form, e.g. Integer8 `10→1`) and generalize only the test-case type name if the `Begin` prefix confuses, verifying `bunx tsc -b` exits 0 and no threshold/timeout logic changed by diff inspection.

## 4. UI — `src/App.tsx` Unified Registry and Progress

- [x] 4.1 Introduce the unified registry (combined `BEGIN_TASKS + INTEGER_TASKS` task list and combined tests map) routing `getInitialTaskId`, task lookup, `selectTask`, `loadSource`, source/stdin persistence, and `runTests` case lookup through it, verifying `bunx tsc -b` exits 0 and Begin task selection still works.
- [x] 4.2 Add a separate category selector (Begin / Integer) filtering the task dropdown using existing `Select` primitives without touching `src/components/ui/select.tsx`, keeping the left emerald solved mark distinct from the right selection check, and verify visually that both marks show when a task is solved and current. (Begin / Integer) using existing `SelectGroup`/`SelectLabel` primitives without touching `src/components/ui/select.tsx`, keeping the left emerald solved mark distinct from the right selection check, and verify visually that both marks show when a task is solved and current.
- [x] 4.3 Expand `loadSolvedIds` whitelist to combined ids while keeping `SOLVED_KEY = "deepcode-cpp-solved-v1"`, update progress to combined total (`N/70` with `role="progressbar"` and correct aria values), extend `resetCode`/`resetProgress` to both sections, and verify with `bunx biome check .` and `bunx tsc -b` both exiting 0; no hard-coded English in new UI strings.
- [x] 4.4 Update the `README.md` progress paragraph (Begin + Integer coverage, count `N/70`, key unchanged) and verify the rendered paragraph matches the shipped behavior by inspection.

## 5. Validation

- [x] 5.1 Run `bunx biome check .`, `bunx tsc -b`, and `bun run build`, verifying all three succeed (biome/tsc exit 0, build succeeds).
- [x] 5.2 Walk each Integer1–Integer30 in `bun dev`: default-stdin `Run` works and `Run tests` shows 5/5 PASS with a reference solution; solve marks the dropdown emerald, count/bar update live, reload persists, `Reset code` clears only that task, and corrupt `localStorage["deepcode-cpp-solved-v1"]` falls back to empty without crash.
