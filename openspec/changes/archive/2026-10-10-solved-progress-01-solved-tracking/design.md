# Design

## Context

See `proposal.md` for motivation. Current state (observed):
- `src/App.tsx:321-399` `runTests` compiles then calls `runBeginTests`, sets `testResults`, computes `passed === results.length` for the progress message but stores nothing.
- Persistence pattern: `TASK_KEY`, `LOCALE_KEY`, `SOURCE_KEY_PREFIX`, `STDIN_KEY_PREFIX` (`src/App.tsx:43-48`) with `getInitialTaskId` / `loadSource` / `useEffect` writes; `selectTask` (`184-199`) resets transient run state; `resetCode` (`201-204`) resets source/stdin only.
- Task dropdown: `Select` + `BEGIN_TASKS.map` `SelectItem` (`429-440`); selection mark is the Radix right-side `ItemIndicator` + `CheckIcon` in `src/components/ui/select.tsx:122-126` — must stay untouched.
- Locales: `UI_TEXT` in `src/lib/tasks-begin.ts:17-115` covers `en`/`ru`/`ro`; `BEGIN_TASKS.length` is 40; no test runner in repo (verify via `biome`, `tsc -b`, `vite build`).

## Goals / Non-Goals

**Goals:**
- Persist solved set across reloads with a versioned key that cannot collide with existing keys and never crashes on corrupt data.
- Derive solved exactly once per test run, sticky across edits, cleared only by explicit reset of that task.
- Keep solved mark and selection mark simultaneously visible and unambiguous; keep count + bar always visible and responsive.
- Localize all new user-facing strings.

**Non-Goals:**
- Backend/cloud sync, accounts, per-case history, streaks, timestamps UI, leaderboards.
- Changes to test tolerance (`compareOutputs`), test cases, compiler/worker, or task content.
- Migration of existing source/stdin/locale keys.

## Decisions

### 1. Storage key `deepcode-cpp-solved-v1`, JSON array of ids

Store a `Set<string>` in state, serialized as a JSON array. Versioned `-v1` suffix follows the `SOURCE_KEY_PREFIX` v2 precedent and reserves room for format changes.
- Alternative considered: object map with timestamps — rejected; no requirement needs timestamps and it complicates guarded parsing.
- Alternative considered: per-task boolean keys — rejected; one key keeps atomic load/save and matches "progress as a set" mental model.

### 2. Guarded `loadSolvedIds()` / `persistSolvedIds()` + `useEffect` mirroring existing effects

Lazy `useState(loadSolvedIds)` reads once; `useEffect` writes on `[solvedIds]` change. Loader does `try/catch` → `JSON.parse` → `Array.isArray` → filter against `BEGIN_TASKS` ids → fallback empty set. Saver wraps `JSON.stringify` + `setItem` in `try/catch` and never throws (private-mode quota errors must not break the app).
- Alternative considered: `useSyncExternalStore` / custom hook — rejected; overkill for one key and diverges from the file's existing `useState` + `useEffect` convention.

### 3. Hook solved derivation at the `setTestResults(results)` site in `runTests`

After `setTestResults(results)`, evaluate `results.length > 0 && results.every(r => r.passed)`; on true, functional `setSolvedIds(prev => new Set(prev).add(task.id))`. Partial pass / compile failure / empty case list leaves the set untouched. No `setSolvedIds` calls in source/stdin effects, so edits never unsolve. `resetCode` removes `task.id`; `selectTask` touches only transient state (`testResults`, `exitCode`, `testError`, `runningIndex`).
- Alternative considered: deriving solved from `testResults` state via effect — rejected; couples two tasks' results when switching tasks and risks false marks.

### 4. Dropdown affordance: left-slot emerald mark inside `SelectItem` children

Render (only when `solvedIds.has(t.id)`) a left emerald dot or `CircleCheck`/`Check` icon + `text-emerald-600` treatment on the id label, inside the item's content — never touching `src/components/ui/select.tsx`. Right-side indicator slot stays the sole selection signal, so both marks coexist when the current task is solved.
- Alternative considered: editing `SelectItem` to add a `solved` variant — rejected; shared component change risks affecting the locale `Select`.
- Alternative considered: suffix text like "✓" — rejected; collides visually with the selection check.

### 5. Progress UI: count `N/40` + proportional bar near existing badges

Derive `solved = solvedIds.size`, `total = BEGIN_TASKS.length`, `pct = total ? (solved/total)*100 : 0`. Place count in the header next to the `ui.standard` badge and/or the task strip (`src/App.tsx:482-487`); bar is a `div` fill with inline `width: ${pct}%`, `role="progressbar"`, `aria-valuenow={solved}`, `aria-valuemin={0}`, `aria-valuemax={total}`. Reuse `Badge` variants and `hidden sm:` responsive pattern; keep `max-h-80` dropdown scroll intact.

### 6. Locale entries in `UI_TEXT` for all three locales

Add `solved`, `solvedCount`, and progress `aria-label` keys to each of `en`/`ru`/`ro` (en `Solved` / `N solved`; ru `Решено`; ro `Rezolvate`) and wire them into the new UI. No hard-coded English.

### 7. Reset-progress button with native confirmation

Place a compact destructive/ghost button with a `Trash2` icon next to the progress indicator in the task strip (not in the shared `SelectItem` component). On click, call localized `window.confirm(ui.resetProgressConfirm)`; on cancel do nothing. On confirm, remove `SOLVED_KEY` plus every `SOURCE_KEY_PREFIX` / `STDIN_KEY_PREFIX` (and legacy source) key for all `BEGIN_TASKS`, then set `solvedIds` to empty, restore the current editor to its starter/stdin, and clear transient run state so count/bar return to zero without reload. Disable the button when `solvedIds.size === 0`.
- Alternative considered: custom shadcn `AlertDialog` — rejected; no dialog component exists in `src/components/ui/` and a native confirm keeps this change dependency-free and accessible.

## Risks / Trade-offs

- [Risk] Corrupt or foreign `localStorage` value crashes load → Mitigation: guarded parse + `Array.isArray` + id whitelist + empty fallback, covered by an explicit corrupt-storage scenario.
- [Risk] Solved mark confused with selection check → Mitigation: different slot (left vs right), icon/shape, and color; explicit both-marks-visible manual check.
- [Risk] `Set` state mutated in place breaks re-render/persist effect → Mitigation: always create a new `Set` in functional updates; persist effect depends on the set reference.
- [Risk] Header overflow on small screens → Mitigation: reuse `hidden sm:` pattern, keep count compact, verify responsive layout.
- [Risk] No unit-test runner → Mitigation: typecheck + lint + build + scripted manual walkthrough (solve → mark → count/bar → reload → reset → corrupt key).

## Migration Plan

No migration needed. New key starts empty for all users; existing keys untouched. Rollback is deleting the new state/helpers/UI and the key (stale key data is harmless — loader filters/ignores it). Deploy as a normal frontend change; no flags.

## Open Questions

None — storage format, solved predicate, reset semantics, mark distinction, and locale coverage are fixed by the step plan.
