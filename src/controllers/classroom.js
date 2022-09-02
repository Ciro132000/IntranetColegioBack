// Impotaciones necesarias
require('dotenv').config();
const { QueryTypes } = require('sequelize');
const fs =require('fs-extra')
const { sequelize } = require('../config/connection')

const { Aulas, Horario, Secciones, Niveles} = require('../sequelize/models')

// Funciones del controlador
const allClassroom = async (req, res) => {
    try {
        // const data = await Aulas.findAll({
        //     attributes: {exclude: ['idAulas']}
        // })

        const [data, metadata ] = await sequelize.query(`SELECT aulas.id, aulas.nombre, niveles.id As idNivel, niveles.nombre as nivel FROM aulas INNER JOIN niveles ON niveles.id = aulas.idNivel`)
        res.send({data})
    } catch (error) {
        res.send({error})
    }
}

const scheduleClassroom = async (req, res) => {
    try {
        const [data, metadata ] = await sequelize.query(`SELECT horarios.id, horarios.dia, horarios.horaInicio, horarios.horaFinal, secciones.codigo As seccion, cursos.nombre as curso FROM horarios INNER JOIN secciones ON secciones.id = horarios.idSeccion INNER JOIN cursos ON cursos.id = secciones.idCurso WHERE horarios.idAula = ${req.query.idAula}`)
        res.send({data})
    } catch (error) {
        res.send({error})
    }
}

// Exportacion de funciones
module.exports = { allClassroom, scheduleClassroom }