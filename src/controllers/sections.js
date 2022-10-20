// Impotaciones necesarias
require('dotenv').config();
const { QueryTypes } = require('sequelize');

const { sequelize } = require('../config/connection')
const { generateRandomString }  = require('../utils/shared')
const { Secciones, Horario } = require('../sequelize/models')

// Funciones del controlador
const mainFunction = async (req, res) => {
    try {
        const [data, metadata] = await sequelize.query('SELECT Secciones.* , Cursos.idNivel, Docentes.codigo AS codigoDocente, Docentes.nombre As nombreDocente, Niveles.nombre AS nivel FROM Secciones LEFT JOIN Docentes ON Secciones.idDocente = Docentes.id LEFT JOIN Cursos ON Secciones.idCurso = Cursos.id LEFT JOIN Niveles ON Cursos.idNivel = Niveles.id')
        res.send({data})
    } catch (error) {
        res.send(error)
    }
}

const searchSection = async (req, res) => {
    try {
        if(req.query.idSection){
            const [data, metadata] = await sequelize.query(`SELECT Secciones.* , Cursos.idNivel, Cursos.nombre AS curso, Docentes.codigo AS codigoDocente, Docentes.nombre As nombreDocente, Niveles.nombre AS nivel FROM Secciones LEFT JOIN Docentes ON Secciones.idDocente = Docentes.id LEFT JOIN Cursos ON Secciones.idCurso = Cursos.id LEFT JOIN Niveles ON Cursos.idNivel = Niveles.id WHERE Secciones.id=${req.query.idSection}`)
            res.send({data})
        }
        else if(req.query.codigo){
            const [data, metadata] = await sequelize.query(`SELECT Secciones.* , Cursos.idNivel, Cursos.nombre AS curso, Docentes.codigo AS codigoDocente, Docentes.nombre As nombreDocente, Niveles.nombre AS nivel FROM Secciones LEFT JOIN Docentes ON Secciones.idDocente = Docentes.id LEFT JOIN Cursos ON Secciones.idCurso = Cursos.id LEFT JOIN Niveles ON Cursos.idNivel = Niveles.id WHERE Secciones.codigo='${req.query.codigo}'`)
            res.send({data})
        }
    } catch (error) {
        res.send({error})
    }
}

const registerSection = async ( req, res ) => {
    try {
        let existCod = 0
        let cod = ''
        
        do {
            cod = generateRandomString(6,'S')
            existCod = await Secciones.findOne({
                where: {codigo: cod},
                attributes:  ['id']
            })  
        } while (existCod != null);

        const dataSection = {
            codigo: cod,
            ...req.body
        }

        console.log(dataSection)

        const data = await Secciones.create(dataSection)

        res.send({data}) 

        
    } catch (error) {
        res.send({error})
    }
}

const assignSection = async (req, res) => {
    try {

        let data={
            msg:'',
            rpt:null
        }

        // Limitar el numero de secciones por profesor a 10
        const numSections = await Secciones.findAndCountAll({
            where:{ idDocente: req.body.idDocente },
            attributes:  ['id']
        })

        if(numSections.count < 10){
            const section = await Secciones.update({
                idDocente: req.body.idDocente
            },
            {
                where:{
                    id: req.body.idSection
                }
            })
    
            if(section.length > 0){
                data.msg='ok'
                data.rpt=1
            }

        }else{
            data.msg='El docente excedio el numero de secciones'
            data.rpt=0
        }

        res.send({data})

    } catch (error) {
        res.send({error})
    }
}

// Asignar horarios a la seccion
const assignSchedule = async (req, res) => {
    try {
        // verificar que la seccion existe
        const numSections = await Secciones.findAndCountAll({
            where:{ id: req.body.idSeccion },
            attributes:  ['idCurso','idAula']
        })


        if(numSections.count > 0){
            
            let {horarios, ...SectionAula} = req.body

            horarios.map( async function(h) {
                dataSend = {
                    ...numSections.rows[0].dataValues,
                    ...h,
                    ...SectionAula
                }
                await Horario.create(dataSend)
            });

            res.send({msg:'Horarios guardados'})

        }

    } catch (error) {
        res.send({error})
    }
}

// Mostrar horarios
const Schedule = async (req, res) => {
    try {
        const data = await Horario.findAll({
            where:{ idSeccion: req.query.idSeccion },
            attributes:  ['dia','horaInicio','horaFinal']
        })
        res.send({data})
    } catch (error) {
        res.send(error)
    }
}

// SECCIONES POR AULA
const allSectionClassroom = async (req, res) =>{
    try {
        const [data, meta] = await sequelize.query(`SELECT Secciones.* , Cursos.idNivel, Cursos.nombre AS curso, Docentes.codigo AS codigoDocente, Docentes.nombre As nombreDocente, Niveles.nombre AS nivel FROM Secciones LEFT JOIN Docentes ON Secciones.idDocente = Docentes.id LEFT JOIN Cursos ON Secciones.idCurso = Cursos.id LEFT JOIN Niveles ON Cursos.idNivel = Niveles.id WHERE Secciones.idAula=${req.query.idAula}`)
        res.send({data})
    } catch (error) {
        res.send({error})
    }
}

const getStudents = async (req, res) => {
    try {
        const [data,meta] = await sequelize.query(`SELECT DISTINCT e.* FROM Secciones as s INNER JOIN Estudiantes AS e ON e.idAula = s.idAula WHERE s.id = ${req.query.idSeccion}`)
        res.send({data})
    } catch (error) {
        res.send(error)
    }
}




// Exportar todos los metodos
module.exports = { 
    mainFunction, 
    registerSection, 
    assignSection, 
    assignSchedule, 
    Schedule, 
    searchSection,
    allSectionClassroom,
    getStudents
}