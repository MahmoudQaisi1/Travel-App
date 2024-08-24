import { validateDates } from '../../client/js/validateDates';

function setupMockDOM() {
    document.body.innerHTML = `
        <div class="date-form-section">
            <span id="dep-date-error" class="error-icon"></span>
        </div>
        <div class="date-form-section">
            <span id="ret-date-error" class="error-icon"></span>
        </div>
    `;
}

describe('validateDates', () => {
    beforeEach(() => {
        setupMockDOM();
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('should return true and hide error messages for valid dates', () => {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 1); 

        const result = validateDates(startDate, endDate);

        expect(result).toBe(true);
        expect(document.getElementById('dep-date-error').style.visibility).toBe('hidden');
        expect(document.getElementById('ret-date-error').style.visibility).toBe('hidden');
        expect(document.querySelector('.date-form-section.active-error')).toBeNull();
    });

    test('should return false and show error messages for start date before today', () => {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 10);
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 1);

        const result = validateDates(startDate, endDate);

        expect(result).toBe(false);
        expect(document.getElementById('dep-date-error').style.visibility).toBe('visible');
        expect(document.querySelector('.date-form-section.active-error')).toBeTruthy();
    });

    test('should return false and show error messages for end date before start date', () => {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() - 1);

        const result = validateDates(startDate, endDate);

        expect(result).toBe(false);
        expect(document.getElementById('ret-date-error').style.visibility).toBe('visible');
        expect(document.querySelector('.date-form-section.active-error')).toBeTruthy();
    });

    test('should return false and show error messages if dates are more than 7 days from today', () => {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() + 8); 
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 1);

        const result = validateDates(startDate, endDate);

        expect(result).toBe(false);
        expect(document.getElementById('dep-date-error').style.visibility).toBe('visible');
        expect(document.getElementById('ret-date-error').style.visibility).toBe('visible');
        expect(document.querySelector('.date-form-section.active-error')).toBeTruthy();
    });
});
