let tweets = require('./TweetStore');
let dgram = require('dgram');
let HOST = '10.20.0.174';
let PORT = 1235;


const server = dgram.createSocket('udp4');

server.on('error', (err) => {
console.log(`server error:\n${err.stack}`);
server.close();
});

server.on('message', (msg, rinfo) => {
console.log(String(msg));
console.log(String(msg).localeCompare(tweets.tweets[0]));
tweets.tweets.push(String(msg));

});

server.on('listening', () => {
const address = server.address();
console.log(`server listening ${address.address}:${address.port}`);
server.setBroadcast(true);
server.setMulticastTTL(128);
server.addMembership('232.1.1.1',HOST)
});

server.bind(PORT,HOST);
