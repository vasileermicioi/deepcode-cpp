# Proposal

## Why

The task header shows solved progress as a global count across all sections (e.g. `6/110 solved` while an `Integer` task is selected), but the task dropdown is filtered to the current category via the Begin / Integer / Boolean selector. Learners cannot tell how far they are within the section they are actually working through, and the bar fill (`solved / global-total`) understates section progress.

## What Changes

- Change progress derivation in `src/App.tsx` to current-category scope: `solvedCount` counts solved ids within `visibleTasks` only; `totalCount` is `visibleTasks.length` (40 Begin, 30 Integer, 40 Boolean); `solvedPct` derives from those per-category values.
- Keep `totalSolvedCount = solvedIds.size` only for the global `resetProgress` disabled state (`disabled={totalSolvedCount === 0}`), not for the count/bar.
- Keep `role="progressbar"` with correct per-category `aria-valuenow={solvedCount}` / `aria-valuemax={totalCount}`; `aria-label` unchanged.
- Update `openspec/specs/solved-progress/spec.md` Requirement `Progress statistics` scope from global to current category, plus scenarios.
- Update `README.md` progress paragraph from global `N/110` to per-category counts; storage key `deepcode-cpp-solved-v1` unchanged.
- No change to solved definition, persistence, dropdown marks, `resetCode` (clears current task only), or `resetProgress` (still clears entire solved set + drafts after confirm).

## Capabilities

### New Capabilities

None — bug-fix / scope correction only.

### Modified Capabilities

- `solved-progress`: progress statistics scope narrows from global (Begin + Integer + Boolean) to currently selected category. Persistence, solved definition, dropdown marking, and reset-progress behavior unchanged.

## Impact

- Affected code: `src/App.tsx` (progress derivation lines ~539-542 + `resetProgress` disabled prop only); docs: `openspec/specs/solved-progress/spec.md`, `README.md`.
- No worker/compiler (`compiler.worker.ts`, `compiler-client.ts`, `runtime.ts`), test-runner, task-data, or deployment changes. No storage migration (same key, same id set; only the displayed numerator/denominator change).
- Existing stored progress preserved; `loadSolvedIds` whitelist and corrupt-storage fallback unchanged.
