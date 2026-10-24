# Proposal

## Why

Learners finish the Begin (40) and Integer (30) blocks and have no follow-on material; the app progress stalls at `N/70`. Adding the ptaskbook Boolean block (Boolean1–Boolean40) closes the curriculum gap the same way Integer did, with one independently mergeable slice.

## What Changes

- New catalogue data `src/lib/tasks-boolean.ts` exporting `BOOLEAN_TASKS` (40 entries `Boolean1..Boolean40`, `BeginTask` shape, trilingual en/ru/ro, neutral `int main()` starter, representative default stdin).
- New test data `src/lib/tasks-boolean-tests.ts` exporting `BOOLEAN_TESTS` with exactly 5 deterministic `{stdin, expected}` cases per task (200 total) in canonical `1`/`0` form.
- UI wiring in `src/App.tsx` only: three-section registry (`ALL_TASKS` / `ALL_TESTS`), `Boolean` category option, `booleanGroup: "Boolean"` in `UI_TEXT` en/ru/ro, combined `loadSolvedIds` whitelist, denominator `N/70` → `N/110`, reset paths extended; no worker/compiler/runtime changes.
- Docs: `README.md` progress paragraph updated to Begin + Integer + Boolean `N/110`; new spec `boolean-tasks`, delta to `solved-progress`.
- Reuse `src/lib/test-runner.ts` (`compareOutputs`, `runBeginTests`) unchanged; only a possible `Begin`-prefixed test-case type rename with zero behavior change.

## Capabilities

### New Capabilities

- `boolean-tasks`: Boolean task catalogue, test cases, and solved tracking consistent with Begin/Integer (trilingual text, neutral starters, `1`/`0` canonical form, pinned edge semantics).

### Modified Capabilities

- `solved-progress`: Solved persistence, dropdown marking, and progress statistics extended from Begin + Integer to Begin + Integer + Boolean (three-section selector, `N/110` denominator, same key and solved definition).

## Impact

- Code: new `src/lib/tasks-boolean.ts`, `src/lib/tasks-boolean-tests.ts`; modified `src/App.tsx`, `README.md`; modified specs `openspec/specs/solved-progress/spec.md` plus new `openspec/specs/boolean-tasks/spec.md`.
- APIs/dependencies/systems: none — static frontend only, no worker/compiler/runtime/`compareOutputs` behavior change, no storage-key rename, no editor/shadcn restyle.
