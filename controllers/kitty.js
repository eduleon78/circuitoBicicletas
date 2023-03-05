var Kitty = require('../models/kitty');

exports.kitty_list = function(req, res) {
    res.render('kittys/index', {kitys: Kitty.allKitys});
}

exports.kitty_create_get = function(req, res) {
    res.render('kittys/create')
}

exports.kitty_create_post = function(req, res) {
    var kity = new Kitty(req.body.code, req.body.nombre);
    Kitty.add(kity);

    res.redirect('/kittys');
}
