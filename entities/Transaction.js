/**
 * Created by NumanElahi on 1/16/2017.
 */

var sequelize = require('../config/db_config');
var Sequilize = require('sequelize');
var User = require('./User');
var Book = require('./Books');

var Transaction = sequelize.define('Transaction', {
    id: {
        type: Sequilize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    book_id:{
        type: Sequilize.INTEGER,
        allowNull: false
    },
    user_id:{
        type: Sequilize.INTEGER,
        allowNull: false
    },
    due_date: {
        type: Sequilize.DATE,
        allowNull: false,
        defaultValue: getDueDate()
    },
    trans_type: {
        type: Sequilize.STRING,
        allowNull: false
    }
});

/*Transaction.hasOne(User, {as: "User"});
Transaction.hasOne(Book, {as: "Book"});*/

function getDueDate () {
    var today = new Date();
    today.setDate(today.getDate() + parseInt(10));
    return today;
}

/*Transaction.sync({force:true});*/

module.exports = Transaction;