var backuptweets = require('./backuptweets.js'),
    fs = require('fs');

backuptweets({
    "user" : "huskyr",
    "max" : 40,
    "debug" : true
}, function(tweets) {
    if (tweets) {
        fs.writeFile("tweets.json", tweets.json, function() {
            console.log('json file ready');
        });

        fs.writeFile("tweets.html", tweets.html, function() {
            console.log('html file ready');
        });
    } else {
        console.log("error");
    }
});