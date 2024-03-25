'user strict';

module.exports = function (app) {
    var jsonku = require('./controller/api_scraping');

    app.route('/')
        .get(jsonku.index);

    app.route('/type/:kategory')
        .get(jsonku.get_by_kategory);

    app.route('/trending')
        .get(jsonku.trending_komik);

    app.route('/popular')
        .get(jsonku.popular);

    app.route('/update')
        .get(jsonku.update_terbaru);

    app.route('/search/:key')
        .get(jsonku.search);

    app.route('/detail/:url')
        .get(jsonku.detail);

    app.route('/baca/:url')
        .get(jsonku.baca);
}