var amazon = require('store/amazon/amazon');

var controller = function() {

};

controller.prototype.index = function(req, res) {
    amazon.execute('ItemSearch', {
        'SearchIndex': 'Books',
        'Keywords': 'nodejs',
        'ResponseGroup': 'ItemAttributes,Offers'
    }, function(results) {
        items = response.ItemSearchResponse.Items[0].Item;

        res.render('index.jade', {
            items: items
        });
    });
}