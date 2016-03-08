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
	res.render('compliment', {compliment: compliment});
});

app.listen(2267);
console.log('listening on port 2267');