// Impotaciones necesarias
require('dotenv').config();
const { QueryTypes } = require('sequelize');

const { sequelize } = require('../config/connection')
const { Foros,ForoRespuesta, Secciones, Notificaciones, Estudiantes, Actividades } = require('../sequelize/models')


// Crear Foro
const createForo = async (req, res) => {
    try {
        const request = req.body
        if(request.pregunta != null && request.fechaInicio !=null && request.fechaFin != null && request.idSeccion !=null){
            const data = await Foros.create(req.body)

            if(data){
                const Aula = await Secciones.findOne({
                    where: {id:req.body.idSeccion},
                    attributes: ['idAula']
                })
                const dataCreate={
                    idAula:Aula.dataValues.idAula,
                    tipoNotificación:"Foros",
                    mensaje:"Tiene un nuevo foror creado para su aula",
                    idDocente:1
                }
                await Notificaciones.create(dataCreate)
            }

            res.send({data})
        }else{
            res.send({msg:'Envie datos correctamente'})
        }
    } catch (error) {
        res.send({error})
    }
}

// Foros por seccion o por idForo
const main = async (req, res) => {
    try {
        if(req.query.idSeccion){
            const data = await Foros.findAll({
                where: {
                    idSeccion: req.query.idSeccion
                },
                attributes: {exclude: ['idForo']}
            });
            res.send({data})
        }

        if(req.query.idForo){
            const data = await Foros.findOne({
                where: {
                    id: req.query.idForo
                },
                include: ForoRespuesta,
                attributes: {exclude: ['idForo']}
            });
            res.send({data})
        }
        
    } catch (error) {
        res.send({error})
    }
}

// Foros Respuestas
const foroRespuesta = async (req, res) => {
    try {
        const [data, metadata] = await sequelize.query(`SELECT fr.*, e.codigo as codigoEstudiante, e.nombre as nombreEstudiante, e.apellido as apellidoEstudiante FROM ForoRespuesta AS fr INNER JOIN Foros AS f ON fr.idForo = f.id INNER JOIN Estudiantes AS e ON fr.idEstudiante = e.id WHERE f.id = ${req.query.idForo}`)
        res.send({data})

        
    } catch (error) {
        res.send({error})
    }
}

const Respuesta = async (req, res) => {
    try {

        const foro = await Foros.findOne({
            where: {id:req.body.idForo},
            attributes: {exclude: ['idForo']}
        })

        const data = await ForoRespuesta.create(req.body)

        if(data){
            const actividad = {
                actividad:'Realizaste un nuevo foro',
                nombreActividad:`Respondiste el foro: ${foro.titulo}`,
                idEstudiante:req.body.idEstudiante
            }
            await Actividades.create(actividad)
        }

        res.send({data})

    } catch (error) {
        res.send({error})
    }
}


// Exportar todos los metodos
module.exports = { 
    createForo,
    main,
    foroRespuesta,
    Respuesta
}