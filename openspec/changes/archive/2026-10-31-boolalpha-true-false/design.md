# Design

## Context

See proposal.md (Why): Boolean starters declare `bool result` but render `1`/`0`. Current state verified read-only: `src/lib/tasks-boolean.ts` has 40× `cout << result;` and zero `boolalpha` hits; `src/lib/tasks-boolean-tests.ts` has 200× `expected: "0"/"1"`; `src/lib/test-runner.ts compareOutputs` tokenizes on whitespace and falls through to exact string compare for non-numeric tokens, so `true`/`false` already passes without code change; `src/lib/tasks-if.ts` has no `bool` output (audit: `rg "bool |boolalpha"` empty, `cout <<` targets are ints/coords/strings). Constraint: static data-only change, no runner/worker/storage-key edits.

## Goals / Non-Goals

**Goals:**
- Flip Boolean canonical I/O to `true`/`false` in starters, tests, and spec wording in one atomic change.
- Keep the flip verifiable by counts (40 starter hits, 200 test values, zero legacy tokens) plus a positive/negative runner check.

**Non-Goals:**
- No tolerant/dual acceptance of `1`/`0` during migration (explicitly out of scope; separate `compareOutputs` proposal if wanted).
- No `If`/`Begin`/`Integer` edits, no UI/restyle, no `noboolalpha` or case-insensitive handling.

## Decisions

- **Strict flip, no runner change over tolerant comparator.** `compareOutputs` already handles `true`/`false` exactly; adding `1`↔`true` aliasing would complicate the shared numeric/string token path used by all blocks and blur the canonical form the spec teaches. Alternative (accept both during migration) rejected: it would let the old form keep passing and defeat the pedagogical goal.
- **Mechanical data edit over generator/script.** 40 + 200 edits are uniform one-token swaps; a script adds review overhead and risks touching `If`/other blocks. Alternative (codemod) rejected for this size; verification is by `rg` counts instead.
- **Delta spec touches `boolean-tasks` only; `if-tasks` untouched.** The If audit found no boolean output, so no spec requirement changes there — recording the audit in proposal/design is sufficient. Alternative (touching `if-tasks` spec for symmetry) rejected: it would imply a behavior change that does not exist.

## Risks / Trade-offs

- [Risk] Saved user drafts emitting `1`/`0` start failing after the flip → Mitigation: starters now demonstrate `boolalpha`; one re-run with the canonical form passes. Documented as **BREAKING** in proposal.
- [Risk] Stored `solved` flags earned under `1`/`0` look stale/confusing → Mitigation: no storage-key change; latest all-pass re-marks solved under the same `solved-progress` semantics. No migration script.
- [Risk] Mechanical edit misses a token or touches the wrong block → Mitigation: count-based verification gates (40/200/0 `rg` checks) plus negative check that legacy `1`-emitting reference fails.
- [Trade-off] Strict flip causes short-term failures for old drafts, in exchange for a single unambiguous canonical form and zero runner complexity.

## Migration Plan

1. Land starter + test + spec edits together (no phased rollout; static data).
2. No deploy steps, no rollback beyond revert (no schema/storage change).
3. Post-land: spot-check `Run tests` on one Boolean task (pass with `boolalpha`, fail with legacy) and one If task (unchanged pass).

## Open Questions

None. The only deferred item — tolerant `1`/`0` acceptance — is an explicit non-goal for this change.
