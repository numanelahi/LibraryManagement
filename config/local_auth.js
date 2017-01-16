/**
 * Created by NumanElahi on 1/15/2017.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Librarian = require('../entities/Librarian');

exports.configureStrategy = function(){
    passport.use(new LocalStrategy (function (username, password, done) {
        Librarian.findOne({
            where: { username: username }
        })
            .then(function(lib){
                if(!lib){
                    return done(null, false, {message: 'User doesn\'t exist'});
                }
                if(!lib.validatePassword(password)){
                    return done(null, false, {message: 'Invalid password!'});
                }
                return done(null, lib);
            },function(err){
                return done(err);
            });
    }));
};

exports.serialize = function () {
    passport.serializeUser(function(lib, done){
        done(null, lib.id);
    });
};

exports.deserialize = function () {
    passport.deserializeUser(function (id, done) {
        Librarian.findById(id).then(function(lib){
            done(null, lib);
        }, function (err) {
            done(err);
        });
    });
};

exports.isAuthenticated = function (req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.send("not authenticated");
};
