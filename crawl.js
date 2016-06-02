var c = require("simplecrawler");
var crawler = c.crawl("http://put.your.url.here/");
var fs = require('fs');


crawler.interval = 50;

crawler.addFetchCondition(function(parsedURL, queueItem) {
    return !parsedURL.path.match(/\.pdf/gi);
});

crawler.addFetchCondition(function(parsedURL, queueItem) {
    return !parsedURL.path.match(/\.jpg/gi);
});

crawler.addFetchCondition(function(parsedURL, queueItem) {
    return !parsedURL.path.match(/\.png/gi);
});

crawler.addFetchCondition(function(parsedURL, queueItem) {
    return !parsedURL.path.match(/\.gif/gi);
});

crawler.addFetchCondition(function(parsedURL, queueItem) {
    return !parsedURL.path.match(/\.css/gi);
});

crawler.addFetchCondition(function(parsedURL, queueItem) {
    return !parsedURL.path.match(/\.js/gi);
});

var urls = [];
var file = fs.createWriteStream('urls.txt');

crawler.on("fetchcomplete", function(queueItem) {
    // urls.push(queueItem.url);
    file.write(queueItem.url + '\n');
    console.log("Completed fetching resource:", queueItem.url);
});

crawler.on("complete", function() {
    file.end();
})
