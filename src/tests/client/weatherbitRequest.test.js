import weatherbitRequest from '../../server/weatherbitRequest';

// Mock the fetch function
global.fetch = jest.fn();

describe('weatherbitRequest', () => {
    const coordinates = { lat: 35.6895, lng: 139.6917 }; // Example coordinates
    const apiKey = 'dummyApiKey';
    
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should return the correct weather data for the given date range', async () => {
        const mockResponse = {
            data: [
                { valid_date: '2024-08-21', high_temp: 30, low_temp: 20, weather: { description: 'Clear sky', icon: 'c01d' } },
                { valid_date: '2024-08-22', high_temp: 28, low_temp: 18, weather: { description: 'Partly cloudy', icon: 'c02d' } }
                // Add more mock data as needed
            ]
        };
        
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
        });

        const startDate = '2024-08-21';
        const endDate = '2024-08-22';

        const result = await weatherbitRequest(coordinates, startDate, endDate, apiKey);

        expect(result).toEqual([
            { date: '2024-08-21', day_temp: 30, night_temp: 20, description: 'Clear sky', icon: 'https://www.weatherbit.io/static/img/icons/c01d.png' },
            { date: '2024-08-22', day_temp: 28, night_temp: 18, description: 'Partly cloudy', icon: 'https://www.weatherbit.io/static/img/icons/c02d.png' }
        ]);
    });

    test('should throw an error if the fetch request fails', async () => {
        fetch.mockRejectedValueOnce(new Error('Network error'));

        const startDate = '2024-08-21';
        const endDate = '2024-08-22';

        await expect(weatherbitRequest(coordinates, startDate, endDate, apiKey))
            .rejects
            .toThrow('Weatherbit API request failed: Network error');
    });

    test('should handle an empty response gracefully', async () => {
        const mockResponse = { data: [] };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
        });

        const startDate = '2024-08-21';
        const endDate = '2024-08-22';

        const result = await weatherbitRequest(coordinates, startDate, endDate, apiKey);

        expect(result).toEqual([]);
    });
});
