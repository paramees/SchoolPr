import { type } from "os";

//-----------------------------------------------------------Buttons--------------------------------------------------------
type DialogButtonType = "Yes" | "No";

interface FormButton {
    type: "Add" | "Remove" | "Buy"
}

// задача 1: создайте тип AnyButtonType, который описывает все вариации кнопок
type AnyButtonType = DialogButtonType | FormButton["type"]; 

// задача 2: создайте тип ConfirmationHandlingFormButton
// т.е. подтип формовых кнопок, которые ещё содержат поле onConfirm, в котором
// может лежать функция, которая вызывается с параметром типа DialogButtonType
// (и ничего не возвращает)
// Т.е. предполагается что у кнопки такого типа, если поле onConfirm пустое, 
// то при нажатии на эту кнопку сразу происходит действие
// а иначе вызывается диалог Подтверждения, и результат нажатия на кнопку Да или Нет
// в итоге попадет в функцию onConfirm, которая уже дальше решит что делать
type ConfirmationHandlingFormButton = FormButton & {
    onConfirm : ((result: DialogButtonType) => void) | null
};
//-----------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------Type Narrowing--------------------------------------------------------
interface MyObj {
    [property : string]: undefined | {cvalue : undefined | string | number | MyObj}
}


let test = { hello: {cvalue: 1}, world: { cvalue: { yay: { cvalue: "" } } } };
let test2 = {abc : undefined, bvv : {cvalue : undefined}, bcc : {cvalue : 5}, bff : {cvalue : test}, bqqq : {cvalue : {bgt : {cvalue : "a"}}}};

function summ(a : MyObj) {
    const x = Object.keys(a).map((k) => {
        const elem = a[k];
        if (typeof elem === "undefined" || typeof elem.cvalue === "undefined") return 2022;
        if (typeof elem.cvalue === 'string') return +elem.cvalue || 2022;
        if (typeof elem.cvalue === 'object') return summ(elem.cvalue);
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

function mapObject1<Key extends string | number | symbol, TypeIn, TypeOut> (object: Record<Key, TypeIn>, transformer : (arg : TypeIn) => TypeOut) {
    let result : {[property: number | string | symbol] : TypeOut} = {};
    for (let key in object) {
        result[key] = transformer(object[key])
    }
    return result;
}


function mapObject<InType,OutType>(object : {[property: number | string | symbol] : InType}, transformer : (arg : InType) => OutType) {
    let result : {[property: number | string | symbol] : OutType} = {};
    for (let key in object) {
        result[key] = transformer(object[key])
    }
    return result;
}

//-----------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------Nashtampovat'--------------------------------------------------------

type funcV1 <T> = (obj : Partial<T>, suppFunc : (obj : Partial<T>) => T) => T;

type funcV2 <T  extends {id : string}> = (obj : Partial<T>, suppFunc : (obj : Partial<T>) => T) => T;


class Rectangle {
    w!: number;
    h!: number;
}
class Circle {
    radius!: number;
}

// сделайте норм сигнатуру тут.
// НЕТ, Rectangle|Circle это не вариант, надо сделать универсальную функцию 

function наштамповать<T>(SOMECLASS : (new () => T), count : number) :T[] {
    let a = []
    for (let i = 0; i < count; i++)
       a.push(new SOMECLASS());
   
    return a;
}

let a: Rectangle[] = наштамповать(Rectangle, 10);
let b: Circle[] = наштамповать(Circle, 20)
