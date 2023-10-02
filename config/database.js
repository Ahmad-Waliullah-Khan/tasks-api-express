const Sequelize = require('sequelize');

module.exports = new Sequelize('DATABASE_NAME', 'DB_USERNAME', 'DB_PASSWORD', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});