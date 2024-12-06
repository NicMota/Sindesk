export function convertDatetime(inputDatetime) {
    // Create a new Date object from the input string
    const date = new Date(inputDatetime);
    
    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, '0');  // Get day and pad with leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear(); // Get full year

    // Format the date as 'dd/mm/yyyy'
    return `${day}/${month}/${year}`;
}