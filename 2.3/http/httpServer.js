var http = require('http');
var querystring = require('querystring');

var server = http.createServer().listen(3000);

server.on('request', function (req, res) {
    if (req.method == 'POST') {
        var body = '';
    }


    req.on('data', function (data) {
        body += data;
        const date = new Date();
        console.log("Time:" + date.getHours() + ":" + date.getMinutes() + " --IP:"+ req.socket.remoteAddress + ":" + req.socket.remotePort + ' --Requesting: ' + data);
    });

    req.on('end', function () {
        var post = querystring.parse(body);

        const date = new Date();
        console.log("Time:" + date.getHours() + ":" + date.getMinutes() + " --IP:"+ req.socket.remoteAddress + ":" + req.socket.remotePort + ' --Answer to client: ' + post.msg);

        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(post.msg);
    });
});

console.log('Listening on port 3000');


//console.log("Time:" + date.getHours() + ":" + date.getMinutes() + " --IP:" + '--Socket massage: ' + ': ' + data);



