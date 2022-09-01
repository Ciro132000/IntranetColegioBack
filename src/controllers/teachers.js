// Impotaciones necesarias
require('dotenv').config();
const { QueryTypes } = require('sequelize');

const fs =require('fs-extra')
const { sequelize } = require('../config/connection')

// Funciones del controlador
const mainFunction = (req, res) => {
    res.send({data:"Funcionando"})
}

// Exportacion de funciones
module.exports = { mainFunction }