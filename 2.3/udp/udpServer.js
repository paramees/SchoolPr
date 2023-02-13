const UDP = require('dgram');

const server = UDP.createSocket('udp4');

const port = 2222;

server.on('listening', () => {
    // Server address it’s using to listen

    const address = server.address();

    console.log('Listining to ', 'Address: ', address.address, 'Port: ', address.port);
});

server.on('message', (message, info) => {

    const date = new Date();
    console.log("Time:" + date.getHours() + ":" + date.getMinutes() + "IP: " + info.address + ':' + info.port + '  Message from client: ' + message.toString());

    const response = Buffer.from(message.toString());

    //sending back response to client

    server.send(response, info.port, info.address, (err) => {
        if (err) {
            console.error('Failed to send response !!');
        } else {
            console.log("Time:" + date.getHours() + ":" + date.getMinutes() + "IP: " + info.address + ':' + info.port + '  Answer to client: ' + response);
        }
    });
});

server.bind(port);


//console.log("Time:" + date.getHours() + ":" + date.getMinutes() + ' CLOSED: ' + sock.remoteAddress +':'+ sock.remotePort);
