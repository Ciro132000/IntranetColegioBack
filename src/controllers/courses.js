// Impotaciones necesarias
require('dotenv').config();
const { QueryTypes } = require('sequelize');

const { sequelize } = require('../config/connection')

const {Cursos} = require('../sequelize/models')

// Funciones del controlador
const mainFunction = (req, res) => {
    res.send({data:"Funcionando"})
}

const allCourses = async (req, res) => {
    try {
        const data = await Cursos.findAll({
            attributes: {exclude: ['idCurso']}
        });
        res.send({data})
    } catch (error) {
        res.send({error})
    }
}

// Exportacion de funciones
module.exports = { mainFunction, allCourses }