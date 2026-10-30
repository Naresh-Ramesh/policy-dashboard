# Tasks

## 1. Policy list contract and screen setup

- [ ] 1.1 Confirm the frontend list page consumes the backend policy list contract and maps the required fields for Policy Number, Holder, Type, Status, and Expiry Date.
- [ ] 1.2 Create the list screen shell and table structure for the dashboard policy view.

## 2. Loading and empty-state behavior

- [ ] 2.1 Implement the loading state shown while the policy collection request is pending and verify it renders before data arrives.
- [ ] 2.2 Implement the empty state shown when the backend returns an empty list and verify the message appears without a blank table.

## 3. Policy row rendering and validation

- [ ] 3.1 Render each policy row using the backend response fields and format the expiry date in a readable dashboard-friendly format.
- [ ] 3.2 Verify the table matches the contract from the policy API spec: policy number, holder, type, status, and expiry date appear in the correct columns.
- [ ] 3.3 Run the relevant UI verification for the populated and empty policy states and confirm the dashboard remains consistent with the API contract.
