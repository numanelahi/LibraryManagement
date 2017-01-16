var User = require('../entities/User');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.findAll()
      .then(function (data) {
        res.json(data);
      });
});

module.exports = router;
