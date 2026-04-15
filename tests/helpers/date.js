export function generateDOB(age) {
    let currentDate = new Date().toISOString().split('T')[0];
    let [currYear, currMonth, currDay] = currentDate.split('-');
    let invalidYear = Number(currYear) - age;

    let updatedString = `${invalidYear.valueOf()}-${currMonth}-${currDay}`;
    return updatedString;
}