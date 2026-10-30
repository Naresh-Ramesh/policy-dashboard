# Proposal

## Why

The policy dashboard needs a backend API that can manage policy records consistently across the app. Without a shared policy interface, the frontend cannot list, review, create, or update policies reliably, and policy data is likely to drift across clients.

## What Changes

This change adds a backend capability for policy management. The API will support listing all policies, viewing an individual policy, creating a new policy record, and updating an existing policy record.

The policy model will include:
- id
- holder name
- policy number
- type
- status (active, expired, cancelled)
- start date
- expiry date

## Capabilities

### New Capabilities
- `policy-api`: backend policy management API for querying, creating, and updating policy records

### Modified Capabilities
- None

## Impact

- Backend API in the `api/` service
- Policy data contract used by the React frontend
- Validation and error handling for policy statuses and date ranges
- Future integrations that read or write policy records
