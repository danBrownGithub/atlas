let tweets = require('./client')

setInterval(broadcastNew, 3000);
 
function broadcastNew() {
    console.log(tweets.tweets.toString());
}