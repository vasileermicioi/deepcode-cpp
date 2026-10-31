# if-tasks Specification

## Purpose

Gives learners the ptaskbook If practice block (If1–If30) with trilingual text, neutral starters, predefined tests, and solved tracking consistent with Begin, Integer, and Boolean.

## Requirements

### Requirement: If task catalogue

The system SHALL provide 30 If tasks (If1–If30) matching ptaskbook semantics, each with trilingual text (en/ru/ro), a neutral `int main()` starter, and a default stdin.

#### Scenario: Browse If tasks

- **WHEN** the user picks the If section in the category selector
- **THEN** If1–If30 appear in the task selector with correct text in the active locale.

#### Scenario: Neutral starter

- **WHEN** the user selects an If task with no saved draft
- **THEN** the editor shows a starter that reads the documented inputs with `cin`, contains no solution in comments, prints numeric results space-separated on one line (or exactly one lowercase description string for If29/If30), and includes `<cmath>` only for If24/If27 and `<string>` for If29/If30.

### Requirement: If test cases

The system SHALL ship 5 predefined test cases per If task (150 total) and evaluate them with the existing headless runner and output comparison.

#### Scenario: Reference solution passes

- **WHEN** the editor holds a correct If solution and the user presses `Run tests`
- **THEN** all 5 cases report PASS.

#### Scenario: String-output canonical form

- **WHEN** If29/If30 solutions print the description string (e.g. `negative even number`, `two-digit odd number`)
- **THEN** the output matches the expected lowercase English string word-for-word regardless of UI locale, via the existing string-token comparison path.

#### Scenario: Pinned branch semantics

- **WHEN** If7 is tested with distinct values, If16/If17 with ordered vs unordered (incl. equals as unordered), If20 with distinct distances, If22 with one point per quadrant, If28 with leap/ordinary/centenary/400-year cases, or If29/If30 with every description variant
- **THEN** the expectations match the Scope-table formulas (If7 `a < b ? 1 : 2`, strict `<`/`>` ordering, coordinate-plus-distance If20, quadrant mapping 1–4, leap rule `(y % 4 == 0 && y % 100 != 0) || y % 400 == 0`, `% 2 == 0` parity).

### Requirement: If solved tracking

The system SHALL treat a solved If task the same as a solved Begin/Integer/Boolean task: latest `Run tests` all-pass marks it solved, the dropdown shows the solved affordance, and the flag persists across reloads until reset.

#### Scenario: If solve persists

- **WHEN** all If-task tests pass via `Run tests`
- **THEN** its id joins the stored solved set and remains after reload.
