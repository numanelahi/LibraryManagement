/**
 * Created by NumanElahi on 1/15/2017.
 */

var sequelize = require('../config/db_config');
var Sequelize = require('sequelize');
var Transaction = require('./Transaction');

var Book = sequelize.define('Book',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isAvailable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    last_trans_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

/*Book.sync({force: false});*/

module.exports = Book;