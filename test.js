/*jshint esversion: 6 */
const math = require('mathjs');
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
//获取当地时间
function getLocalTime(msTime) {
    if (msTime == 0) {
        return 0;
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
/**
 * 减法运算，避免数据相减小数点后产生多位数和计算精度损失。
 * 
 * @param num1被减数  |  num2减数
 */
function numSub(num1, num2) {
	var baseNum, baseNum1, baseNum2;
	var precision;// 精度
	try {
		baseNum1 = num1.toString().split(".")[1].length;
	} catch (e) {
		baseNum1 = 0;
	}
	try {
		baseNum2 = num2.toString().split(".")[1].length;
	} catch (e) {
		baseNum2 = 0;
	}
	baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
	precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
	return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
};
let a = 10 - 'timeout';
let b = Number((10 - 'timeout').toFixed(2));
let c = parseInt(5376524724.1561);
let d= getLocalTime(3748784881232);
let e= getLocalTime(3748901935522.606-3748901935488.0767);
let f=numSub(3748902134720.5996,3748902135722.561);
// console.log(d);
console.log(3748902134720.5996-3748902135722.561);
console.log((134720.5996-'time').toFixed(3));
console.log(typeof Number((134720.5996-'time').toFixed(3)));
console.log(f)

