// Impotaciones necesarias
require('dotenv').config();
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../config/connection')

const { generateRandomString }  = require('../utils/shared')
const {Docentes, Usuarios} = require('../sequelize/models')
const { encrypt } = require('../utils/handlePassword');

// Funciones del controlador
const mainFunction = async (req, res) => {
    const data = await Docentes.findAll({
        attributes: {exclude: ['idDocente']}
    })
    res.send({data})
}

const allTeachers = async(req,res)=>{
    try {
        const [data, metadata] = await sequelize.query('SELECT Docentes.*, Niveles.nombre AS nivel FROM Docentes INNER JOIN Niveles ON Docentes.idNivel = Niveles.id ') 
        res.send({data})
    } catch (error) {
        res.send(error)
    }
}

const registerTeacher = async (req, res) => {
    try {
        let existCod = 0
        let cod = ''
        
        // Verificando si existe estudiante con mismo dni
        const existTeacher = await Docentes.findOne({
            where: {dni: req.body.dni},
            attributes: {exclude: ['idDocente']}
        }) 

        if(existTeacher === null){
            do {
                cod = generateRandomString(6,'D')
                existCod = await Docentes.findOne({
                    where: {codigo: cod},
                    attributes: {exclude: ['idDocente']}
                })  
            } while (existCod != null);

            const dni = req.body.dni

            const registerUsuario = {
                usuario:cod,
                contrasena:await encrypt(dni.toString()),
                idRol:2,
            }

            const dataUsuario = await Usuarios.create(registerUsuario)
    
            const dataDocente = {
                codigo: cod,
                correo: cod+'@abc.edu.pe',
                ...req.body,
                idUsuario: dataUsuario.id
            }
    
            const data = await Docentes.create(dataDocente)
    
            res.send({data, dataUsuario}) 
        }else{
            res.send({msg:`El docente con dni ${req.body.dni} ya se encuentra registrado en la institución`})
        }

    } catch (error) {
        res.send({error})
    }
}

const scheduleTeacher = async (req,res) => {
    try {
        const [data,metada] = await sequelize.query(`SELECT Horarios.id, Horarios.dia, Horarios.horaInicio, Horarios.horaFinal, Secciones.codigo As seccion, Cursos.nombre as curso FROM Horarios INNER JOIN Secciones ON Secciones.id = Horarios.idSeccion INNER JOIN Cursos ON Cursos.id = Secciones.idCurso INNER JOIN Docentes ON Docentes.id = Secciones.idDocente WHERE Secciones.idDocente = ${req.query.idDocente}`)
        res.send({data})
    } catch (error) {
        res.send({error})
    }
}

const sections = async (req, res) => {
    try {
        const [data,metada] = await sequelize.query(`SELECT Secciones.* , Cursos.idNivel, Cursos.nombre AS curso, Docentes.codigo AS codigoDocente, Docentes.nombre As nombreDocente, Niveles.nombre AS nivel FROM Secciones LEFT JOIN Docentes ON Secciones.idDocente = Docentes.id LEFT JOIN Cursos ON Secciones.idCurso = Cursos.id LEFT JOIN Niveles ON Cursos.idNivel = Niveles.id WHERE Docentes.id=${req.query.idDocente}`)
        res.send({data})
    } catch (error) {
        res.send({error})
    }
}

// Exportacion de funciones
module.exports = { mainFunction, registerTeacher, allTeachers, scheduleTeacher,sections }