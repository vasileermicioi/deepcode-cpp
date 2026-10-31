# Tasks

## 1. Boolean starters — `true`/`false` canonical output

- [x] 1.1 Update all 40 starters in `src/lib/tasks-boolean.ts` from `cout << result;` to `cout << boolalpha << result;` and verify with `rg -c "cout << boolalpha << result;" src/lib/tasks-boolean.ts` returning 40 and `rg -c "cout << result;" src/lib/tasks-boolean.ts` returning 0.
- [x] 1.2 Confirm no other starter content changed (inputs, `bool result = false;`, `HEAD` includes, trilingual text intact) and verify with `git diff --stat` showing only `src/lib/tasks-boolean.ts` plus the test file, and `git diff src/lib/tasks-boolean.ts | rg "^-" | rg -v "cout << result;"` returning no lines.

## 2. Boolean test expectations — `true`/`false` canonical form

- [x] 2.1 Update all 200 cases in `src/lib/tasks-boolean-tests.ts` (`expected: "1"` → `expected: "true"`, `expected: "0"` → `expected: "false"`) and verify with `rg -c 'expected: "(true|false)"' src/lib/tasks-boolean-tests.ts` returning 200 and `rg 'expected: "[01]"' src/lib/tasks-boolean-tests.ts` returning no hits.
- [x] 2.2 Confirm edge semantics preserved (stdin/formulas untouched; Boolean29 border still `true`, Boolean36–38 reachability still `true`) and verify with `git diff src/lib/tasks-boolean-tests.ts | rg "^[+-].*stdin"` returning no lines and spot-checking the Boolean29/36–38 diff hunks show only expected-value swaps.

## 3. Verification and no-regression

- [x] 3.1 Run static checks and verify `bun run build` (tsc + vite) succeeds and `bunx biome check src/lib/tasks-boolean.ts src/lib/tasks-boolean-tests.ts` reports no new issues.
- [x] 3.2 Confirm `If` and runner untouched (no `bool` output to migrate, no comparator change) and verify with `git diff --name-only` listing only the two Boolean files and `rg -n "bool |boolalpha" src/lib/tasks-if.ts` still returning no hits.
- [x] 3.3 Confirm canonical flip end-to-end (positive: `cout << boolalpha << (A > 0);` passes all 5 cases per Boolean task; negative: legacy `cout << (A > 0);` fails) and verify by running `Run tests` on one Boolean task each way plus one If task (e.g. If7/If21/If29) passing unchanged.
