"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let test = { hello: { cvalue: 1 }, world: { cvalue: { yay: { cvalue: "" } } } };
let test2 = { abc: undefined, bvv: { cvalue: undefined }, bcc: { cvalue: 5 }, bff: { cvalue: test }, bqqq: { cvalue: { bgt: { cvalue: "a" } } } };
function summ(a) {
    const x = Object.keys(a).map((k) => {
        const elem = a[k];
        if (typeof elem === "undefined" || typeof elem.cvalue === "undefined")
            return 2022;
        if (typeof elem.cvalue === 'string')
            return +elem.cvalue || 2022;
        if (typeof elem.cvalue === 'object')
            return summ(elem.cvalue);
        return elem.cvalue;
    });
    let sum = 0;
    for (let i = 0; i < x.length; i++) {
        sum += x[i];
    }
    return sum;
}
//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------Map Object--------------------------------------------------------
function mapObject1(object, transformer) {
    let result = {};
    for (let key in object) {
        result[key] = transformer(object[key]);
    }
    return result;
}
function mapObject(object, transformer) {
    let result = {};
    for (let key in object) {
        result[key] = transformer(object[key]);
    }
    return result;
}
class Rectangle {
}
class Circle {
}
// сделайте норм сигнатуру тут.
// НЕТ, Rectangle|Circle это не вариант, надо сделать универсальную функцию 
function наштамповать(SOMECLASS, count) {
    let a = [];
    for (let i = 0; i < count; i++)
        a.push(new SOMECLASS());
    return a;
}
let a = наштамповать(Rectangle, 10);
let b = наштамповать(Circle, 20);
console.log(a[0]);
console.log(b);
