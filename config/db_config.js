/**
 * Created by NumanElahi on 1/15/2017.
 */

var Sequelize = require('sequelize');

var sequelize = new Sequelize('library', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

module.exports = sequelize;