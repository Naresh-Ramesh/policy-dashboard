# Tasks

## 1. Policy API contract and validation

- [x] 1.1 Define the REST contract for listing, retrieving, creating, and updating policies, including required fields and response shapes. Verification: API contract matches the policy requirements and expected status/date constraints.
- [x] 1.2 Implement request validation for required fields, supported policy statuses, and date formatting. Verification: invalid requests return clear validation errors and valid requests proceed.

## 2. Policy persistence and route handlers

- [x] 2.1 Add the policy data model and persistence layer for storing policy records. Verification: policy records can be created and retrieved from the chosen backend storage.
- [x] 2.2 Implement the list and get-by-id API handlers. Verification: the API returns all policies and a single policy with correct data and 404 handling.
- [x] 2.3 Implement create and update handlers for policy records. Verification: valid create/update requests persist data and return the updated record.

## 3. Verification and integration checks

- [x] 3.1 Add API tests covering list, view-one, create, and update flows. Verification: test suite passes for successful and invalid policy inputs.
- [x] 3.2 Validate status and date edge cases such as unsupported status values and malformed dates. Verification: invalid inputs fail fast with consistent 400 responses.
- [x] 3.3 Confirm the frontend can consume the API contract without custom assumptions. Verification: API payload shape and status values are consistent with the dashboard needs.
