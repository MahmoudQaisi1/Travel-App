var path = require('path');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});

const destinations = {};

app.get('/getAllDestinations', (req, res) => {
    try {
        res.status(200).json(destinations);
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred while retrieving destinations' });
    }
});

const { v4: uuidv4 } = require('uuid');
const geoNamesRequest = require('./geoNamesRequest');
const pixabayRequest = require('./pixabayRequest');
const weatherbitRequest = require('./weatherbitRequest');

const geoNamesUsername = process.env.geo_names_username;
const weatherbitAPIKey = process.env.weatherbit_API_Key;
const pixabayAPIKey = process.env.pixabay_API_Key;

app.post('/addDestination', async (req, res) => {
    try {
        let currentEntry = { id: uuidv4() };

        // GeoNames API request
        const result1 = await geoNamesRequest(req.body.location, geoNamesUsername);
        currentEntry.name = result1.name;
        currentEntry.countryName = result1.countryName;

        // Weatherbit API request
        const result2 = await weatherbitRequest(result1.coordinates, req.body.startDate, req.body.endDate, weatherbitAPIKey);
        currentEntry.weather = result2;

        // Pixabay API request
        const result3 = await pixabayRequest(`${currentEntry.name},${currentEntry.countryName}`, pixabayAPIKey);
        currentEntry.image = result3;

        destinations[currentEntry.id] = currentEntry;

        res.status(200).json(currentEntry);

    } catch (error) {
        console.error('Error adding destination:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/deleteDestination', (req, res)=>{
    const id = req.body.id;
    if (destinations[id]) {
        delete destinations[id];
        res.status(200).json({ success: true, message: 'Destination deleted successfully' });
    } else {
        res.status(404).json({ success: false, message: 'Destination not found' });
    }
});

// Export the app for testing
module.exports = app;

if (require.main === module) {
    // Only start the server if this file is run directly
    app.listen(8000, function () {
        console.log('Travel app listening on port 8000!');
    });
}