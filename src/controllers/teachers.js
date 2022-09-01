// Impotaciones necesarias
require('dotenv').config();
const { QueryTypes } = require('sequelize');
const fs =require('fs-extra')
const { sequelize } = require('../config/connection')

const {Estudiantes, Docentes, Secciones, Cursos} = require('../sequelize/models')

// Funciones del controlador
const mainFunction = async (req, res) => {
    const Data = await Docentes.findAll({
        attributes: {exclude: ['idDocente']}
    })
    res.send({Data})
}

const registerTeacher = (req, res) => {
    res.send({data:'hola'})
}

// Exportacion de funciones
module.exports = { mainFunction }