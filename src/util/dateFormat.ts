const month = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export function formatDate(date: Date) : string {
    let median = "am";
    let hour = date.getHours();
    if (hour > 12) {
        hour = hour - 12;
        median = "pm";
    }
    return `${hour}:${date.getMinutes()} ${median} ${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}