# policy-api Specification

## Purpose

The policy API provides a consistent contract for managing policy records so the dashboard can list, inspect, create, and update policy data without custom logic in the client.

## Requirements

### Requirement: Policy records can be listed
The system shall provide an API for retrieving all policy records in a consistent format, including the required policy fields and active status metadata.

#### Scenario: List policies from the backend
- **WHEN** a client requests the list of policies
- **THEN** the API shall return all available policy records with their id, holder name, policy number, type, status, start date, and expiry date

#### Scenario: Empty policy set
- **WHEN** no policy records exist
- **THEN** the API shall return an empty list rather than an error

### Requirement: A single policy can be viewed
The system shall provide an API to fetch one policy record by its unique identifier.

#### Scenario: View an existing policy
- **WHEN** a client requests a policy by id
- **THEN** the API shall return the matching record with all policy fields populated

#### Scenario: Policy not found
- **WHEN** a client requests an id that does not exist
- **THEN** the API shall return a not found response

### Requirement: Policy records can be created
The system shall accept a valid policy payload and create a new policy record.

#### Scenario: Create a valid policy
- **WHEN** a client submits a policy with all required fields and a valid status/date combination
- **THEN** the API shall create the record and return the created policy data

#### Scenario: Reject invalid create requests
- **WHEN** a client omits a required field, uses an unsupported status, or provides invalid dates
- **THEN** the API shall reject the request with a validation error

### Requirement: Policy records can be updated
The system shall allow an existing policy to be updated with a valid payload while preserving the record identity.

#### Scenario: Update an existing policy
- **WHEN** a client sends a valid update for a known policy id
- **THEN** the API shall persist the changed fields and return the updated policy

#### Scenario: Reject invalid updates
- **WHEN** a client attempts to update a policy with an unsupported status or malformed date values
- **THEN** the API shall reject the request with a validation error

### Requirement: Policy status and dates are validated
The system shall enforce a finite set of status values and validate date consistency at the API boundary.

#### Scenario: Supported status values
- **WHEN** a policy is created or updated
- **THEN** the status must be one of active, expired, or cancelled

#### Scenario: Date validation
- **WHEN** a policy includes start date or expiry date
- **THEN** the values shall be accepted in a standard date format and checked for consistency before the record is persisted
