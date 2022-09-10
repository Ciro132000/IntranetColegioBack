// Impotaciones necesarias
require('dotenv').config();
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../config/connection')


// Funciones del controlador
const allClassroom = async (req, res) => {
    try {
        // const data = await Aulas.findAll({
        //     attributes: {exclude: ['idAulas']}
        // })

        const [data, metadata ] = await sequelize.query(`SELECT Aulas.id, Aulas.grado, Aulas.seccion, Niveles.id As idNivel, Niveles.nombre as nivel FROM Aulas INNER JOIN Niveles ON Niveles.id = Aulas.idNivel`)
        res.send({data})
    } catch (error) {
        res.send({error})
    }
}

const scheduleClassroom = async (req, res) => {
    try {
        const [data, metadata ] = await sequelize.query(`SELECT Horarios.id, Horarios.dia, Horarios.horaInicio, Horarios.horaFinal, Secciones.codigo As seccion, Cursos.nombre as curso FROM Horarios INNER JOIN Secciones ON Secciones.id = Horarios.idSeccion INNER JOIN Cursos ON Cursos.id = Secciones.idCurso WHERE Horarios.idAula = ${req.query.idAula}`)
        res.send({data})
    } catch (error) {
        res.send({error})
    }
}

// Exportacion de funciones
module.exports = { allClassroom, scheduleClassroom }