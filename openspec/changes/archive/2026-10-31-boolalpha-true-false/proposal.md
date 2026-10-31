# Proposal

## Why

Boolean tasks (`Boolean1–Boolean40`) teach `bool result` but print it with plain `cout << result;`, rendering `1`/`0`. Learners see integers, not booleans — inconsistent with the `bool` type being taught and with idiomatic C++ (`std::boolalpha` → `true`/`false`).

## What Changes

- **Boolean starters**: `cout << result;` → `cout << boolalpha << result;` for all 40 entries in `src/lib/tasks-boolean.ts`. No other starter change (`bool result = false;`, `cin` inputs, `HEAD` includes stay as-is; `boolalpha` needs no extra header).
- **Boolean tests**: `expected: "1"` → `expected: "true"`, `expected: "0"` → `expected: "false"` for all 200 cases in `src/lib/tasks-boolean-tests.ts`.
- **Test runner**: no logic change — `compareOutputs` already compares `true`/`false` as exact string tokens. **BREAKING**: legacy `1`/`0` output no longer passes Boolean tasks.
- **If tasks — no change (audited)**: `src/lib/tasks-if.ts` and `tasks-if-tests.ts` contain zero `bool`-typed outputs; all outputs are `int`/`double`/coordinate pairs/description strings. Verified via `rg "bool |boolalpha"` (no hits) and `cout <<` target audit.

## Capabilities

### New Capabilities

- None (behavior refinement, not a new block).

### Modified Capabilities

- `boolean-tasks`: catalogue starter canonical form becomes `cout << boolalpha << result;` emitting `true`/`false`; test-case canonical form becomes `true`/`false`; edge semantics unchanged, only rendering changes.

## Impact

- Code: `src/lib/tasks-boolean.ts` (40 one-line starter edits), `src/lib/tasks-boolean-tests.ts` (200 expected-value edits, mechanical); `src/lib/tasks-if.ts`, `tasks-if-tests.ts`, `test-runner.ts` untouched.
- Migration: users with saved drafts emitting `1`/`0` or stored `solved` flags from the old canonical form need one re-run; latest all-pass re-marks solved (same key/definition, `solved-progress` spec unchanged). A tolerant comparator accepting legacy `1`/`0` is explicitly out of scope (separate proposal if desired).
- Systems: none — static task/test data + spec wording only, no worker/compiler/runtime/storage-key change. README needs no edit (no `1`/`0` canonical-form mention; `N/140` denominators unchanged).
- Out of scope: `Begin`/`Integer` blocks, `EXAMPLES`, editor UI restyle, `noboolalpha` handling, case-insensitive `True`/`FALSE` acceptance (canonical is lowercase per C++).
