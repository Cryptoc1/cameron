/*

More info about why this code is laid out the way it is can be found here:
http://stackoverflow.com/questions/20238829/asynchronous-nodejs-module-exports

Yayyyyy, Async callbacks!

TODO:
    + Make checks for puncuation
        - Make sure a sentence doesn't end with a comma
        - If there's a quotation mark or opening parenthesis in the sentence, make sure it's closed.

    Other things to ponder...
    + Setup a system that lets users tell you if the sentence makes sense, then use that information to
        change the probabilty of certain words occuring after others. This would involve having to write
        our own chaining algorithm (http://www.soliantconsulting.com/blog/2013/02/title-generator-using-markov-chains)
    + Add the markov generated compliments to compliments.txt (I see exponential degration in the chain though)
    + Allow users to submit more compliments [, after validating with Sentimental,]  then write them to compliments.txt
*/

var fs = require('fs'),
    Markov = require('markovchain'),
    sentiment = require('Sentimental')

var chain, callback

// Manually read the file when the JS is loaded by node
readFile()

function readFile() {
    fs.readFile('./public/compliments.txt', 'utf8', function(err, data) {
        if (err) {
            // fuck
            console.error(err)
        } else {
            // `chain` is a "global" variable so that it doesn't have to be reconstructed every time we call cameron()
            chain = new Markov(data.toLowerCase())

            // This is only called if readFile() is "manually" executed on line 64
            if (typeof callback == 'function')
                callback(generateCompliment())
        }
    })
}

function generateCompliment() {
    var compliment = chain.start('you').end(4 + Math.floor(7 * Math.random())).process()

    // Make sure the sentence is generally positive
    if (sentiment.positivity(compliment).score > 3) {
        return compliment
    } else {
        return generateCompliment()
    }
}

module.exports = function(cb) {
    if (typeof chain != undefined) {
        // The chain is loaded, so use it
        cb(generateCompliment())
    } else {
        // The chain isn't loaded yet, so manually load it
        callback = cb
        readFile()
    }
}
