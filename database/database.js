const Sequelize = require('sequelize');
const connection = new Sequelize('pergunta', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;