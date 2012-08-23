[![build status](https://secure.travis-ci.org/hay/backuptweets.png)](http://travis-ci.org/hay/backuptweets)
backuptweets - Back up your Twitter tweets with Node.js without oAuth
=====================================================================

Sure, the cloud is great, but you can never be sure if Twitter will get
bought by the evil empire, is secretly controlled by Ruport Murdoch or might
simply have a database crash sometime in the future.

Therefore, with the power of Node.js and this little module you can back up
your tweets for safety.

Note that the Twitter API has a maximum of 3.200 tweets to return. So if you're
a heavy tweeter you might want to run this module once in a while to make sure
no gaps are left in your history.

Usage
-----
Here's the contents of `example.js`:

    var backuptweets = require('backuptweets'),
        fs = require('fs');

    backuptweets({
        "user" : "huskyr",
        "debug" : "true"
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

API
---
    backuptweets(arguments, callback);

    'arguments' should be an object with the following properties:

      "user" - Your Twitter user name. Required.
      "debug" - Returns lots of debug information in node's console. Defaults to false
      "max" - Maximum number of tweets to fetch. Defaults to Twitter's maximum (3200)

    'callback' has one callback argument: an object with three properties:

      "json" - Contains your tweets as a JSON array
      "html" - A simple HTML page with your tweets
      "js" - The original Javascript array

Credits
-------
Copyright 2011 Hay Kranen. Code released under the MIT license (see LICENSE.txt)

* [github](http://www.github.com/hay)
* [website](http://www.haykranen.nl)
* [twitter](http://www.twitter.com/huskyr)
* [mail](mailto:hay@bykr.org)