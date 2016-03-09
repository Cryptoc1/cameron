var express = require('express'),
    app = express(),
    cameron = require('./backend/cameron.js');

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
});

app.get('/compliment/markov', function(req, res) {
    // Keeping this for backwards compatibility (Boy, I do sound smart, huh??)
    cameron(function(compliment) {
        res.render('compliment', {
            compliment: compliment
        })
    })
});

app.get('/api/v1/compliment', function(req, res) {
    cameron(function(compliment) {
        res.send(compliment)
    })
})

app.get('*', function(req, res) {
    res.send('dude what are you doing and how did you get here... <a href="/">go home</a>');
});

var server = app.listen(process.env.PORT || 2267, function() {
    console.log("Listening at: http://0.0.0.0:%d", server.address().port)
});
