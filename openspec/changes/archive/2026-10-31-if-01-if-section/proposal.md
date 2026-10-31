# Proposal

## Why

Learners finish Begin (40) + Integer (30) + Boolean (40) and have no conditional-statement material; app progress stalls at `N/110`. Adding the ptaskbook If block (If1–If30) closes the curriculum gap the same way Integer and Boolean did, as one independently mergeable slice.

## What Changes

- New catalogue data `src/lib/tasks-if.ts` exporting `IF_TASKS` (30 entries `If1..If30`, `BeginTask` shape, trilingual en/ru/ro, neutral `int main()` starter, representative default stdin).
- New test data `src/lib/tasks-if-tests.ts` exporting `IF_TESTS` with exactly 5 deterministic `{stdin, expected}` cases per task (150 total), hand-computed against pinned Scope-table formulas.
- UI wiring in `src/App.tsx` only: four-section registry (`ALL_TASKS` / `ALL_TESTS`), `If` category option, `ifGroup: "If"` in `UI_TEXT` en/ru/ro, combined `loadSolvedIds` whitelist, denominator `N/110` → `N/140`, reset paths extended; no worker/compiler/runtime changes.
- Docs: `README.md` progress paragraph updated to Begin + Integer + Boolean + If `N/140`; new spec `if-tasks`, delta to `solved-progress`.
- Reuse `src/lib/test-runner.ts` (`compareOutputs`, `runBeginTests`) unchanged; only a possible `Begin`-prefixed test-case type rename with zero behavior change.

## Capabilities

### New Capabilities

- `if-tasks`: If task catalogue, test cases, and solved tracking consistent with Begin/Integer/Boolean (trilingual text, neutral starters, pinned branch semantics incl. strict ordering, coordinate-plus-distance If20, quadrant mapping, leap rule, `% 2 == 0` parity, exact lowercase strings for If29/If30).

### Modified Capabilities

- `solved-progress`: Solved persistence, dropdown marking, and progress statistics extended from Begin + Integer + Boolean to Begin + Integer + Boolean + If (four-section selector, `N/140` denominator, same key and solved definition).

## Impact

- Code: new `src/lib/tasks-if.ts`, `src/lib/tasks-if-tests.ts`; modified `src/App.tsx`, `README.md`; modified specs `openspec/specs/solved-progress/spec.md` plus new `openspec/specs/if-tasks/spec.md`.
- APIs/dependencies/systems: none — static frontend only, no worker/compiler/runtime/`compareOutputs` behavior change, no storage-key rename, no editor/shadcn restyle.
