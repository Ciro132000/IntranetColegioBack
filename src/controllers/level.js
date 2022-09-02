// Impotaciones necesarias
require('dotenv').config();
const { QueryTypes } = require('sequelize');

const { sequelize } = require('../config/connection')

const {Niveles} = require('../sequelize/models')

// Funciones del controlador
const allLevels = async (req, res) => {
    try {
        const data = await Niveles.findAll({
            attributes: {exclude: ['idNivel']}
        });
        res.send({data})
    } catch (error) {
        res.send({error})
    }
}

// Exportacion de funciones
module.exports = { allLevels }