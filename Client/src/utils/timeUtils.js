export const parseHour = (timeStr) => {
    const num = parseInt(timeStr);
    const isPm = timeStr.includes("pm");

    if(isPm && num !== 12) return num + 12;
    return num;
     
}