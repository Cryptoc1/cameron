var fs = require('fs'),
    Markov = require('markovchain'),
    sentiment = require('Sentimental')

/* TODO:
    + Have it start with :name on /compliment/:name
    + Make checks for puncuation
        - Make sure a sentence doesn't end with a comma
        - If there's a quotation mark or opening parenthesis in the sentence, make sure it's closed.

    Other things to ponder...
    + Use Async file reads
    + Setup a system that lets users tell you if the sentence makes sense, then use that information to
        change the probabilty of certain words occuring after others.
    + Add the markov generated compliments to compliments.txt (I see exponential degration in the chain though)
    + Allow users to submit more compliments [, after validating with Sentimental,]  then write them to compliments.txt
*/

function generateCompliment () {
    // Weird linking to the compliments.txt because this code is executed at the same level as index.js
    var chain = new Markov(fs.readFileSync('./public/compliments.txt', 'utf8'))

    // Compliments will be about 4-6 words long
    var compliment = chain.start('You').end(4 + Math.floor(6 * Math.random())).process()

    if (sentiment.positivity(compliment).score > 3) {
        return compliment
    } else {
        return generateCompliment()
    }
}

module.exports = function() {
    return generateCompliment()
}
