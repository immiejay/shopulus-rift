var fs           = require('fs'),
    path         = require('path'),
    AmazonHelper = require('apac').OperationHelper;

var amazon;

// Read the config
fs.readFile(path.join('./config.json'), function(err, data) {
    if (err) {
        console.log('Could not read config file: ' + err);
        return;
    }

    config = JSON.parse(data);

    amazon = new AmazonHelper({
        awsId: config.stores.amazon.id,
        awsSecret: config.stores.amazon.secret,
        assocId: config.stores.amazon.associateTag
    });
});

var Controller = function() {

};

Controller.prototype.index = function(req, res) {
    if (! amazon) throw "Amazon API has not yet connected";

    amazon.execute('ItemSearch', {
        'SearchIndex': 'Books',
        'Keywords': 'nodejs',
        'ResponseGroup': 'ItemAttributes,Offers'
    }, function(response) {
        items = response.ItemSearchResponse.Items[0].Item;

        res.render('amazon/index.jade', {
            items: items
        });
    });
};

exports.Controller = Controller;