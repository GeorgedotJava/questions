const Sequelize = require('sequelize');
const connection = require('../database/database');


const Pergunta = connection.define('pergunta', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },

    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// Caso a tebela exista ela não será recriada
Pergunta.sync({force: false})