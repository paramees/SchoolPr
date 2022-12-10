function readHttpLikeInput(){
    return `GET /sum?nums=1,2,3 HTTP/1.1
    Host: student.shpp.me`
}
   
let contents = readHttpLikeInput();
   
function outputHttpResponse(statusCode, statusMessage, headers, body) {
    console.log(
    "HTTP/1.1 " + statusCode + " " + statusMessage +"\n" + headers + "\n\n" +body);
}
   
function processHttpRequest($method, $uri, $headers, $body) {
    // ... проанализировать входящие данные, вычислить результат
    // и специальной командой красиво вывести ответ
    console.log($uri)
    let statusCode = "";
    let statusMessage = "";
    let headers = "";
    let body = "";
    if ($method == "GET") {
        if ($uri.startsWith("/sum")) {
            if ($uri.startsWith("/sum?nums=")) {
                statusCode = "200"
                statusMessage = "OK"
                body = $uri.split("=")[1].split(",").reduce((acc, num) => acc+= num*1, 0).toString()
                headers = 
                "Date: " + Date() +"\nServer: Apache/2.2.14 (Win32)\nContent-Length: " + body.length + "\nConnection: Closed\nContent-Type: text/html; charset=utf-8";
            } else {
                statusCode = "400"
                statusMessage = "Bad Request"
                headers = "Date: " + Date() +"\nServer: Apache/2.2.14 (Win32)\nContent-Length: 11\nConnection: Closed\nContent-Type: text/html; charset=utf-8";
                body = "Bad Request"
            }
        } else {
            statusCode = "404"
                statusMessage = "Not Found"
                headers = "Date: " + Date() +"\nServer: Apache/2.2.14 (Win32)\nContent-Length: 9\nConnection: Closed\nContent-Type: text/html; charset=utf-8";
            body = "not found"
        }
    } else {
        statusCode = "400"
        statusMessage = "Bad Request"
        headers = "Date: " + Date() +"\nServer: Apache/2.2.14 (Win32)\nContent-Length: 11\nConnection: Closed\nContent-Type: text/html; charset=utf-8";
        body = "Bad Request"
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