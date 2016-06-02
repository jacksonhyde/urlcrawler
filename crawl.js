var c = require("simplecrawler");
var crawler = c.crawl("http://you.url.here");
var fs = require('fs');

crawler.interval = 50;

crawler.addFetchCondition(function(parsedURL, queueItem) {
    return !parsedURL.path.match(/\.jpg|.png|.gif|.js|.css|.pdf/gi);
});

var file = fs.createWriteStream('urls.txt');

crawler.on("fetchcomplete", function(queueItem) {
    file.write(queueItem.url + '\n');
    console.log("Completed fetching resource:", queueItem.url);
});

crawler.on("complete", function() {
    file.end();
})
