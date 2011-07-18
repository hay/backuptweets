var backuptweets = require('./backuptweets.js'),
    fs = require('fs');

backuptweets({
    "screen_name" : "huskyr",
    "max" : 40,
    "debug" : true
}, function(tweets) {
    if (tweets) {
        console.log(tweets);
        fs.writeFile("tweets.json", JSON.stringify(tweets), function() {
            console.log('ready');
        })
    } else {
        console.log("error");
    }
});