var fs           = require('fs'),
    path         = require('path'),
    express      = require('express'),
    AmazonHelper = require('apac').OperationHelper,
    Datastore    = require('nedb');

var app, amazon, config, controllers;

// Read the config
fs.readFile(path.join(__dirname + '/config.json'), function(err, data) {
    if (err) {
        console.log('Could not read config file: ' + err);
        return;
    }

    config = JSON.parse(data);

    amazon = new AmazonHelper({
        awsId: config.amazon.id,
        awsSecret: config.amazon.secret,
        assocId: config.amazon.associateTag
    });
});

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
    highstreet: require('hightstreet/controller'),
    stores: {
        amazon: require('store/amazon/controller'),
        tesco: require('store/tesco/controller')
    }
};

// index
app.get('/', function() {
    res.render('index.jade');
});

// stores
app.get('highstreet', function(req, res) {
    controllers.highstreet.index(req, res);
});

// amazon
app.get('store/amazon', function() {
    controllers.stores.amazon.index(req, res);
});