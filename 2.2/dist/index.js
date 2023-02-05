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
function randomNames1() {
    Promise.all([getRandName(), getRandName(), getRandName()]).then((data) => console.log(data));
}
function getRandName() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (yield fetch("https://random-data-api.com/api/name/random_name")).json();
    });
}
randomNames1();
//3.2
//3.3
