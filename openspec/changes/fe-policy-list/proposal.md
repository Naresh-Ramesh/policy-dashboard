# Proposal

## Why

The dashboard needs a consistent, scannable view of policy records so users can quickly identify each policy by number, holder, type, status, and expiry without drilling into each record. The backend contract already defines the policy object shape, but the frontend does not yet surface that data in a list view.

## What Changes

Add a policy list screen to the dashboard that retrieves the policy collection from the backend and renders a table with the required columns: policy number, holder, type, status, and expiry date. The view will support a loading state while the API request is in flight and an empty state when the backend returns no records.

## Capabilities

### New Capabilities
- `policy-list`: Frontend policy list view that consumes the backend policy list API and renders the supported policy table with loading and empty states.

### Modified Capabilities
- Empty

## Impact

- Frontend dashboard UI for listing policies
- API integration against the existing policy list contract in the backend
- Shared table and empty/loading state patterns used by the dashboard
