/**
 * Created by NumanElahi on 1/16/2017.
 */

var Transaction = require('../entities/Transaction');
var Books = require('../entities/Books');
var express = require('express');
var router = express.Router();

router.post('/issue', function (req, res, next) {
    Transaction.create({
        user_id: req.body.user.id,
        book_id: req.body.book.id,
        trans_type: 'borrow'
    }).then(function (data) {
        var trans = data.get({plain: true});
        Books.update({isAvailable: false, last_trans_id: trans.id},{where: {id: req.body.book.id}})
            .then(function () {
                res.send("OK");
            });
    });
});

router.post('/return', function (req, res, next) {
    Transaction.findOne({where: {id: req.body.transId}})
        .then(function (trans) {
           Transaction.create({
               book_id: trans.book_id,
               user_id: trans.user_id,
               due_date: trans.due_date,
               trans_type: trans.trans_type
           })
               .then(function (data) {
                   var trans = data.get({plain: true})
                   Books.update({isAvailable: true, last_trans_id: trans.id},{where: {id: req.body.bookId}});
                   res.send("OK");
               });
        });
});

module.exports = router;