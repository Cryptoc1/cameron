/* TODO:
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

readFile()

function readFile() {
    fs.readFile('./public/compliments.txt', 'utf8', function(err, data) {
        if (err) {
            console.error(err)
        } else {
            chain = new Markov(data.toLowerCase())

            if (typeof callback == 'function')
                callback(generateCompliment())
        }
    })
}

function generateCompliment() {
    var compliment = chain.start('you').end(4 + Math.floor(7 * Math.random())).process()
    if (sentiment.positivity(compliment).score > 3) {
        return compliment
    } else {
        return generateCompliment()
    }
}

module.exports = function(cb) {
    if (typeof chain != undefined) {
        cb(generateCompliment())
    } else {
        callback = cb
        readFile()
    }
}
