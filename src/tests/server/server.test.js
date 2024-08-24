const request = require('supertest');
const express = require('express');
const app = require('../../server/server'); 
const geoNamesRequest = require('../../server/geoNamesRequest');
const pixabayRequest = require('../../server/pixabayRequest');
const weatherbitRequest = require('../../server/weatherbitRequest');

jest.mock('../../server/geoNamesRequest');
jest.mock('../../server/pixabayRequest');
jest.mock('../../server/weatherbitRequest');

describe('Express Server API Endpoints', () => {
  let server;

  beforeAll(() => {
    server = app.listen(8001, () => console.log('Test server running on port 8001'));
  });

  afterAll(done => {
    server.close(done);
  });

  test('GET /getAllDestinations should return all destinations', async () => {
    const response = await request(server).get('/getAllDestinations');
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toBeInstanceOf(Object);
  });

  test('POST /addDestination should add a new destination', async () => {
    const mockGeoNamesResponse = {
      name: 'Paris',
      countryName: 'France',
      coordinates: { lat: 48.8566, lon: 2.3522 },
    };
    const mockWeatherbitResponse = [
      {
        date: '2024-08-21',
        day_temp: 25,
        night_temp: 15,
        description: 'Sunny',
        icon: 'https://www.weatherbit.io/static/img/icons/c01d.png',
      },
    ];
    const mockPixabayResponse = 'https://example.com/paris.jpg';

    geoNamesRequest.mockResolvedValue(mockGeoNamesResponse);
    weatherbitRequest.mockResolvedValue(mockWeatherbitResponse);
    pixabayRequest.mockResolvedValue(mockPixabayResponse);

    const newDestination = {
      location: 'Paris',
      startDate: '2024-08-21',
      endDate: '2024-08-24',
    };

    const response = await request(server).post('/addDestination').send(newDestination);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Paris');
    expect(response.body.countryName).toBe('France');
    expect(response.body.weather).toEqual(mockWeatherbitResponse);
    expect(response.body.image).toBe(mockPixabayResponse);
  });

  test('POST /deleteDestination should delete a destination', async () => {
    const newDestination = {
      location: 'Paris',
      startDate: '2024-08-21',
      endDate: '2024-08-24',
    };

    const addResponse = await request(server).post('/addDestination').send(newDestination);
    const destinationId = addResponse.body.id;

    const deleteResponse = await request(server).post('/deleteDestination').send({ id: destinationId });
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toEqual({ success: true, message: 'Destination deleted successfully' });

    const getResponse = await request(server).get('/getAllDestinations');
    expect(getResponse.body[destinationId]).toBeUndefined();
  });

  test('POST /deleteDestination should return 404 if destination not found', async () => {
    const response = await request(server).post('/deleteDestination').send({ id: 'non-existent-id' });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ success: false, message: 'Destination not found' });
  });
});
