var passport = require('passport');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/login',
    passport.authenticate('local', { successRedirect: '/librarian',
                                     failureRedirect: '/reject',
                                     failureFlash: false })
);

router.get('/reject', function (req, res, next) {
  res.json(null);
})

router.get('/librarian', function (req, res, next) {
  res.json(req.user);
});

module.exports = router;
