var express      = require('express'),
    Datastore    = require('nedb');

var app, amazon, config, controllers;

// setup the app
app = express();

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
});

app.use(express.json());
app.use(express.urlencoded());

app.engine('jade', require('jade').__express)

controllers = {
    highstreet: new (require('highstreet').Controller),
    stores: {
        amazon: new (require('store/amazon').Controller),
        tesco: new (require('store/tesco').Controller)
    }
};

// index
app.get('/', function(req, res) {
    res.render('index.jade');
});

// stores
app.get('/highstreet', function(req, res) {
    controllers.highstreet.index(req, res);
});

// amazon
app.get('/store/amazon', function(req, res) {
    controllers.stores.amazon.index(req, res);
});

// threejs tests
app.get('/three/tests/cube', function(req, res) {
    res.render('three/tests/cube.jade');
});

app.listen(3000);
console.log('listening on port 3000');