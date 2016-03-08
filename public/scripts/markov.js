var fs = require('fs'),
    Markov = require('markovchain')

var chain = new Markov(fs.readFileSync('../compliments.txt', 'utf8'))

console.log(chain.start('You').end(8).process())
