# Design

## Context

The project is a policy dashboard with a React frontend and a Node backend. This change introduces the backend API contract needed to manage policies so the app can list, inspect, create, and update records without adding ad hoc client-side logic.

## Goals / Non-Goals

**Goals:**
- Define a clean REST contract for policy management
- Validate policy input fields and enum values at the API boundary
- Support basic CRUD-style operations for policy records
- Keep the contract consistent enough for the frontend and future integrations

**Non-Goals:**
- Introducing a full policy workflow engine or multi-step approval process
- Building a UI for policy management in this change
- Designing complex retention, audit, or archival processes beyond basic record lifecycle handling

## Decisions

### 1. Use a simple REST resource model
The API will model policies as a top-level resource under `/api/policies`, with a collection route for listing and creation and an item route for retrieving and updating a single record by id.

**Rationale:** This is the most direct pattern for a Node backend and aligns with the dashboard use case without adding unnecessary ceremony.

**Alternatives considered:**
- GraphQL-style query layer: stronger flexibility, but more complex for a small backend and not justified by the current requirement.
- Custom action endpoints: less discoverable and harder to maintain than a standard resource model.

### 2. Use a strict status enum and date validation
Policy status values will be limited to `active`, `expired`, and `cancelled`, and date fields will be validated to ensure they conform to a standard date representation and the date ordering rules make sense for the record.

**Rationale:** A bounded enum reduces invalid values and keeps the frontend and backend aligned on a predictable state model.

**Alternatives considered:**
- Free-form strings: easier to implement but much less robust and harder to validate.
- Partial validation only: weakens data integrity and increases downstream bugs.

### 3. Keep the API response contract predictable
The API will return policy objects with the same canonical fields regardless of whether the record is created, listed, retrieved, or updated.

**Rationale:** This makes the frontend simpler and reduces API drift across routes.

**Alternatives considered:**
- Different response shapes by endpoint: more flexible in the short term, but inconsistent and harder to use reliably.

## Risks / Trade-offs

- [Schema drift] → Use a single canonical policy model and validation layer, shared across create and update handlers.
- [Date ambiguity] → Standardize on ISO-8601 date strings and document the accepted format in the API contract.
- [Status mismatch between frontend and backend] → Define the enum once in the backend and reuse the same values in frontend validation and UI state logic.

## Migration Plan

This is a greenfield backend capability, so the migration is primarily additive:

1. Add the policy routes and validation logic.
2. Add or attach the policy data store or repository layer.
3. Expose the API contract for frontend integration.
4. Verify create, list, read, and update flows with API tests.

A rollback would simply remove the new routes and any storage schema created for this feature, since no existing policy behavior is being modified.

## Open Questions

None required at planning time. The policy fields and behavior are sufficiently specified to proceed with implementation and task breakdown.
