import dayjs from 'dayjs'


export function isToday(date) {
    const today = dayjs()
    return today.isSame(date, 'day')
}

export function isSameDate(date, activeDate) {
    const _activeDate = dayjs(activeDate);
    const _date = dayjs(date);

    return _date.isSame(_activeDate, 'date')

}


export function minToTime(value) {
    let hours = Math.floor(value / 60);
    let minutes = Math.floor((value - ((hours * 3600)) / 60));
    //let seconds = Math.floor((value * 60) - (hours * 3600) - (minutes * 60));

    // Appends 0 when unit is less than 10
    if (hours < 10) {
        var newH = "0" + hours;
    } else {
        newH = hours.toString();
    }
    if (minutes < 10) {
        var newMin = "0" + minutes;
    }
    else {
        newMin = minutes.toString();
    }
    return newH + ':' + newMin;
}

export function shadeColor(color, percent, transpert) {

    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));
    if (transpert)
        return "#" + RR + GG + BB + "80"
    return "#" + RR + GG + BB;
}