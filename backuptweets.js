var request = require('request'),
    async = require('async'),
    _ = require('underscore');

const API_COUNT_MAX = 20;

module.exports = function(args, cb) {
    var count = 0,
        pages = Math.floor(args.max / API_COUNT_MAX),
        tweets = [];

    function getUrl(page) {
        var url = ''.concat(
            'http://api.twitter.com/1/statuses/user_timeline.json',
            '?screen_name=' + args.screen_name,
            '&page=' + page,
            '&count=' + API_COUNT_MAX,
            '&trim_user=' + true,
            '&include_rts=1'
        );

        return url;
    }

    function log() {
        if (args.debug) {
            console.log.apply(this, arguments);
        }
    }

    // Create a series of callbacks for the requests
    var requests = [];
    for (var page = 1; page < pages + 1; page++) {
        (function(page) {
        requests.push(function(callback) {
            var url = getUrl(page);

            log("Fetching", url);
            log("Page", page);

            request(
                {
                    url : url
                },
                function(error, response, body) {
                    log("Got a response");

                    if (error) {
                        callback(error);
                    } else {
                        callback(null, JSON.parse(body));
                    }
                }
            )
        });
        })(page);
    }

    // Okay, run the requests
    async.series(requests, function(err, results) {
        if (err) {
            log("An error occured", err);
            cb(false);
        } else {
            // Mash it all together
            cb(_.union(results));
        }
    });
}