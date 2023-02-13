
var http = require('http');
var querystring = require('querystring');

let myMassage = 'hello world';
let start;

var postData = querystring.stringify({
    msg: myMassage
});

var options = {
    hostname: 'localhost',
    port: 3000,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
    }
};

var req = http.request(options, function (res) {
    start = new Date().getTime();
    res.setEncoding('utf8');

    res.on('data', function (chunk) {
        console.log('Answer:', chunk);
        if (myMassage == chunk) {
            console.log('Correct answer');
        } else {
            console.log('Incorrect answer');
        }
        const time = new Date().getTime() - start;
        console.log('Time process: ' + time + "ms");
    });

    res.on('end', function () {
        console.log('Disconected');
    });
});

req.on('error', function (e) {
    console.log('Problem with request:', e.message);
});

req.write(postData);
req.end();








// const https = require('http');


// let myMassage;
// let start;

// var options = {
//     hostname: 'localhost',
//     port: 8000,
//     path: '/',
//     method: 'GET'
// };

// let request = https.get(options, (res) => {
//     console.log('Connected');
//     start = new Date().getTime();
//     if (res.statusCode !== 200) {
//         console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
//         res.resume();
//         return;
//     }

//     res.on("data", data => {
//         console.log('Server Says : ' + data);
//         if (myMassage == data) {
//             console.log('Correct answer');
//         } else {
//             console.log('Incorrect answer');
//         }
//         const time = new Date().getTime() - start;
//         console.log('Time process: ' + time + "ms");
//     });

//     res.on('end', function (a) {
//         console.log('Response ENDED');
//     });

//     req.on('error', function(e) {
//         console.log('problem with request: ' + e.message);
//     });

// });

// request.end();

