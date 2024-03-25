'user strict';

exports.succes = function (values, res) {
    var data = {
        'status': 200,
        'data': values
    }

    res.json(data);
    res.end();
}

exports.error = function (values, res) {
    var data = {
        'status': 400,
        'data': values
    }
    res.json(data);
    res.end();
}