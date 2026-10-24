# Tasks

## 1. Per-category progress implementation

- [x] 1.1 Scope progress derivation in `src/App.tsx` to `visibleTasks` (`solvedCount` filters `visibleTasks` by `solvedIds`, `totalCount = visibleTasks.length`, `solvedPct` from those) while keeping `totalSolvedCount = solvedIds.size` for the `resetProgress` `disabled` prop only, and verify by inspecting the header block shows per-category `aria-valuenow/valuemax` with unchanged `aria-label`.
- [x] 1.2 Update `README.md` progress paragraph from global `N/110` to per-category (`N/40` Begin, `N/30` Integer, `N/40` Boolean, key `deepcode-cpp-solved-v1` unchanged) and verify the rendered paragraph matches the shipped per-category behavior by inspection.

## 2. Verification

- [x] 2.1 Run `bunx tsc -b` and `bunx biome check .` and verify both exit 0 with no new warnings on touched files.
- [x] 2.2 Walk the user-visible path in `bun dev`: with Integer selected and 6 Integer tasks solved header reads `6/30 solved` (localized), bar fill 20%, `aria-valuemax=30`; switch to Begin shows `M/40` with matching bar; solving/resetting a task updates count + bar immediately without reload; `resetProgress` stays enabled when another category holds solves and clears everything on confirm; switching locale en/ru/ro keeps labels localized — and verify all observations pass with no regressions.
