/**
 * Created by asus on 2018/7/25.
 */


/**
 * 显示时间
 * */
function startTime(site) {
    let now = new Date(),
        h = null,
        m = null,
        s = null,
        ms = null;
    if (site == 'bj') {
        [h, m, s, ms] = [now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds() + '']
    } else if (site == 'utc') {
        [h, m, s, ms] = [now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds() + '']
    }
    m = checkTime(m);
    s = checkTime(s);
    ms = checkMsTime(ms);
    $("#twd").empty();
    $("#twd").html(h + ":" + m + ":" + s + ":" + ms)
}
/**
 * 为时与分加0
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
/**
 * 画图表
 *
 * */
function drawTable() {

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
    if (msTime == 0) {
        return 0
    } else {
        let date = new Date("Jan 01 1900 GMT");
        date.setUTCMilliseconds(msTime);
        let arr = [date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds() + ''];
        arr[3] = checkMsTime(arr[3]);
        let str = arr[0] + ":" + arr[1] + ":" + arr[2] + "." + arr[3]
        return str;
    }
}

//获取时间偏差
function getDriftTime(msTime, norm) {
    let re = msTime - norm;
    if (msTime > 0 && norm > 0) {
        return +re.toFixed(2);
    }
}

//获取成功率
function getRateTime(arr) {
    let a = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == 0) {
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
        if (arr[i]) {
            sum += arr[i]
        } else {
            a++
        }
    }
    return +(sum / (100 - a)).toFixed(2)
}