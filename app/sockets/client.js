let tweets = require('./TweetStore');
let dgram = require('dgram');
let ip = require('ip');
let HOST = '10.20.0.174';
let PORT = 1235;
const readTweets = new Promise((resolve,reject) => {
    const server = dgram.createSocket('udp4');

    server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
    });

    server.on('message', (msg, rinfo) => {
    console.log(String(msg).localeCompare(tweets.tweets[0]));
    if (tweets.tweets.length>1&&tweets.tweets[tweets.tweets.length-1].localeCompare(tweets.tweets[0])===0){
        server.close();
        resolve(tweets.tweets);
    }
    else {
        tweets.tweets.push(String(msg));
    }
    
    });

    server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
    server.setBroadcast(true);
    server.setMulticastTTL(128);
    server.addMembership('232.1.1.1',HOST)
    });

    server.bind(PORT,HOST);
    })

function getTweets() {
    return readTweets;
}
    
module.exports= getTweets;
// Prints: server listening 0.0.0.0:41234
