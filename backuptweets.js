var fs = require('fs'),
    request = require('request'),
    async = require('async'),
    mustache = require('mustache'),
    _ = require('underscore');

const API_COUNT_MAX = 200;

var args = {
    // Default options, will be overwritten in init with defaultArgs
    "max" : 3200,
    "debug" : false
};

function formatResults(results, cb) {
    htmlFormatResults(results, function(html) {
        cb({
            "html" : html,
            "json" : JSON.stringify(results),
            "js" : results
        });
    })
}

function getUrl(page) {
    var url = ''.concat(
        'http://api.twitter.com/1/statuses/user_timeline.json',
        '?screen_name=' + args.user,
        '&page=' + page,
        '&count=' + API_COUNT_MAX,
        '&trim_user=' + true,
        '&include_rts=1'
    );

    return url;
}

function htmlFormatResults(results, cb) {
    var view = {
        "user" : args.user,
        "tweets" : results
    };

    fs.readFile(__dirname + "/htmlview.html", "utf-8", function(err, data) {
        var html = mustache.to_html(data, view);
        cb(html);
    });
}

function log() {
    if (args.debug) {
        console.log.apply(this, arguments);
    }
}

function init(initArgs, cb) {
    args = _.extend(args, initArgs);

    var requests = [],
        pages = Math.ceil(args.max / API_COUNT_MAX);

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
            // Mash all queries together
            results = _.union(results);
            formatResults(results, function(finalResults) {
                cb(finalResults);
            });
        }
    });
}

module.exports = init;