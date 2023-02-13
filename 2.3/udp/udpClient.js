const UDP = require('dgram');

const client = UDP.createSocket('udp4');

const port = 2222;

const hostname = 'localhost';

let myMassage = "hello world";
let start;

client.on('message', (message, info) => {
    console.log('My massage:', myMassage);

    console.log('Message from server:', message.toString());

    if (myMassage == message.toString()) {
        console.log('Correct answer');
    } else {
        console.log('Incorrect answer');
    }
    const time = new Date().getTime() - start;
    console.log('Time process: ' + time + "ms");
});

const packet = Buffer.from(myMassage);

client.send(packet, port, hostname, (err) => {
    start = new Date().getTime();
    if (err) {
        console.error('Failed to send packet !!');
    } else {
        console.log('Packet send !!');
    }
});

