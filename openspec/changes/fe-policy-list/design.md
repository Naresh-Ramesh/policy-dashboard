# Design

## Context

The backend contract is defined by the policy API change and the current policy collection response shape. The list endpoint returns policy records with values such as `holderName`, `policyNumber`, `type`, `status`, and `expiryDate`, and it may legally return an empty array when no policies exist. The frontend requires a table-oriented dashboard surface that is easy to scan, even when data is still loading or absent.

## Goals / Non-Goals

**Goals:**
- Fetch the policy collection from the backend using the contract already defined for policy records
- Render a table with columns for policy number, holder, type, status, and expiry date
- Provide explicit loading and empty states for the dashboard experience

**Non-Goals:**
- Creating or editing policy records from this list view
- Adding filtering, sorting, or pagination beyond the basic list view
- Changing the API contract itself; this design assumes the backend contract remains the source of truth

## Decisions

### Policy table uses the backend data contract directly
The frontend should render `policyNumber` and `holderName` as the human-readable values in the table, while keeping `type`, `status`, and `expiryDate` mapped to the exact API field names. This preserves compatibility with the backend record structure and avoids translating business logic into the client.

### Loading and empty states are explicit UI states
The dashboard should treat the initial fetch and the no-records case as first-class states instead of leaving the table blank. A spinner or skeleton row communicates the transition, while a clear empty-state message tells users the list is intentionally empty rather than broken.

### Column mapping is user-facing and concise
The UI should display:
- Policy Number → `policyNumber`
- Holder → `holderName`
- Type → `type`
- Status → `status`
- Expiry Date → `expiryDate`

The date should be formatted to a readable display value while preserving the underlying API data contract.

## Risks / Trade-offs

- [API contract drift] → Keep the frontend mapped to the backend contract and validate against the policy API spec before integration.
- [Ambiguous empty state] → Use a clear message and neutral table state that distinguishes “no records” from “loading.”
- [Date formatting inconsistency] → Centralize date formatting so all list rows use the same display convention.

## Migration Plan

1. Confirm the policy API response shape matches the backend contract.
2. Implement the list view data fetch against the policy list endpoint.
3. Add loading and empty states before finalizing the table rendering.
4. Verify the UI behaves correctly with both populated and empty policy collections.

## Open Questions

- None at the planning stage; the contract and user-visible requirements are sufficiently defined for implementation.
