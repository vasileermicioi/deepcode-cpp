# Spec Delta: integer-tasks

## Purpose

Gives learners the ptaskbook Integer practice block (Integer1–Integer30) with trilingual text, neutral starters, predefined tests, and solved/progress tracking consistent with Begin.

## ADDED Requirements

### Requirement: Integer task catalogue

The system SHALL provide 30 Integer tasks (Integer1–Integer30) matching ptaskbook semantics, each with trilingual text (en/ru/ro), a neutral `int main()` starter, and a default stdin.

#### Scenario: Browse Integer tasks

- **WHEN** the user picks the Integer section in the category selector
- **THEN** Integer1–Integer30 appear in the task selector with correct text in the active locale.

#### Scenario: Neutral starter

- **WHEN** the user selects an Integer task with no saved draft
- **THEN** the editor shows an `int`-based starter that reads the documented inputs with `cin`, contains no solution in comments, and prints results space-separated on one line.

### Requirement: Integer test cases

The system SHALL ship 5 predefined test cases per Integer task and evaluate them with the existing headless runner and output comparison.

#### Scenario: Reference solution passes

- **WHEN** the editor holds a correct Integer solution and the user presses `Run tests`
- **THEN** all 5 cases report PASS.

#### Scenario: Canonical integer form

- **WHEN** a task output has a leading-zero reversal (e.g. Integer8 with input `10`)
- **THEN** the expected value is the canonical integer form (`1`), matching integer-arithmetic output.

### Requirement: Integer solved tracking

The system SHALL treat a solved Integer task the same as a solved Begin task: latest `Run tests` all-pass marks it solved, the dropdown shows the solved affordance, and the flag persists across reloads until reset.

#### Scenario: Integer solve persists

- **WHEN** all Integer-task tests pass via `Run tests`
- **THEN** its id joins the stored solved set and remains after reload.
