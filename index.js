var express = require('express');
var app = express();

// const compliment = require('scripts/script.js');

app.use(express.static('public'));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
	res.render('index', {title: 'Cameron, the friendly API.'});
});

app.get('/compliment', function(req, res) {
	res.render('compliment', {compliment: 'compliments are on their way!'});
});

app.listen(2267);
console.log('listening on port 2267');