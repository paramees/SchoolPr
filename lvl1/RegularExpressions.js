function Validator() {
    this.validateEmail = function(email) {
        let regExp = /^[\da-z][a-z\d\-\+\.]{1,19}@[\w\.\!\$\%\&\'\*\+\/\=\?\-]{1,15}\.[a-z]{1,5}$/i;
        return regExp.test(email);
    }

    this.validatePhone = function(phoneNum) {
        if (phoneNum.length > 25) {return false}
        let regExp = /^[\s\-]*(\+38)?[\s\-]*\(?(\d[\s\-]*){3,3}\)?[\s\-]*(\d[\s\-]*){7,7}$/;
        return regExp.test(phoneNum);
    }
}

let valid = new Validator();
/*
console.log("fi@secondpart.end  \nResult: " + valid.validateEmail("fi@secondpart.end"));
console.log("first-part@.se=cond%p.art.end  \nResult: " + valid.validateEmail("first-part@.se=cond%p.art.end"));
console.log("first.part@se=cond%part.r  \nResult: " + valid.validateEmail("first.part@se=cond%part.r"));

console.log("f@secondart.end,  \nResult: " + valid.validateEmail("f@secondart.end,"));
console.log("first-part@.se=cond@part.end  \nResult: " + valid.validateEmail("first-part@.se=cond@part.end"));
console.log("-firstpart@.se=cond%.enddeded  \nResult: " + valid.validateEmail("-firstpart@.se=cond%.enddeded"));
console.log("firs_tpart@.se.en  \nResult: " + valid.validateEmail("firs_tpart@.se.en"));
console.log("firstpart@.se.enddeded  \nResult: " + valid.validateEmail("firstpart@.se.enddeded"));
*/

let test = ["+38 (099) 567 8901",
 "+38 099 5 6 7 8 9  01", 
"(09-9) 567-890-1",
" --  (099) 567 890-1",
"+38 (099) 567 8901 0",
"+38 099 a0000000",
"+38 (0989) 567 8901",
"+48 (0989) 567 8901"]
for (let i = 0; i < test.length; i++) {
console.log(test[i] + "\nResult: " + valid.validatePhone(test[i]));
}