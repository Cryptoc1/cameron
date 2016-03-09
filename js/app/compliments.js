var Markov, compliments, fs, markovCompliment, randomCompliment, sentiment;

var fs = require('fs');
var Markov = require('markovchain');
var sentiment = require('Sentimental');

var compliments = fs.readFileSync('./public/compliments.txt', 'utf8');


/* TODO:
    + Have it start with :name on /compliment/:name
    + Make checks for puncuation
        - Make sure a sentence doesn't end with a comma
        - If there's a quotation mark or opening parenthesis in the sentence, make sure it's closed.

    Other things to ponder...
    + Use Async file reads
    + Setup a system that lets users tell you if the sentence makes sense, then use that information to
        change the probabilty of certain words occuring after others. This would involve having to write
        our own chaining algorithm (http://www.soliantconsulting.com/blog/2013/02/title-generator-using-markov-chains)
    + Add the markov generated compliments to compliments.txt (I see exponential degration in the chain though)
    + Allow users to submit more compliments [, after validating with Sentimental,]  then write them to compliments.txt
 */

random = function() {
  var c = compliments.split("\n")
  return c[Math.floor(Math.random() * c.length)];
};

markov = function() {
  var chain, compliment;
  chain = new Markov(compliments);
  compliment = chain.start('You').end(4 + Math.floor(6 * Math.random())).process();
  if (sentiment.positivity(compliment).score > 3) {
    return compliment;
  } else {
    return markov();
  }
};

console.log(markov())
console.log(random())

module.exports.markov = markov();
module.exports.random = random();
