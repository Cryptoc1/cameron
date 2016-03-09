var fs = require('fs'),
    sentiment = require('Sentimental')

var callback

var startwords = [],
    chain = {},
    terminals = {}

readFile()

function choice(arr) {
    return arr[Math.floor(arr.length * Math.random())]
}

function readFile() {
    fs.readFile('./public/compliments.txt', 'utf8', function(err, data) {
        if (err) {
            console.error(err)
        } else {
            var lines = data.toLowerCase().split('\n')
            generateChain(lines)

            if (typeof callback == 'function') {
                callback(generateCompliment())
            }
        }
    })
}

function generateChain(lines) {
    for (var i = 0; i < lines.length; i++) {
        var words = lines[i].split(' ')
        terminals[words[words.length - 1]] = true
        startwords.push(words[0])
        for (var j = 0; j < words.length; j++) {
            if (chain.hasOwnProperty(words[j])) {
                chain[words[j]].push(words[j + 1])
            } else {
                chain[words[j]] = [words[j + 1]]
            }
        }
    }
}

function generateCompliment() {
    var length = 4 + Math.floor(6 + Math.random())
    word = choice(startwords)
    var compliment = [word]
    while (chain.hasOwnProperty(word)) {
        var nextWords = chain[word]
        word = choice(nextWords)
        compliment.push(word)
        if (compliment.length > length && terminals.hasOwnProperty(word)) break
    }
    if (compliment.length < length) return generateCompliment()

    compliment = compliment.join(' ')
    if (sentiment.positivity(compliment).score < 4) {
        return generateCompliment()
    } else {
        return compliment
    }
}

module.exports = function(cb) {
    if (typeof chain != undefined) {
        var comp = generateCompliment()
        cb(comp)
    } else {
        callback = cb
        readFile()
    }
}
