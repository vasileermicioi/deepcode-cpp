# Spec Delta

## MODIFIED Requirements

### Requirement: Progress statistics

The system SHALL display the solved count versus the total task count for the currently selected category (e.g. `N/40` for Begin, `N/30` for Integer, `N/40` for Boolean) and a proportional progress bar that update immediately on solve and on reset.

#### Scenario: Progress updates live

- **WHEN** a task becomes solved or its solved flag is cleared via reset
- **THEN** the count (e.g. `N/30` with Integer selected) and the bar fill update without requiring reload, and the bar exposes `role="progressbar"` with correct `aria-valuenow/min/max`.

#### Scenario: Switching category switches denominator

- **WHEN** the user picks a section in the category selector
- **THEN** the count reads `N/40` for Begin, `N/30` for Integer, or `N/40` for Boolean, and the bar fill reflects solved-in-category over that category total.

#### Scenario: Localized progress labels

- **WHEN** the user switches locale between `en`, `ru`, and `ro`
- **THEN** the solved count label and progress `aria-label` render in the active locale with no hard-coded English strings.
