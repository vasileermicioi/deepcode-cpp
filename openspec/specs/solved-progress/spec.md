# solved-progress Specification

## Purpose

Lets learners see which of the 40 Begin tasks they have solved and track overall progress persistently across reloads.

## Requirements

### Requirement: Solved persistence

The system SHALL persist the set of solved task ids in browser `localStorage` under key `deepcode-cpp-solved-v1` as a JSON array of task ids.

#### Scenario: Solve persists across reload

- **WHEN** all tests pass for the current task via `Run tests`
- **THEN** its task id is added to the stored solved set and remains present after page reload.

#### Scenario: Corrupt storage degrades gracefully

- **WHEN** the stored value is missing, invalid JSON, or contains unknown ids
- **THEN** the system treats progress as empty (filtering unknown ids) and the app loads without errors.

#### Scenario: Reset clears solved for that task

- **WHEN** the user presses `Reset code` on a solved task
- **THEN** that task id is removed from the stored solved set.

### Requirement: Solved definition

The system SHALL consider a task solved if and only if the latest `Run tests` execution for that task returns a non-empty result list in which every case passed.

#### Scenario: Partial pass does not solve

- **WHEN** at least one test case fails or compilation fails
- **THEN** the solved set is unchanged.

#### Scenario: Editing code does not unsolve

- **WHEN** the user edits source or stdin after a task became solved
- **THEN** the task remains solved.

### Requirement: Solved dropdown marking

The system SHALL mark every solved task in the task dropdown with a solved affordance that is visually distinct from the current-selection indicator.

#### Scenario: Marks are distinguishable

- **WHEN** the user opens the task dropdown
- **THEN** solved tasks show the solved affordance (e.g. left emerald mark), the current task shows the existing right-side check, and when a task is both solved and current both marks are visible without sharing slot, icon, or color.

### Requirement: Progress statistics

The system SHALL always display the solved count versus the total task count and a proportional progress bar that update immediately on solve and on reset.

#### Scenario: Progress updates live

- **WHEN** a task becomes solved or its solved flag is cleared via reset
- **THEN** the count (e.g. `N/40`) and the bar fill update without requiring reload, and the bar exposes `role="progressbar"` with correct `aria-valuenow/min/max`.

#### Scenario: Localized progress labels

- **WHEN** the user switches locale between `en`, `ru`, and `ro`
- **THEN** the solved count label and progress `aria-label` render in the active locale with no hard-coded English strings.

### Requirement: Reset progress

The system SHALL provide a reset-progress action that, after explicit confirmation, clears the entire solved set and deletes saved solutions.

#### Scenario: Confirmed reset clears everything

- **WHEN** the user confirms the reset-progress prompt
- **THEN** all task ids are removed from the stored solved set, saved per-task source and stdin drafts are deleted, the current editor returns to its starter, and count plus bar return to zero without reload.

#### Scenario: Cancelled reset preserves state

- **WHEN** the user dismisses the reset-progress prompt without confirming
- **THEN** the solved set, saved drafts, editor content, count, and bar remain unchanged.
