# Design

## Context

See proposal.md (Why) for motivation. Current state (`src/App.tsx:539-542`):
`totalSolvedCount = solvedIds.size`, `solvedCount = totalSolvedCount`, `totalCount = ALL_TASKS.length` (110: 40 Begin + 30 Integer + 40 Boolean). `visibleTasks` (`src/App.tsx:196-201`) already filters by `category` derived from `task.id` prefix, and the task dropdown renders `visibleTasks` only. The count label (`ui.solvedCount(solvedCount, totalCount)`) and `role="progressbar"` (`aria-valuenow/valuemax`) consume the global values, so the bar understates section progress. Storage (`deepcode-cpp-solved-v1`), solved definition, dropdown marks, `resetCode`/`resetProgress` are out of scope for behavior change — see specs delta.

## Goals / Non-Goals

**Goals:**
- Scope displayed progress to the currently selected category with no storage migration and no new strings.
- Keep `resetProgress` global (clears entire set) while its disabled state stays global.

**Non-Goals:**
- Showing global + per-category progress simultaneously, per-section tooltips/celebrations, or any change to how `solved` is derived or persisted.
- Worker/compiler, test-runner, task-data, or deployment changes.

## Decisions

- **Derive from `visibleTasks`, not a new per-category state.** `solvedCount = visibleTasks.filter((t) => solvedIds.has(t.id)).length`, `totalCount = visibleTasks.length`, `solvedPct = totalCount > 0 ? (solvedCount / totalCount) * 100 : 0`. Rationale: `visibleTasks` is already the single source of truth for the category filter, so count/bar cannot drift from the dropdown; no extra memo/state or locale changes needed. Alternative (separate `BEGIN_SOLVED`/`INTEGER_SOLVED`/`BOOLEAN_SOLVED` counters) rejected — duplicates state and risks drift.
- **Retain `totalSolvedCount = solvedIds.size` for `resetProgress` disabled only** (`disabled={totalSolvedCount === 0}`). Rationale: reset clears the global set, so the button must stay enabled when another category holds solves even if the current category reads `0/N`. Alternative (disable on `solvedCount === 0`) rejected — would strand global solves with no visible reset path.
- **No `UI_TEXT` / locale changes.** `ui.solvedCount(n, total)` and `ui.progressLabel` already take parameters; only the arguments change. Rationale: avoids trilingual edits and keeps the `Localized progress labels` scenario passing unchanged.
- **Docs-only spec + README update.** Spec delta rewrites `Progress statistics` to per-category scope with an added `Switching category switches denominator` scenario; `README.md` progress paragraph `N/110` → per-category (`N/40` Begin, `N/30` Integer, `N/40` Boolean). Rationale: behavior contract lives in one requirement; no other requirement text changes.

## Risks / Trade-offs

- [Risk] Learners lose the global completion signal (previously `N/110`) → Mitigation: accepted per proposal; no dual display in this change.
- [Risk] `visibleTasks` derivation typo (e.g. filtering `ALL_TASKS` instead) silently restores global counts → Mitigation: acceptance checks per-category denominators (`aria-valuemax` 40/30/40) and bar fill in `bun dev`.
- [Risk] Input proposal cited stale totals (`N/70`, Begin+Integer only) while the tree now ships Boolean (`N/110`) → Mitigation: this design covers all three categories; spec examples list all three denominators.

## Migration Plan

No migration. Same storage key and id set; only displayed numerator/denominator change. Rollback: revert the `src/App.tsx` derivation lines, spec delta, and `README.md` line.

## Open Questions

None.
