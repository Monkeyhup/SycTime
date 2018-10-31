/*jshint esversion: 6 */
// let a=isNaN(Number('NaN'));
function sub(num1, num2) {
    const num1Digits = (num1.toString().split('.')[1] || '').length;
    const num2Digits = (num2.toString().split('.')[1] || '').length;
    const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
    return (num1 * baseNum - num2 * baseNum) / baseNum;
  }
let b='time';
let c=3749986202188.589;
// let a=cal.format((cal.subtract(3749986202188.589, Number(3749986202858.596))), {precision: 10});
let a=sub(b,c)
console.log(a);