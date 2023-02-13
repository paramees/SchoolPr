const net = require('net');
const port = 7070;
const host = '127.0.0.1';

const server = net.createServer(function(sock) {
    const date = new Date();
    console.log("Time:" + date.getHours() + ":" + date.getMinutes() + ' CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    

    sock.on('data', function(data) {
        const date = new Date();
        console.log("Time:" + date.getHours() + ":" + date.getMinutes() + " --IP:" + sock.remoteAddress + '--Socket massage: ' + ': ' + data);
        sock.write(data);
    });

    sock.on('close', function(data) {
        console.log("Time:" + date.getHours() + ":" + date.getMinutes() + ' CLOSED: ' + sock.remoteAddress +':'+ sock.remotePort);
    });

    sock.on("error", function(err) {
        console.log('Socket err: ' + err);
    })
}).listen(port, host);

console.log('Server listening on ' + host +':'+ port);
