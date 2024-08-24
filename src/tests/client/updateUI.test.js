import { updateUI } from '../../client/js/updateUI';
import trashIcon from '../../client/assets/icons/trash.svg';
import rotateIcon from '../../client/assets/icons/rotate.svg';

jest.mock('../../client/assets/icons/trash.svg', () => 'mocked-trash-icon.svg');
jest.mock('../../client/assets/icons/rotate.svg', () => 'mocked-rotate-icon.svg');

describe('updateUI', () => {
    let destinationMock;

    beforeEach(() => {
        // Mock destination object
        destinationMock = {
            id: '123',
            name: 'Test Destination',
            countryName: 'Test Country',
            weather: [
                { day_temp: 25, night_temp: 15, description: 'Sunny', date: '2024-08-24', icon: 'mocked-weather-icon.svg' },
            ]
        };

        // Set up DOM
        document.body.innerHTML = '<div class="destinations-wrapper"></div>';
    });

    afterEach(() => {
        // Clear DOM after each test
        document.body.innerHTML = '';
    });

    test('should create and append a container with the correct elements', () => {
        updateUI(destinationMock);

        const container = document.querySelector('.card-container');
        expect(container).toBeTruthy();
        expect(container.id).toBe(destinationMock.id);

        // Check for delete button
        const deleteButton = container.querySelector('.delete-button');
        expect(deleteButton).toBeTruthy();
        expect(deleteButton.querySelector('img').src).toContain('mocked-trash-icon.svg');

        // Check for rotate button
        const rotateButton = container.querySelector('.rotate-button');
        expect(rotateButton).toBeTruthy();
        expect(rotateButton.querySelector('img').src).toContain('mocked-rotate-icon.svg');

        // Check for card1 and card2
        const card1 = container.querySelector('.card1');
        const card2 = container.querySelector('.card2');
        expect(card1).toBeTruthy();
        expect(card2).toBeTruthy();

        // Verify that the container was appended to .destinations-wrapper
        const destinationsWrapper = document.querySelector('.destinations-wrapper');
        expect(destinationsWrapper.contains(container)).toBe(true);
    });
});
