<<<<<<< HEAD
var express = require('express'),
    app = express(),
    cameron = require('./backend/cameron.js');
=======
var express = require('express');
var app = express();

const compliment = require('./js/app/compliments.js');
>>>>>>> 153b8ce963a29ff6ba7d5fb98855e3a2866ce13c

app.use(express.static('public'));
app.set('view engine', 'hbs');

String.prototype.capitalizeFirstCharacter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/about', function(req, res) {
    res.render('about');
});

app.get('/docs', function(req, res) {
    res.render('docs')
});

app.get('/compliment', function(req, res) {
<<<<<<< HEAD
    cameron(function(compliment) {
		if (req.query.name) {
			compliment = req.query.name.capitalizeFirstCharacter() + ", " + compliment
		} else {
			compliment = compliment.capitalizeFirstCharacter()
		}
        res.render('compliment', {
            compliment: compliment
        })
    })
});

app.get('/compliment/:name', function(req, res) {
    cameron(function(compliment) {
		var name = req.params.name
        res.render('compliment', {
            compliment: name.capitalizeFirstCharacter() + ", " + compliment
        })
    })
=======
	res.send('use /compliment/random or /compliment/markov');
});

app.get('/compliment/random', function(req, res) {
	res.render('compliment', {compliment: compliment.random});
});

app.get('/compliment/markov', function(req, res) {
	res.render('compliment', {compliment: compliment.markov});
});

app.get('*', function(req, res) {
	res.send('dude what are you doing and how did you get here... <a href="/">go home</a>');
>>>>>>> 153b8ce963a29ff6ba7d5fb98855e3a2866ce13c
});

app.get('/api/v1/compliment', function(req, res) {
    cameron(function(compliment) {
        res.send(compliment)
    })
})

var server = app.listen(process.env.PORT || 2267, function() {
    console.log("Listening at: http://0.0.0.0:%d", server.address().port)
});
