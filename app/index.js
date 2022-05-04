
//const getTweets = require('./sockets/client');
const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const dgram = require('dgram');
const { ThingList, Thing, Services, Relationships, ThingListeningRunner } = require('./TweetList');
const HOST = '10.20.0.174';
const PORT = 1235;
const EXPRESSPORT = 8080;
require('./TweetList.js');


//-------------------Express.js-------------------//

app.use(cors());
app.use(express.json());

app.listen(EXPRESSPORT, () => {
    console.log(`live on ${EXPRESSPORT} and ${HOST}`);
});


app.get('/', async (req,res) => {
    res.send(thingList);
});

app.put('/app',async (req,res) => {
    
    fs.writeFile(req.body.name,req.body.content,function (err) {
        if (err) {
            console.log(err);
            res.status(400).send();
        }
    })
    res.status(200).send();

});

app.get('/app',async(req,res)=> {

    fs.readFile(req.body.name, (err,data) => {
        if (err) {
            console.error(err);
            res.status(400).send();
        }
        res.status(200).send(data);
    })
})

app.delete('/app',async(req,res) => {
    fs.rm(req.body.name, (err) => {
        if (err) {
            console.error(err);
            res.status(400).send();
        }
        res.status(200).send();
    })
})

app.put('/broadcast',async (req,res) => {
    const call = `{\"Tweet Type\" : \"${req.body.type}\", \"Thing ID\" : \"${req.body.thingID}\", \"Space ID\" : \"${req.body.spaceID}\", \"Service Name\" : \"${req.body.name}\", \"Service Inputs\" : \"(${req.body.inputs})\"}`

})


//----------------------------SOCKETS-------------------------//

const server = dgram.createSocket('udp4');
const thingList= new ThingList();
const thingListeningArr = [];
const seenThings=[];
let runner = false;
let oneTimeOnly = false;

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', async (msg, rinfo) => {
    let strMsg = String(msg);
    jsonMsg= await JSON.parse(strMsg);
    //console.log(jsonMsg['Thing ID']);
    if (true){
        if (jsonMsg['Tweet Type']==='Identity_Thing') {
            if(seenThings.includes(jsonMsg['Thing ID'])===true) {
                for (let i=0;i<thingListeningArr.length;i++)
                {
                    if (thingListeningArr[i].Id===jsonMsg['Thing ID']) {
                        thingListeningArr[i].oneTime=true;
                        console.log(`setting to true`);
                    }
                }
            }
            else {
                console.log(`setting up!`)
                seenThings.push(jsonMsg['Thing ID']);
                const thingListening = new ThingListeningRunner();
                thingListening.Id=jsonMsg['Thing ID'];
                thingListeningArr.push(thingListening);

                const thing = new Thing();
                thing.thingId = jsonMsg['Thing ID'];
                thing.thingIp=rinfo.address;
                thingList.things.push(thing);
                console.log(jsonMsg);
            }
        }
        /*
        else if (jsonMsg['Tweet Type']==='Identity_Thing'&&seenThings.findIndex(jsonMsg['Thing ID'])!==-1) {
            thingListeningArr[seenThings.findIndex(jsonMsg['Thing ID'])].oneTime=false;   oneTimeOnly=true;
        }
        */
        /*if (oneTimeOnly===false&&jsonMsg['Tweet Type']==='Identity_Thing') {
            const thing = new Thing();
            thing.thingId = jsonMsg['Thing ID'];
            thing.thingIp=rinfo.address;
            thingList.things.push(thing);
            console.log(jsonMsg);
        }*/
        if (seenThings.includes(jsonMsg['Thing ID'])===true&&jsonMsg['Tweet Type']==='Service') {
            console.log(thingListeningArr.length);
            let x;
            for (let i=0;i<thingListeningArr.length;i++)
            {
                console.log(thingListeningArr[i].oneTime)
                if (thingListeningArr[i].Id===jsonMsg['Thing ID']) {
                    x=i;
                }
            }
            if (thingListeningArr[x].oneTime===false) {
                console.log(`logging service`)
                const service = new Services();
                service.name=jsonMsg.Name;
                service.thingId=jsonMsg['Thing ID'];
                service.entityId=jsonMsg['Entity ID'];
                service.API=jsonMsg.API;
                service.keywords=jsonMsg.Keywords;
                thingList.things[x].services.push(service);
                //console.log(`Adding service to ${thingList.thing[x]}. ${thingListeningArr[x].oneTime}`)
            }
        }
        else if (seenThings.includes(jsonMsg['Thing ID'])!==false&&jsonMsg['Tweet Type']==='Relationship') {
            let x;
            for (let i=0;i<thingListeningArr.length;i++)
            {
                if (thingListeningArr[i].Id===jsonMsg['Thing ID']) {
                    x=i;
                }
            }
            if (thingListeningArr[x].oneTime===false) {
                const relationship = new Relationships();
                relationship.name=jsonMsg.Name;
                relationship.thingId=jsonMsg['Thing ID'];
                relationship.category=jsonMsg.Category;
                relationship.type=jsonMsg.Type;
                relationship.serviceA=jsonMsg['FS name'];
                relationship.serviceB=jsonMsg['SS name'];
                thingList.things[x].relationships.push(relationship);
            }
        }
    
    }
    //console.log(thingList.things.toString());
    
    //console.log(String(msg));
    
});

server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
    server.setBroadcast(true);
    server.setMulticastTTL(128);
    server.addMembership('232.1.1.1',HOST)
});

server.bind(PORT,HOST);
