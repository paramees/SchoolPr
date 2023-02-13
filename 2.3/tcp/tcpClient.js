const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
})

let myMassage;
let start;

const net = require('net');
const { stdout } = require("process");
const client = new net.Socket();
const port = 7070;
const host = '127.0.0.1';
client.connect(port, host, function() {
    console.log('Connected');
    readline.question("Massage to server:", massage => {
        myMassage = massage;
        start = new Date().getTime();
        client.write(massage);
    })
});

client.on('data', function(data) {
    console.log('Server Says : ' + data);
    if (myMassage == data) {
        console.log('Correct answer');
    } else {
        console.log('Incorrect answer');
    }
    const time = new Date().getTime() - start;
    console.log('Time process: ' + time + "ms");
});

client.on('close', function() {
    console.log('Connection closed');
});