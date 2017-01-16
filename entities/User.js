/**
 * Created by NumanElahi on 1/15/2017.
 */

var sequelize = require('../config/db_config');
var Sequelize = require('sequelize');
var Transaction = require('./Transaction');

var User = sequelize.define('User',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    contactNo : {
        type: Sequelize.STRING,
        allowNull: false
    }
});



/*User.sync({force: true}).then(function () {
    return User.create({
        username: 'user001',
        name: 'BookWorm',
        email: 'bookworm@lib.com',
        contactNo: '9876543210'
    });
});*/

module.exports = User;