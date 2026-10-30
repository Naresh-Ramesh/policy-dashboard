const request = require('supertest');
const app = require('../src/app');

describe('Policy API', () => {
  test('GET /api/policies returns an empty list when no policies exist', async () => {
    const response = await request(app).get('/api/policies');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('POST /api/policies creates a policy and returns it', async () => {
    const payload = {
      id: 'pol-1001',
      holderName: 'Alice Smith',
      policyNumber: 'POL-1001',
      type: 'health',
      status: 'active',
      startDate: '2025-01-01',
      expiryDate: '2026-01-01'
    };

    const response = await request(app).post('/api/policies').send(payload);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(payload);
  });

  test('GET /api/policies/:id returns the matching policy', async () => {
    const response = await request(app).get('/api/policies/pol-1001');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: 'pol-1001',
      holderName: 'Alice Smith'
    });
  });

  test('PUT /api/policies/:id updates an existing policy', async () => {
    const update = {
      id: 'pol-1001',
      holderName: 'Alice Johnson',
      policyNumber: 'POL-1001',
      type: 'life',
      status: 'expired',
      startDate: '2025-01-01',
      expiryDate: '2025-12-31'
    };

    const response = await request(app).put('/api/policies/pol-1001').send(update);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: 'pol-1001',
      holderName: 'Alice Johnson',
      type: 'life',
      status: 'expired'
    });
  });

  test('POST /api/policies rejects unsupported statuses', async () => {
    const response = await request(app).post('/api/policies').send({
      id: 'pol-1002',
      holderName: 'Bob Jones',
      policyNumber: 'POL-1002',
      type: 'auto',
      status: 'pending',
      startDate: '2025-01-01',
      expiryDate: '2026-01-01'
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
