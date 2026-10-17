# Design

## Context

See proposal.md (Why) for motivation. Current state: 40 Begin tasks in `src/lib/tasks-begin.ts` (`BeginTask` shape, `UI_TEXT`, `TASK_LOCALES`) + `src/lib/tasks-begin-tests.ts` (`BEGIN_TESTS`, `BeginTestCase`, 5 cases/task); `src/App.tsx` wires a Begin-only registry (lookup, `getInitialTaskId`, `selectTask`, `loadSource`, per-task source/stdin persistence, `runTests` via `runBeginTests`, solved set under `deepcode-cpp-solved-v1`, `N/40` progress); `src/lib/test-runner.ts` (`compareOutputs` token tolerance, `runBeginTests`, `runWasmOnce`) is section-agnostic. `src/components/ui/select.tsx` already exports `SelectGroup`/`SelectLabel`/`SelectSeparator` (no edit needed). Specs: see `specs/integer-tasks/spec.md` and `specs/solved-progress/spec.md`.

## Goals / Non-Goals

**Goals:**
- Mirror the Begin data/test/UI pattern for Integer with minimal diff and no behavior change for existing Begin users (stored progress preserved).
- Keep all Integer content deterministic and hand-verifiable (formulas + expected values fixed before UI wiring).

**Non-Goals:**
- No worker/compiler/runtime/toolchain changes; no `compareOutputs` threshold or timeout tuning; no new sections beyond Integer; no editor or design-system restyle; no server/cloud sync.

## Decisions

1. **New modules mirror Begin shape (`tasks-integer.ts`, `tasks-integer-tests.ts`).**
   Reuse the `BeginTask` (`{id, number, text:{en,ru,ro}, stdin, starter}`) and `BeginTestCase` (`{stdin, expected}`) shapes verbatim; introduce a shared alias (e.g. `Task`/`TestCase`) only if it keeps the diff small, otherwise import the Begin types. Rationale: smallest review surface, consistent conventions (`int`-only starters, `// TODO: write your solution here` + `// <-- your code here`, single-line `cout`, default stdin matching starter reads). Alternative (generic task framework with section metadata) rejected as over-engineering for one section.
2. **Unified in-`App.tsx` registry (`ALL_TASKS = BEGIN_TASKS + INTEGER_TASKS`, combined tests map).**
   Route `getInitialTaskId`, task lookup, `selectTask`, `loadSource`, source/stdin persistence, and `runTests` case lookup through it. Rationale: single code path for solve/persist/reset; Integer ids (`Integer1..30`) are disjoint so per-task storage keys need no migration. Alternative (parallel Integer state) rejected — duplicates solved/progress logic.
3. **Separate category selector filtering the task dropdown.**
   A dedicated category `Select` (Begin / Integer, labels from `UI_TEXT`) sits before the task `Select`; the active section derives from the current task id, and switching sections selects that section's first task through the existing `selectTask`. The task dropdown lists only the active section's items with the unchanged per-item solved mark. Rationale: scales beyond two sections, keeps the task list short, zero changes to `select.tsx`, a11y/indicator behavior preserved. Alternative (single grouped dropdown) was implemented first and replaced per review: a separate selector makes the section switch explicit.
4. **Reuse `test-runner.ts` unchanged.**
   `compareOutputs` exact-integer matching already holds (tokenizer + numeric closeness; canonical form e.g. `1` not `01`); `runBeginTests` iterates any case list. Generalize only the `Begin`-prefixed type/function names if confusing, keeping behavior identical. Rationale: no regression risk for Begin. Alternative (Integer-specific runner) rejected.
5. **Storage evolution without migration.**
   Keep `SOLVED_KEY = "deepcode-cpp-solved-v1"`, `SOURCE_KEY_PREFIX`/`STDIN_KEY_PREFIX`; expand `loadSolvedIds` whitelist to combined ids; `resetCode` drops current id regardless of section; `resetProgress` iterates both lists. Rationale: existing Begin progress survives; corrupt/unknown-id fallback unchanged.
6. **Content verification order: formulas first, UI last.**
   Hand-compute all 150 expected values from the step-plan formulas (esp. digit permutations 13–16 and weekday arithmetic 24–28) before wiring the UI, then `tsc` after data, `biome`+`tsc` after UI, `build` + manual 5/5 walk per task.

## Risks / Trade-offs

- [Weekday arithmetic (Integer24–28) off-by-one] → Mitigation: verify each formula against ptaskbook en source and spot-check boundary inputs (`K=1,7,8,365`) before writing tests.
- [Digit-permutation expectations wrong (13–16, esp. trailing-zero canonical form)] → Mitigation: hand-compute reversal table in tasks step; `compareOutputs` expects canonical integers (`100→1`, `120→21`).
- [Dropdown grouping breaks solved/current mark distinction] → Mitigation: keep existing item markup, only wrap in groups; visual check for both-marks-visible state.
- [Trilingual drift (ro new, ru reference)] → Mitigation: follow `tasks-begin.ts` ro tone; en is source of truth from ptaskbook.
- [Stale per-task drafts collide] → Mitigation: ids disjoint; no key migration; `stripSolutionHints`/`modernizeSource` paths untouched.

## Migration Plan

No migration. Deploy is a static frontend change: same `localStorage` key, Begin ids valid as before, Integer ids additive. Rollback: revert re-exposes 40 tasks; any Integer solved ids in storage are filtered by the old whitelist (Begin-only) — harmless. `resetProgress` confirm/cancel behavior unchanged.

## Open Questions

- None. Section-label localization (whether Begin/Integer group headers need en/ru/ro entries in `UI_TEXT`) is decided at implementation time: reuse existing entries, add only if a header needs localizing — no spec or task-breakdown impact.
