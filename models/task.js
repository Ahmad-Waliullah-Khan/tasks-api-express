const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('task', {
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    status: Sequelize.STRING,
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
});

module.exports = Task;