# Proposal

## Why

`src/App.tsx` runs Begin tests and shows per-case PASS/FAIL, but nothing persists: after reload users cannot tell which of the 40 `BEGIN_TASKS` they already solved, and there is no overall progress signal. This causes repeated work and no sense of completion.

## What Changes

- Derive "solved = latest `runTests` for that task returned non-empty results with every case `passed`"; solved sticks across source/stdin edits and never auto-clears on partial pass or compile failure.
- Persist the solved task-id set in `localStorage` under `deepcode-cpp-solved-v1` (JSON array), with guarded load/save (unknown ids filtered, corrupt data falls back to empty, storage access never throws).
- Mark solved tasks in the task `Select` dropdown with a left-side emerald affordance distinct from the Radix right-side current-selection `CheckIcon` (different slot, icon/shape, color; both visible when solved task is current).
- Show always-visible progress: solved count `N/40` plus proportional bar (`role="progressbar"` with correct `aria-valuenow/min/max`), updating immediately on solve and on reset.
- Extend `UI_TEXT` in `src/lib/tasks-begin.ts` with `solved` / count / progress `aria-label` entries for `en`/`ru`/`ro`; no hard-coded English in new UI.
- Make `Reset code` clear the solved flag for the current task; `selectTask` preserves the solved set while resetting only transient run state.

## Capabilities

### New Capabilities

- `solved-progress`: solved derivation, localStorage persistence, dropdown solved marks, and always-visible count + progress bar for the 40 Begin tasks.

### Modified Capabilities

None — no existing specs exist in `openspec/specs/`.

## Impact

- Affected code: `src/App.tsx` (state, storage helpers, `runTests` hook-in at `passed === results.length`, `resetCode`, `selectTask`, dropdown `SelectItem` block, header/task-strip progress UI), `src/lib/tasks-begin.ts` (`UI_TEXT`), optionally `README.md` (one short paragraph).
- No API/server/worker changes; `compareOutputs` tolerance, `compiler.worker.ts`, and test cases untouched.
- Storage: new `localStorage` key `deepcode-cpp-solved-v1`; no migration of existing `deepcode-cpp-task` / locale / source / stdin keys.
