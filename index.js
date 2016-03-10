var express = require('express'),
    app = express(),
    exphbs = require('express-handlebars'),
    favicon = require('serve-favicon'),
    cameron = require('./js/app/cameron.js'),
    cameronNormal = require('./public/scripts/script.js')

var comp = require('./js/app/comp.js')

String.prototype.capitalizeFirstCharacter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

app.use(express.static('public'));
app.use(favicon(__dirname + '/public/favicon.ico'));

app.engine('handlebars', exphbs({
    defaultLayout: 'default'
}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
    res.render('index', {
        home: true
    });
});

app.get('/about', function(req, res) {
    res.render('about', {
        about: true
    });
});

app.get('/docs', function(req, res) {
    res.render('docs', {
        docs: true
    })
});

app.get('/compliment', function(req, res) {
    cameron(function(compliment) {
        if (req.query.name) {
            compliment = req.query.name.capitalizeFirstCharacter() + ", " + compliment
        } else {
            compliment = compliment.capitalizeFirstCharacter()
        }
        if (req.query.format === "json") {
            res.json({
                compliment: compliment
            })
        } else {
            res.render('compliment', {
                compliment: compliment
            })
        }
    })
});

app.get('/compliment/:name', function(req, res) {
    cameron(function(compliment) {
        var name = req.params.name
        compliment = name.capitalizeFirstCharacter() + ", " + compliment
        if (req.query.format === "json") {
            res.json({
                compliment: compliment
            })
        } else {
            res.render('compliment', {
                compliment: compliment
            })
        }
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
    if (req.query.type) {
        var name = ""
        if (req.query.name) {
            name = req.query.name + ", "
        }
        if (req.query.type.toLowerCase() == "markov") {
            cameron(function(compliment) {
                res.send((name + compliment).capitalizeFirstCharacter())
            })
        } else if (req.query.type.toLowerCase() == "normal") {
            res.send((name + cameronNormal()).capitalizeFirstCharacter())
        } else {
            res.send("Unkown <em>type</em> value")
        }
    } else {
        res.send("Must use query operator ?type=\<<em>markov</em>|<em>normal</em>\>")
    }
})

app.get('/testing', function(req, res) {
    // This endpoint is for testing code
    comp(function(compliment) {
        res.send(compliment)
    })
})

app.get('*', function(req, res) {
    res.send('dude what are you doing and how did you get here... <a href="/">go home</a>');
});

var server = app.listen(process.env.PORT || 2267, function() {
    console.log("Listening at: http://0.0.0.0:%d", server.address().port)
});
