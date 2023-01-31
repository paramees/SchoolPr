// 1. 

function getFirstWord(a: string) {
	return a.split(/ +/)[0].length;
}

// 2. 

function getUserNamings(a: {name: string, surname: string}) {
  return { 
		fullname: a.name + " " + a.surname, 
		initials: a.name[0] + "." + a.surname[0] 
	};
}

// 3. 

// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining>
function getAllProductNames(a: {products: {name: string}[]}) {
  return a?.products?.map(prod => prod?.name) || [];
}

// 4.1

// easy way is using 'as' keyword
// hard way is ?...

interface Pet {
    name: () => string,
    type? : "cat" | "dog",
    cuteness? : number
    coolness? : number
}

class Cat implements Pet {
    constructor(public _name: string, public bool? : boolean) {}
    name() : string {return this._name} 
}

class Dog implements Pet {
    constructor(public _name: string, public num? : number) {}
    name() : string {return this._name} 
}

hey({name: () => "roma", cuteness: 100})
hey({name: () => "vasya", coolness: 100})

// 4.2

let a = new Cat("myavchik", true)
let b = new Dog("gavchik", 333)
hey(a)
hey(b)

// 4.3

function hey(a: Pet) {
    return "hey! i'm " + a.name()
		 + (a.type === "cat" ? ("cuteness: "+a.cuteness) : ("coolness: "+a.coolness))
}
hey({name: () => "roma", type: "cat", cuteness: 100})
hey({name: () => "vasya", type: "dog", coolness: 100})

// 5.

// google for Record type
function stringEntries(a:Record<number | string, string>) {
   return Array.isArray(a) ? a : Object.keys(a)
}

// 6.

// you don't know Promises and async/await yet. Or do you? 
// ....can be hard, don't worry and SKIP if you do not know how to do it

async function world(a:number) {
    return "*".repeat(a)
}
const hello = async () => {
   return await world(10)
}
hello().then(r => console.log(r)).catch(e => console.log("fail"))