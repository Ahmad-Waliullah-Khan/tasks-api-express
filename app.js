const express = require('express');
const bodyParser = require('body-parser');
const tasksRouter = require('./routes/tasks');
const sequelize = require('./config/database');
require('dotenv').config();


const app = express();

app.use(bodyParser.json());
app.use('/tasks', tasksRouter);

sequelize.sync().then(() => {
    console.log('Database is connected.');

    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});

module.exports = app;