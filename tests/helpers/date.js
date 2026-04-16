export function generateDOB(age) {
    const date = new Date();
    date.setFullYear(date.getFullYear() - age);
    date.setDate(date.getDate() - 1);

    return date.toISOString().split('T')[0];
}