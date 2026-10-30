# Spec Delta

## Purpose

The policy list capability gives the dashboard a clear, consistent view of policy records backed by the existing backend API contract.

## ADDED Requirements

### Requirement: Policy records can be displayed in a table
The system shall render the policy list using the backend policy collection contract, showing each record in a predictable table with the required fields.

#### Scenario: List policies from the API
- **WHEN** the dashboard loads the policy collection from the backend
- **THEN** the UI shall display each policy row with the policy number, holder, type, status, and expiry date

#### Scenario: Use the backend record shape
- **WHEN** the API returns a policy object
- **THEN** the UI shall use the backend-defined fields as the source of truth for rendering, including `policyNumber`, `holderName`, `type`, `status`, and `expiryDate`

### Requirement: Loading state is shown while policy data is fetched
The system shall communicate that policy data is still loading before the list is populated.

#### Scenario: Initial fetch in progress
- **WHEN** the dashboard requests policies and the response is not yet available
- **THEN** the UI shall show a loading state rather than a blank or partially rendered table

### Requirement: Empty state is shown when no policies exist
The system shall handle an empty policy result gracefully.

#### Scenario: Empty policy set
- **WHEN** the backend returns an empty list for the policy collection
- **THEN** the dashboard shall show an empty state message instead of a table with no rows
