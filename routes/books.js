/**
 * Created by NumanElahi on 1/16/2017.
 */

var Books = require('../entities/Books');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var condition = req.param('key') ? {where: {isAvailable: true}} : {};
    Books.findAll(condition)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            res.send("ERROR");
        });
});

router.post ('/', function (req, res, next) {
    Books.create(req.body)
        .then(function (data) {
            res.send('OK');
        });
});

router.param('id', function (req, res, next, id) {
    Books.destroy({where: {id: id}});
    next();
});


router.delete('/:id', function (req, res, next) {
    res.send("OK");
});


module.exports = router;