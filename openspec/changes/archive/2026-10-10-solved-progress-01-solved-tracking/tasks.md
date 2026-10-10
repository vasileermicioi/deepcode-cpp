# Tasks

## 1. Solved persistence foundation

- [x] 1.1 Add `SOLVED_KEY = "deepcode-cpp-solved-v1"` next to `TASK_KEY` in `src/App.tsx` and verify `bunx tsc -b` passes with no behavior change.
- [x] 1.2 Implement `loadSolvedIds()` / `persistSolvedIds()` with guarded `JSON.parse`/`stringify`, `Array.isArray` check, `BEGIN_TASKS` id whitelist, and `try/catch` around storage, and verify corrupt values (`{{{`, unknown ids, missing key) fall back to empty without throwing.
- [x] 1.3 Add `useState<Set<string>>(loadSolvedIds)` plus `useEffect` persisting on change mirroring existing task/source effects, confirm no collision with `deepcode-cpp-task` / locale / source / stdin keys, and verify `bunx tsc -b` passes.

## 2. Solved derivation and lifecycle

- [x] 2.1 Hook `markSolved` at the `setTestResults(results)` site in `runTests` (`results.length > 0 && results.every(r => r.passed)` → functional `setSolvedIds` add) and verify `bunx tsc -b` passes.
- [x] 2.2 Extend `resetCode` to remove `task.id` from the solved set while leaving other ids intact, and verify by solving one task, resetting it, and confirming only that flag clears.
- [x] 2.3 Confirm `selectTask` preserves `solvedIds` while resetting only transient run state and that source/stdin edits never call `setSolvedIds`, verified by solving, switching tasks, editing code, and confirming solved flags persist.

## 3. Dropdown marks, progress UI, and locales

- [x] 3.1 Add `solved` / `solvedCount` / progress `aria-label` entries to `UI_TEXT` in `src/lib/tasks-begin.ts` for `en`/`ru`/`ro` and wire them into the new UI with no hard-coded English, verified by switching locales in `bun dev`.
- [x] 3.2 Render a left-slot emerald solved affordance inside each solved `SelectItem` in `src/App.tsx` (leaving `src/components/ui/select.tsx` untouched) and verify both solved and selection marks are simultaneously visible and distinct (slot, icon, color) when a solved task is current.
- [x] 3.3 Add always-visible `N/40` count and proportional bar (`width: %`, `role="progressbar"`, correct `aria-valuenow/min/max`) derived from `solvedIds.size / BEGIN_TASKS.length`, updating on solve and reset without reload, and verify responsive layout keeps `max-h-80` scroll and no header overflow; run `bunx biome check .` and `bunx tsc -b` clean for touched files.

## 4. Integration verification

- [x] 4.1 Run `bunx biome check .`, `bunx tsc -b`, and `bun run build` and verify all exit 0 / succeed.
- [x] 4.2 Walk the full user-visible path in `bun dev` and verify: solve `Begin1` → dropdown mark + count/bar update → reload persists → switch tasks unaffected → `Reset code` clears that task → corrupt `localStorage["deepcode-cpp-solved-v1"]` reloads to empty progress with no crash.
- [x] 4.3 Add or explicitly skip the one-paragraph `README.md` progress note and verify the handoff records the change ID `solved-progress-01-solved-tracking` with either the note or "none".

## 5. Reset progress button

- [x] 5.1 Add `resetProgress` / `resetProgressConfirm` entries to `UI_TEXT` in `src/lib/tasks-begin.ts` for `en`/`ru`/`ro` with no hard-coded English in the new UI, and verify `bunx tsc -b` passes.
- [x] 5.2 Add a reset-progress button with `Trash2` icon next to the progress indicator that calls localized `window.confirm`, and on confirm clears `SOLVED_KEY` plus all per-task source/stdin keys, empties `solvedIds`, restores the current starter, and returns count/bar to zero without reload; cancel leaves everything unchanged, and verify `bunx tsc -b` passes.
- [x] 5.3 Run `bunx biome check .`, `bunx tsc -b`, and `bun run build` and verify all exit 0 / succeed.
