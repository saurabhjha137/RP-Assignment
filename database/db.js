const { Sequelize, DataTypes } = require('sequelize')
const { DATABASE_NAME,
    DATABASE_USERNAME,
    DATABASE_PASSWORD } = require('./config')

// Create an instance of sequelize
const sequelize =
    new Sequelize(
        DATABASE_NAME,
        DATABASE_USERNAME,
        DATABASE_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql'
    })

module.exports = {sequelize};