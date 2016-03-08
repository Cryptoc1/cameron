var express = require('express');
var app = express();

const compliment = require('./public/scripts/script.js');

app.use(express.static('public'));
app.set('view engine', 'hbs');

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
	res.send('use /compliment/random or /compliment/markov');
});

app.get('/compliment/random', function(req, res) {
	res.render('compliment', {compliment: compliment});
});

app.get('/compliment/markov', function(req, res) {
	res.render('compliment', {compliment: markov});
});

app.get('*', function(req, res) {
	res.send('dude what are you doing and how did you get here... <a href="/">go home</a>');
});

app.listen(process.env.PORT || 2267);
console.log('listening on port 2267');
