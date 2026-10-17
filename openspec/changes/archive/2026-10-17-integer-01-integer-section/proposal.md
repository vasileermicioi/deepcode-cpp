# Proposal

## Why

The app ships only the 40 Begin tasks; learners have no follow-on material. Adding the ptaskbook Integer section (Integer1–Integer30) gives the next canonical practice block while reusing the proven Begin pattern (trilingual content, 5 tests/task, solved/progress tracking).

## What Changes

- Add `src/lib/tasks-integer.ts` with 30 trilingual tasks (`Integer1..Integer30`, `id/number/text/{en,ru,ro}/stdin/starter`), `int`-only C++20 starters in Begin style.
- Add `src/lib/tasks-integer-tests.ts` with 5 deterministic cases per task (150 total) in canonical integer form.
- Reuse `src/lib/test-runner.ts` as-is (`compareOutputs`, `runBeginTests`); generalize only the test-case type name if needed.
- Unify `src/App.tsx` registry (`BEGIN_TASKS + INTEGER_TASKS`, combined tests map): task lookup, `getInitialTaskId`, `selectTask`, `loadSource`, per-task source/stdin persistence, `runTests` case lookup; separate category selector (Begin / Integer) filtering the task dropdown; progress denominator 70; `loadSolvedIds` whitelist expands; `resetCode`/`resetProgress` cover both sections.
- Update `README.md` progress paragraph (`N/40` → `N/70`, Begin + Integer coverage).
- No worker/compiler/toolchain changes; no `compareOutputs` threshold or timeout changes.

## Capabilities

### New Capabilities

- `integer-tasks`: Integer task catalogue (30 trilingual tasks with neutral starters and default stdin), 5 test cases per task evaluated by the existing runner, and Integer solved tracking consistent with Begin.

### Modified Capabilities

- `solved-progress`: Solved persistence/storage scope, dropdown marking (section-grouped), and progress statistics denominator expand from Begin-only (40) to Begin + Integer (70); storage key `deepcode-cpp-solved-v1` and solved definition unchanged.

## Impact

- Affected code: new `src/lib/tasks-integer.ts`, `src/lib/tasks-integer-tests.ts`; modified `src/App.tsx` (registry, dropdown, solved/progress logic), `README.md`, `openspec/specs/` (new `integer-tasks` + `solved-progress` delta).
- No API, worker (`compiler.worker.ts`, `compiler-client.ts`, `runtime.ts`), or deployment changes. Existing Begin progress in `localStorage` preserved (ids disjoint, same key).
