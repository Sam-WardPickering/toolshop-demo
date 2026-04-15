export function generateSeventeenYearsDOB() {
    let currentDate = new Date().toISOString().split('T')[0];
    let [currYear, currMonth, currDay] = currentDate.split('-');
    let invalidYear = Number(currYear) - 17;

    let updatedString = `${invalidYear.valueOf()}-${currMonth}-${currDay}`;
    return updatedString;
}