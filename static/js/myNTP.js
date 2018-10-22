/*jshint esversion: 6 */
/**
 * 为分与秒加0
 * */
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
/**
 * 为毫秒加0
 * */
function checkMsTime(i) {
    if (i.length == 1) {
        i = "00" + i;
    } else if (i.length == 2) {
        i = "0" + i;
    }
    return i;
}
/**
 * 添加日历时间
 * */
function startCalendar(ca) {
    let day = new Date(),
        y = null,
        m = null,
        d = null,
        w = null;
    if (ca == 'bj') {
        [y, m, d, w] = [day.getFullYear(), day.getMonth() + 1, day.getDate(), day.getDay()];
    } else if (ca == 'utc') {
        [y, m, d, w] = [day.getUTCFullYear(), day.getUTCMonth() + 1, day.getUTCDate(), day.getUTCDay()];
    }
    $("#calendar").html(y + "年" + m + "月" + d + "日星期" + w);
}


function getTableData(offset) {
    let re = [];
    for (let i in offset) {
        let obj = {};
        obj.name = i;
        obj.value = offset[i];
        re.push(obj);
    }
    return re;
}


//获取当地时间
function getLocalTime(msTime) {
    if (msTime == 'timeout') {
        return 'NaN';
    } else {
        let date = new Date("Jan 01 1900 GMT");
        date.setUTCMilliseconds(msTime);
        let arr = [date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds() + ''];
        arr[1] = checkTime(arr[1]);
        arr[2] = checkTime(arr[2]);
        arr[3] = checkMsTime(arr[3]);
        let str = arr[0] + ":" + arr[1] + ":" + arr[2] + "." + arr[3];
        return str;
    }
}


//获取成功率
function getRateTime(arr) {
    let a = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == 'timeout') {
            a++;
        }
    }
    return 100 - a;
}

//获取平均时间差
function getaveTime(arr) {
    let a = 0,
        sum = 0;
    for (let i = 0; i < arr.length; i++) {
        if (!isNaN(arr[i])) {
            sum += Math.abs(Number(arr[i]));
        } else {
            a++;
        }
    }
    return Number((sum / (100 - a)).toFixed(2));
}
