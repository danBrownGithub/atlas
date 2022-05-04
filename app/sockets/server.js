let ip = require('ip');
let HOST = ip.address();
let PORT = 1235;


var news = [
    "Borussia Dortmund wins German championship",
    "Tornado warning for the Bay Area",
    "More rain for the weekend",
    "Android tablets take over the world",
    "iPad2 sold out",
    "Nation's rappers down to last two samples"
 ];
 
 let dgram = require('dgram'); 
 let server = dgram.createSocket("udp4"); 

server.bind( () => {
    server.setBroadcast(true);
    server.setMulticastTTL(128);
    server.addMembership('230.1.1.1');
})
/*
 server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
    server.setBroadcast(true);
    server.setMulticastTTL(128);
    server.addMembership('232.1.1.1',HOST)
  });*/
 
 setInterval(broadcastNew, 3000);
 
 function broadcastNew() {
     var message = "{\"Tweet Type\" : \"Identity_Thing\", \"Thing ID\" : \"G1_Thing\", \"Space ID\" : \"G!_smart_space\"}";
     server.send(message, 0, message.length, 1235, '230.1.1.1');
     console.log("Sent " + message + " to the wire...");
     //server.close();
 }