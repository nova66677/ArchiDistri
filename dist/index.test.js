// index.test.js
const request = require('supertest');
const express = require('express');
const getSystemInformation = require('./sysInfo');
const app = express();

app.get('/api/v1/sysinfo', async (req, res) => {
  try {
    const systemInfo = await getSystemInformation();
    res.json(systemInfo);
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ error: 'System information not available' });
  }
});

jest.mock('./sysInfo'); // Mock the getSystemInformation module

describe('GET /api/v1/sysinfo', () => {
  it('should return system information', async () => {
    // Arrange: Define the mock return value
    const mockSystemInfo = {
      cpu: { manufacturer: 'AMD', brand: 'Ryzen 7' },
      system: { manufacturer: 'LENOVO', model: 'IdeaPad' },
      mem: { total: 16000 },
      os: { platform: 'linux' },
      currentLoad: { avgLoad: 0.1 },
      processes: { all: 100, running: 5 },
      diskLayout: [],
      networkInterfaces: [],
    };
    getSystemInformation.mockResolvedValue(mockSystemInfo); // Mock resolved value

    // Act: Send a request to the endpoint
    const response = await request(app).get('/api/v1/sysinfo');

    // Assert: Check if the response is as expected
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockSystemInfo);
  });

  it('should return 404 when system information is not available', async () => {
    // Arrange: Mock the function to throw an error
    getSystemInformation.mockRejectedValue(new Error('404'));

    // Act: Send a request to the endpoint
    const response = await request(app).get('/api/v1/sysinfo');

    // Assert: Check if the error response is as expected
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'System information not available' });
  });
});
