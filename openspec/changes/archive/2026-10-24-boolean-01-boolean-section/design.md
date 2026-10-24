# Design

## Context

See proposal.md (Why) for motivation. Current state: `src/lib/tasks-begin.ts` (`BeginTask` shape, `UI_TEXT`, `TASK_LOCALES`) + `src/lib/tasks-begin-tests.ts`, `src/lib/tasks-integer.ts` (`INTEGER_TASKS` reusing `BeginTask`) + `src/lib/tasks-integer-tests.ts`, unified registry in `src/App.tsx` (`ALL_TASKS`, `ALL_TESTS`, `getInitialTaskId`, `selectTask`, `loadSource`, per-task persistence, `runTests` via `runBeginTests`, `loadSolvedIds` whitelist, Begin/Integer `Select` category, progress `N/70` with `role="progressbar"`), `src/lib/test-runner.ts` (`compareOutputs` numeric path, `runBeginTests`, `runWasmOnce`), `README.md` progress paragraph (`N/70`), specs `integer-tasks` and `solved-progress`. This change mirrors the Integer slice exactly. See `specs/boolean-tasks/spec.md` and `specs/solved-progress/spec.md` for the behavior contract.

## Goals / Non-Goals

**Goals:**

- Add the full Boolean1–Boolean40 block as one mergeable slice: catalogue data, 200 test cases, UI wiring, docs, specs.
- Keep every existing behavior identical (Begin/Integer tasks, runner, storage key, solved definition).

**Non-Goals:**

- No If/Case sections or beyond-Boolean curriculum; no worker/compiler/runtime/`compareOutputs` changes; no editor or shadcn restyle; no `select.tsx` edits; no server/cloud sync; no storage-key rename.

## Decisions

- **Mirror the Integer file pattern exactly.** New `src/lib/tasks-boolean.ts` exports `BOOLEAN_TASKS: BeginTask[]` via `import type { BeginTask }`, same `HEAD` (`#include <iostream>` + `using namespace std;`), same `{id, number, text:{en,ru,ro}, stdin, starter}` entries. New `src/lib/tasks-boolean-tests.ts` exports `BOOLEAN_TESTS: Record<string, BeginTestCase[]>`. Alternative (new task type / new runner): rejected — reuse keeps the registry, persistence, and `stripSolutionHints`/`modernizeSource` paths untouched.
- **Canonical `1`/`0` output form.** Starters print `cout << result;` where `result` is `bool`; all 200 expected values are `"0"`/`"1"`. Rationale: `cout << bool` prints `1`/`0` by default and `compareOutputs` takes the numeric path (`numbersClose`), so float-format drift and `True/true/TRUE` case risk disappear. Alternative (accept `true`/`false` text): rejected — string comparison would be case-sensitive and `boolalpha` would leak into starters.
- **Starter input types follow the Scope table.** Boolean1–Boolean23 `int`; Boolean24 `double A, B, C`; Boolean25–Boolean28 `double x, y`; Boolean29 `double x, y, x1, y1, x2, y2`; Boolean30–Boolean40 `int`. Single-output `cout << result;`, `// TODO: write your solution here` + `// <-- your code here`, no `std::` prefixes, no fast-io guards, no `boolalpha`. `#include <cmath>` only for Boolean32 per the step plan. Reference formulas implemented verbatim (see step plan §Scope table, items 1–40), including parity as `x % 2 != 0` (C++ remainder keeps sign — `x % 2 == 1` fails negatives), inclusive-border Boolean29 (`x1 <= x && x <= x2 && y2 <= y && y <= y1` with one on-border `true` case), and chess tasks tested only on distinct squares (rook `||`, king `max(|dx|,|dy|)==1`, bishop `abs(dx)==abs(dy)`, queen or, knight `(1,2)`/`(2,1)`).
- **Trilingual text tone.** en verbatim from ptaskbook en (truth); ru checked against ru page (Abramyan phrasing); ro in Begin ro tone (`Se dă…`, `Aflați…`, `Verificați propoziția: "…"`, `Folosiți…`). Group label `booleanGroup: "Boolean"` untranslated in all three locales, like `beginGroup`/`integerGroup`. Alternative (translate group names): rejected — consistency with existing untranslated labels.
- **UI extension is additive in `src/App.tsx` only.** `ALL_TASKS = [...BEGIN_TASKS, ...INTEGER_TASKS, ...BOOLEAN_TASKS]`, `ALL_TESTS = {...BEGIN_TESTS, ...INTEGER_TESTS, ...BOOLEAN_TESTS}`; category derivation `task.id.startsWith("Boolean") ? "boolean" : …`, `visibleTasks` per section, third `Select` option with existing primitives; `selectTask` on switch goes to that section's first task; `loadSolvedIds` whitelist expands to combined ids (disjoint `Boolean1..40` ids, so no key migration, `SOLVED_KEY` unchanged); denominator 70 → 110; `resetCode`/`resetProgress` iterate all three lists. Disjoint ids mean no draft/storage migration is needed.
- **Runner reuse, type-name-only touch.** `compareOutputs`/`runBeginTests` evaluate `0`/`1` unchanged; generalize only the `Begin`-prefixed test-case type name if it confuses, zero behavior change, no threshold/timeout tuning.

## Risks / Trade-offs

- [Risk] ptaskbook en/ru wording drift or translator paraphrase → Mitigation: formulas are pinned verbatim in the step plan Scope table; ru entries cross-checked against ru page, ro follows Begin tone.
- [Risk] Negative-parity and float-format edge failures (`% 2 == 1`, `boolalpha`) → Mitigation: `!= 0` convention, `cout << result` single token, `1`/`0`-only expectations; hand-verify each of the 200 cases against its formula before wiring.
- [Risk] Border/chess semantics ambiguity (Boolean29 inclusive vs exclusive, same-square rook/king/bishop) → Mitigation: inclusive border pinned with an on-border `true` case; chess tests use distinct squares only; formulas documented in the spec.
- [Risk] `double` inputs (Boolean24–29) tripping numeric comparison → Mitigation: outputs are still `0`/`1` tokens, so the numeric path is exact; no tolerance change needed.
- [Risk] Whitelist filtering drops progress if ids mistyped → Mitigation: ids are `Boolean1..40`, disjoint from Begin/Integer; `loadSolvedIds` filters unknowns and falls back to empty on corrupt JSON without crashing.

## Migration Plan

Additive only: two new files, three edited files (`App.tsx`, `README.md`, `solved-progress` spec) plus one new spec. No data migration (`SOLVED_KEY`, source/stdin key prefixes unchanged). Rollback: revert the change's files; stored solved set keeps working because unknown-id filtering ignores `Boolean*` ids on old code.

## Open Questions

None. Formulas, canonical form, and border/chess semantics are pinned in the spec deltas; any follow-up (e.g. type-name generalization) is implementation detail with zero behavior change.
