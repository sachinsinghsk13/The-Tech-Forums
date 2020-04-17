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

export function getTime(date: Date) {
    let now = new Date();
    let x;
    let diff = Math.round((now.getTime() - date.getTime()) / (1000 * 60)); // convert to minutes
    if (diff < 2)
        return `Just Now`;
    else if (diff >= 2 && diff < 60)
        return `${diff} min ago`;
    else if (diff >= 60 && diff < 1440) {
        x = Math.ceil(diff/60);
        return `${x} ${(x>1?'hours':'hour')} ago`;
    } 
    else if (diff >= 1440 && diff < 10080) {
        x = Math.ceil(diff/1440);
        return `${x} ${(x>1?'days':'day')} ago`;
    }  
    else if (diff >= 10080 && diff < 525600) {
        x = Math.ceil(diff/10080);
        return `${x} ${(x>1?'weeks':'week')} ago`;
    }
    else return `${Math.ceil(diff/525600)} yr ago`;
}
export function formatDateTime(date: Date) : string {
    return `${date.getDate()} ${month[date.getMonth()]}, ${date.getFullYear()}`;
}