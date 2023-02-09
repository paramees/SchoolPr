"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//1 - 2
function fetchIp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield (yield fetch("https://api.ipify.org?format=json")).json();
        }
        catch (_a) {
            throw new Error("cant fetch");
        }
    });
}
//fetchIp().then(ip => console.log(ip.ip))
//3.1
function getRandName() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (yield fetch("https://random-data-api.com/api/name/random_name")).json();
    });
}
function randomNames1() {
    Promise.all([getRandName(), getRandName(), getRandName()]).then((data) => console.log(data.length));
}
//randomNames1()
//3.2
function randomNames2() {
    for (let i = 0; i < 3; i++) {
        getRandName().then((data) => console.log(data));
    }
}
//randomNames2()
//3.3
function randomNames3() {
    let getName;
    for (let i = 0; i < 3; i++) {
        getName = fetch("https://random-data-api.com/api/name/random_name").then((resp) => resp.json());
        getName.then((data) => console.log(data)).catch((e) => console.error(e));
    }
}
//randomNames3()
//4.1
function getWomen() {
    let getUser;
    getUser = fetch("https://random-data-api.com/api/users/random_user").then((resp) => resp.json());
    getUser.then((user) => {
        if (user.gender = "Female") {
            console.log(user);
        }
        else {
            getWomen();
        }
    });
}
//getWomen()
//4.2
function getUser() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (yield fetch("https://random-data-api.com/api/users/random_user")).json();
    });
}
function getWomenAsync() {
    return __awaiter(this, void 0, void 0, function* () {
        let user;
        do {
            user = yield (yield fetch("https://random-data-api.com/api/users/random_user")).json();
        } while (user.gender != "Female");
        console.log(user);
    });
}
//getWomenAsync()
//5
function f52() {
    return __awaiter(this, void 0, void 0, function* () {
        let ip = fetchIp().then((data) => {
            f51(() => console.log(data.ip));
        });
    });
}
function f51(callback) {
    callback();
}
// (async () => {
//     await f52()
// })()
//6
function f61() {
    return __awaiter(this, void 0, void 0, function* () {
        let ip = yield fetchIp().then((data) => data.ip);
        return ip;
    });
}
function f62(callback) {
    f61().then((ip) => callback(ip));
}
f62((ip) => console.log(ip));
