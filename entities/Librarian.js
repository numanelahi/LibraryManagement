/**
 * Created by NumanElahi on 1/15/2017.
 */

var sequelize = require('../config/db_config');
var Sequelize = require('sequelize');
var bcrypt = require('bcrypt-nodejs');

var Librarian = sequelize.define('Librarian', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.TEXT,
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
},
{
    instanceMethods: {
        validatePassword: function (password) {
            return bcrypt.compareSync(password, this.password);
        }
    }
}
);

Librarian.beforeCreate(function (lib) {
    lib.password = bcrypt.hashSync(lib.password, bcrypt.genSaltSync(10), null);
});


/*Librarian.sync({force:false}).then(function () {
    return Librarian.create({
        username: 'lib007',
        name: 'Librarian',
        password: 'books',
        email: 'library@local.com',
        contactNo: '0123456789'
    }).then(function (user) {
        console.log("OK");
    });
});*/

module.exports = Librarian;