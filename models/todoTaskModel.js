const { DataTypes } = require('sequelize');
const { sequelize } = require("../database/db.js");


// Define the student model that creates a table in the `Todo task DB`
const Task = sequelize.define('TaskList', {
    taskName: DataTypes.STRING,
    taskID: DataTypes.INTEGER,
    isTaskCompleted: DataTypes.BOOLEAN
})


module.exports = {Task};