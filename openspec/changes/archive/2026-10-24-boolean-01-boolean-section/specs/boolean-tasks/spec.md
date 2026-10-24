# boolean-tasks - Spec Delta

## Purpose

Gives learners the ptaskbook Boolean practice block (Boolean1–Boolean40) with trilingual text, neutral starters, predefined tests, and solved tracking consistent with Begin and Integer.

## ADDED Requirements

### Requirement: Boolean task catalogue

The system SHALL provide 40 Boolean tasks (Boolean1–Boolean40) matching ptaskbook semantics, each with trilingual text (en/ru/ro), a neutral `int main()` starter, and a default stdin.

#### Scenario: Browse Boolean tasks

- **WHEN** the user picks the Boolean section in the category selector
- **THEN** Boolean1–Boolean40 appear in the task selector with correct text in the active locale.

#### Scenario: Neutral starter

- **WHEN** the user selects a Boolean task with no saved draft
- **THEN** the editor shows a starter that reads the documented inputs with `cin`, contains no solution in comments, and prints exactly one `0`/`1` token via `cout << result;` (no `boolalpha`).

### Requirement: Boolean test cases

The system SHALL ship 5 predefined test cases per Boolean task (200 total) with expected values only `0` (false) or `1` (true), evaluated with the existing headless runner and output comparison.

#### Scenario: Reference solution passes

- **WHEN** the editor holds a correct Boolean solution and the user presses `Run tests`
- **THEN** all 5 cases report PASS.

#### Scenario: Canonical boolean form

- **WHEN** a Boolean task is solved with `cout << <boolean expression>;`
- **THEN** the output `1`/`0` matches the expected value without case or `boolalpha` handling.

#### Scenario: Pinned edge semantics

- **WHEN** Boolean29 is tested with a point on the rectangle border, or Boolean36–38 with distinct squares
- **THEN** the border point counts as inside (`1`) and same-row/column, adjacent-king, and diagonal-bishop moves count as reachable (`1`), matching the documented formulas.

### Requirement: Boolean solved tracking

The system SHALL treat a solved Boolean task the same as a solved Begin/Integer task: latest `Run tests` all-pass marks it solved, the dropdown shows the solved affordance, and the flag persists across reloads until reset.

#### Scenario: Boolean solve persists

- **WHEN** all Boolean-task tests pass via `Run tests`
- **THEN** its id joins the stored solved set and remains after reload.
