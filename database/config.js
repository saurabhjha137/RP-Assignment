const { Sequelize, DataTypes } = require('sequelize')

const DATABASE_NAME = 'todo-task-db'
const DATABASE_USERNAME = 'root'
const DATABASE_PASSWORD = 'Saurabh123'

// Create an instance of sequelize
const sequelize =
    new Sequelize(
        DATABASE_NAME,
        DATABASE_USERNAME,
        DATABASE_PASSWORD, {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql'
    })

module.exports = {sequelize};