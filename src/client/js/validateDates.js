export function validateDates(startDate, endDate) {

    const startDateError = document.getElementById('dep-date-error');
    const endDateError =document.getElementById('ret-date-error');

    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Clear previous error messages
    startDateError.style.visibility = 'hidden';
    startDateError.parentElement.classList.remove('active-error');
    endDateError.style.visibility = 'hidden';
    endDateError.parentElement.classList.remove('active-error');

    function differenceInDays(date1, date2){
        return ((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24)) > 7;
    }

    let isValid = true;

    // Validate start date
    if (startDate < today || differenceInDays(today,startDate)) {
        startDateError.style.visibility = 'visible';
        startDateError.parentElement.classList.add('active-error');
        isValid = false;
    }

    // Validate end date
    if (endDate < startDate || differenceInDays(today,endDate)) {
        endDateError.style.visibility = 'visible';
        endDateError.parentElement.classList.add('active-error');
        isValid = false;
    }

    return isValid;
}