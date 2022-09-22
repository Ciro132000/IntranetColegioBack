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

// Buscar por aula
const searchCourses = async (req, res) => {
    try {
        const [data, metadata] = await sequelize.query(`SELECT Secciones.* , Cursos.idNivel, Cursos.nombre AS curso, Docentes.codigo AS codigoDocente, Docentes.nombre As nombreDocente, Niveles.nombre AS nivel FROM Secciones LEFT JOIN Docentes ON Secciones.idDocente = Docentes.id LEFT JOIN Cursos ON Secciones.idCurso = Cursos.id LEFT JOIN Niveles ON Cursos.idNivel = Niveles.id INNER JOIN Aulas ON Secciones.idAula = Aulas.id WHERE Aulas.id=${req.query.idAula}`)
        res.send({data})
    } catch (error) {
        res.send({error})
    }
}

// Exportacion de funciones
module.exports = { mainFunction, allCourses, searchCourses }