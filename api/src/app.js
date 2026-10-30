const express = require('express');

const app = express();
app.use(express.json());

const VALID_STATUSES = new Set(['active', 'expired', 'cancelled']);
const policies = new Map();

function isValidIsoDate(value) {
  if (typeof value !== 'string' || !value) {
    return false;
  }

  const parsed = new Date(value);
  return !Number.isNaN(parsed.getTime()) && value.includes('-');
}

function normalizePolicy(input = {}, { allowPartial = false } = {}) {
  const raw = input || {};
  const id = raw.id ?? raw.policyId ?? raw.policy_id;
  const holderName = raw.holderName ?? raw.holder_name ?? raw.holderName ?? raw.holder;
  const policyNumber = raw.policyNumber ?? raw.policy_number ?? raw.policyNo ?? raw.policy_no;
  const type = raw.type;
  const status = typeof raw.status === 'string' ? raw.status.toLowerCase() : raw.status;
  const startDate = raw.startDate ?? raw.start_date ?? raw.start;
  const expiryDate = raw.expiryDate ?? raw.expiry_date ?? raw.expiry;

  if (!allowPartial) {
    if (!id || !holderName || !policyNumber || !type || !status || !startDate || !expiryDate) {
      throw new Error('Policy is missing one or more required fields.');
    }
  }

  if (!allowPartial && !VALID_STATUSES.has(status)) {
    throw new Error('Status must be one of: active, expired, cancelled.');
  }

  if (status && !VALID_STATUSES.has(status)) {
    throw new Error('Status must be one of: active, expired, cancelled.');
  }

  if (startDate && !isValidIsoDate(startDate)) {
    throw new Error('Start date must be a valid ISO date string.');
  }

  if (expiryDate && !isValidIsoDate(expiryDate)) {
    throw new Error('Expiry date must be a valid ISO date string.');
  }

  if (startDate && expiryDate && new Date(expiryDate) < new Date(startDate)) {
    throw new Error('Expiry date must be on or after the start date.');
  }

  return {
    id: String(id),
    holderName: String(holderName),
    policyNumber: String(policyNumber),
    type: String(type),
    status: String(status),
    startDate: String(startDate),
    expiryDate: String(expiryDate)
  };
}

app.get('/api/policies', (req, res) => {
  res.json(Array.from(policies.values()));
});

app.get('/api/policies/:id', (req, res) => {
  const { id } = req.params;
  const policy = policies.get(id);

  if (!policy) {
    return res.status(404).json({ error: 'Policy not found.' });
  }

  return res.json(policy);
});

app.post('/api/policies', (req, res) => {
  try {
    const policy = normalizePolicy(req.body);

    if (policies.has(policy.id)) {
      return res.status(409).json({ error: 'Policy with this id already exists.' });
    }

    policies.set(policy.id, policy);
    return res.status(201).json(policy);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

app.put('/api/policies/:id', (req, res) => {
  try {
    const { id } = req.params;
    const existing = policies.get(id);

    if (!existing) {
      return res.status(404).json({ error: 'Policy not found.' });
    }

    const nextPolicy = normalizePolicy({ ...existing, ...req.body, id });
    policies.set(id, nextPolicy);
    return res.json(nextPolicy);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = app;
