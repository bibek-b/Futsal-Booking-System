export const getInitialDate = () => {
    const now  = new Date();
    const isAfter9pm = now.getHours() >= 20;

    if(isAfter9pm){
        let tommorow = new Date();
        tommorow.setDate(tommorow.getDate() + 1);
        return tommorow;
    }
    return now;
}

export const getMinDate = () => {
    const minDate = new Date();
    if(minDate.getHours() >= 20) {
        minDate.setDate(minDate.getDate() + 1);
    }
    return minDate;
}