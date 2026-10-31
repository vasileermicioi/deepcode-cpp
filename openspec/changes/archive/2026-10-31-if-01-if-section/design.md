# Design

## Context

See proposal.md (Why) for motivation. Current state: `src/lib/tasks-begin.ts` (`BeginTask` shape, `UI_TEXT`, `TASK_LOCALES`) + `src/lib/tasks-begin-tests.ts`, `src/lib/tasks-integer.ts` (`INTEGER_TASKS` reusing `BeginTask`) + `src/lib/tasks-integer-tests.ts`, `src/lib/tasks-boolean.ts` (`BOOLEAN_TASKS`) + `src/lib/tasks-boolean-tests.ts`, unified registry in `src/App.tsx` (`ALL_TASKS`, `ALL_TESTS`, `getInitialTaskId`, `selectTask`, `loadSource`, per-task persistence, `runTests` via `runBeginTests`, `loadSolvedIds` whitelist, Begin/Integer/Boolean `Select` category, progress `N/110` with `role="progressbar"`), `src/lib/test-runner.ts` (`compareOutputs` numeric + string paths, `runBeginTests`, `runWasmOnce`), `README.md` progress paragraph (`N/110`), specs `integer-tasks`, `boolean-tasks`, `solved-progress`. This change mirrors the Integer/Boolean slices exactly. See `specs/if-tasks/spec.md` and `specs/solved-progress/spec.md` for the behavior contract.

## Goals / Non-Goals

**Goals:**

- Add the full If1–If30 block as one mergeable slice: catalogue data, 150 test cases, UI wiring, docs, specs.
- Keep every existing behavior identical (Begin/Integer/Boolean tasks, runner, storage key, solved definition).

**Non-Goals:**

- No Case or beyond-If curriculum; no worker/compiler/runtime/`compareOutputs` changes; no editor or shadcn restyle; no `select.tsx` edits; no server/cloud sync; no storage-key rename.

## Decisions

- **Mirror the Integer/Boolean file pattern exactly.** New `src/lib/tasks-if.ts` exports `IF_TASKS: BeginTask[]` via `import type { BeginTask }`, same `HEAD` (`#include <iostream>` + `using namespace std;`), same `{id, number, text:{en,ru,ro}, stdin, starter}` entries. New `src/lib/tasks-if-tests.ts` exports `IF_TESTS: Record<string, BeginTestCase[]>`. Alternative (new task type / new runner): rejected — reuse keeps the registry, persistence, and `stripSolutionHints`/`modernizeSource` paths untouched.
- **Starter input/output types follow the Scope table.** `int` for If1–5/If10–11/If18–19/If21/If23/If25/If28–30, `double` for If6–9/If12–17/If20/If22/If24/If26–27; numeric outputs space-separated on one line (`<< " " <<`); `// TODO: write your solution here` + `// <-- your code here`, no `std::` prefixes, no fast-io guards, no `boolalpha`. `#include <cmath>` only for If24 (`sin`) and If27 (`floor`); `#include <string>` for If29/If30 with `string desc = "";` + `cout << desc;`. Reference formulas implemented verbatim (see step plan Scope table If1–If30), including strict-ordering `A < B && B < C` for If16 (equals = not ordered → negate), or-ordering for If17, `a < b ? 1 : 2` for If7, `min`-based If13/If15 (`a+b+c-min-max`, `a+b+c-min`), single-occurrence pick for If23 (`x1 == x2 ? x3 : ...`), leap rule `(y % 4 == 0 && y % 100 != 0) || y % 400 == 0` for If28, `% 2 == 0` parity (never `== 1`) for If29/If30, and exact lowercase strings for If29 (5 variants) / If30 (6 variants).
- **Trilingual text tone.** en verbatim from ptaskbook en (truth); ru checked against ru page (Abramyan phrasing); ro in Begin ro tone (`Se dă…`, `Aflați…`, `Verificați…`, `Folosiți…`). Group label `ifGroup: "If"` untranslated in all three locales, like `beginGroup`/`integerGroup`/`booleanGroup`. Alternative (translate group names): rejected — consistency with existing untranslated labels.
- **UI extension is additive in `src/App.tsx` only.** `ALL_TASKS = [...BEGIN_TASKS, ...INTEGER_TASKS, ...BOOLEAN_TASKS, ...IF_TASKS]`, `ALL_TESTS = {...BEGIN_TESTS, ...INTEGER_TESTS, ...BOOLEAN_TESTS, ...IF_TESTS}`; category derivation `task.id.startsWith("If") ? "if" : …`, `visibleTasks` per section, fourth `Select` option with existing primitives; `selectTask` on switch goes to that section's first task; `loadSolvedIds` whitelist expands to combined ids (disjoint `If1..If30` ids, so no key migration, `SOLVED_KEY` unchanged); denominator 110 → 140; `resetCode`/`resetProgress` iterate all four lists. Disjoint ids mean no draft/storage migration is needed.
- **Runner reuse, type-name-only touch.** `compareOutputs`/`runBeginTests` evaluate numeric tasks via the numeric path (`numbersClose` tolerance) and If29/If30 via the existing string-token path (case-sensitive, whitespace-tokenized); generalize only the `Begin`-prefixed test-case type name if it confuses, zero behavior change, no threshold/timeout tuning.

## Risks / Trade-offs

- [Risk] ptaskbook en/ru wording drift (esp. If7 equal case, If16/If17 strict vs non-strict ordering, If20 output form) → Mitigation: formulas pinned verbatim in the step plan Scope table; ru entries cross-checked against ru page, ro follows Begin tone.
- [Risk] String-output tasks If29/If30 (first multi-word non-numeric outputs): case/whitespace drift → Mitigation: exact lowercase English strings pinned, expectations cover all 5 (If29) / all 6 (If30) variants; `compareOutputs` string path needs no change.
- [Risk] `double` inputs (If6–9, If12–17, If20, If22, If24, If26–27) tripping numeric comparison → Mitigation: outputs stay numeric with existing `numbersClose` tolerance; no threshold change; hand-verify each of the 150 cases against its formula before wiring.
- [Risk] Whitelist filtering drops progress if ids mistyped → Mitigation: ids are `If1..If30`, disjoint from Begin/Integer/Boolean; `loadSolvedIds` filters unknowns and falls back to empty on corrupt JSON without crashing.

## Migration Plan

Additive only: two new files, three edited files (`App.tsx`, `README.md`, `solved-progress` spec) plus one new spec. No data migration (`SOLVED_KEY`, source/stdin key prefixes unchanged). Rollback: revert the change's files; stored solved set keeps working because unknown-id filtering ignores `If*` ids on old code.

## Open Questions

None. Formulas, canonical forms, and tie/border semantics are pinned in the spec deltas; any follow-up (e.g. type-name generalization) is implementation detail with zero behavior change.
