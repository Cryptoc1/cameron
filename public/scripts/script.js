var fs = require('fs'),
    Markov = require('markovchain'),
    sentiment = require('Sentimental')

// Should we use Async file read?
function generateCompliment () {
    // Weird linking to the compliments.txt because this code is executed at the same level as index.js
    var chain = new Markov(fs.readFileSync('./public/compliments.txt', 'utf8'))

    /* TODO:
        + Have it start with :name on /compliment/:name
        + Make checks for puncuation
            - Make sure a sentence doesn't end with a comma
            - If there's a quotation mark or opening parenthesis in the sentence, make sure it's closed.
    */

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
