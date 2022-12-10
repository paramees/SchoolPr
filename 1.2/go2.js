// этот файл надо будет дописать...

// не обращайте на эту функцию внимания 
// она нужна для того чтобы правильно читать входные данные
function readHttpLikeInput(){
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for(;;){ 
        try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) {break; /* windows */}
        if(buffer[0] === 10 || buffer[0] === 13) {
            if (was10 > 10) 
                break;
            was10++;
        } else 
           was10 = 0;
        res += new String(buffer);
    }

    return res;
}

let contents = readHttpLikeInput();

// вот эту функцию собственно надо написать
function parseTcpStringAsHttpRequest(string) { 
    allAndBody = string.trim().split("\n\n")
    splitedStr = allAndBody[0].trim().split("\n")
    methodAndUri = splitedStr[0].split(" ")
    head = new Map()
    for (let i = 1; i < splitedStr.length; i++) {
        str = splitedStr[i].split(": ")
        if(str[0] == "HOST") str[0] = "Host"
        head[str[0]] = str[1]
    }
  return { 
    method: methodAndUri[0], 
    uri : methodAndUri[1],
    headers:  head, 
    body : allAndBody[1], 
  }; 
}

http = parseTcpStringAsHttpRequest(contents); 
console.log(JSON.stringify(http, undefined, 2));