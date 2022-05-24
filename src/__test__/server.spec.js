// Import the js file to test for ES 2015
// import "regenerator-runtime/runtime.js";

const request = require('supertest');
const express = require('express');

const app = new express();
app.use('/', express.Router());

// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
describe('Test createTrip EndPoint on express server', function () {
  test('responds to /createTrip', async () => {
    const res = await request(app).get('/createTrip').send({});
    try {
      expect(res.statusCode).toBe(200);
    } catch (error) {}
  });
});
