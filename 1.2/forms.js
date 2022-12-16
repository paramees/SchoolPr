function readHttpLikeInput(){
    return `POST /api/checkLoginAndPassword HTTP/1.1
Accept: */*
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/4.0
Content-Length: 35

login=student&password=12345`
}
   
let contents = readHttpLikeInput();
   
function outputHttpResponse(statusCode, statusMessage, headers, body) {
    console.log(
    "HTTP/1.1 " + statusCode + " " + statusMessage +"\n" + headers + "\n\n" +body);
}
   
function processHttpRequest($method, $uri, $headers, $body) {
    // ... проанализировать входящие данные, вычислить результат
    // и специальной командой красиво вывести ответ
    let statusCode = ""
    let statusMessage = ""
    let headers = ""
    let body = ""
    if ($uri === "/api/checkLoginAndPassword" && $headers["Content-Type"] === "application/x-www-form-urlencoded") {
        try {
            let passwords = require("fs").readFileSync("passwords.txt", "utf-8").split("\n")
            let user = $body.split("&")[0].split("=")[1] + ":" + $body.split("&")[1].split("=")[1]
            if (passwords.includes(user)) {
                statusCode = "200"
                statusMessage = "OK"
                headers = "Date: " + Date() +"\nServer: Apache/2.2.14 (Win32)\nContent-Length: 34\nConnection: Closed\nContent-Type: text/html; charset=utf-8";
                body = '<h1 style="color:green">FOUND</h1>'
            } else {
                statusCode = "403"
                statusMessage = "Forbidden"
                headers = "Date: " + Date() +"\nServer: Apache/2.2.14 (Win32)\nContent-Length: 36\nConnection: Closed\nContent-Type: text/html; charset=utf-8";
                body = '<h1 style="color:red">NOT FOUND</h1>'
            }
        } catch {
            statusCode = "500"
            statusMessage = "Internal Server Error"
            headers = "Date: " + Date() +"\nServer: Apache/2.2.14 (Win32)\nContent-Length: 21\nConnection: Closed\nContent-Type: text/html; charset=utf-8";
            body = "Internal Server Error"
        }
    } else {
        statusCode = "404"
        statusMessage = "Not Found"
        headers = "Date: " + Date() +"\nServer: Apache/2.2.14 (Win32)\nContent-Length: 9\nConnection: Closed\nContent-Type: text/html; charset=utf-8";
        body = "not found"
    }
    outputHttpResponse(statusCode, statusMessage, headers, body);
}
   
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
processHttpRequest(http.method, http.uri, http.headers, http.body);