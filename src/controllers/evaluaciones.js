require('dotenv').config();
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../config/connection')
const { Evaluaciones, Secciones, Notificaciones , PreguntasExamen, TipoEvaluacion, RespuestasExamen, Estudiantes, RespuestasTarea, Notas, Actividades} = require('../sequelize/models')
const { verifyToken } = require('../utils/handleJwt')
const { uploadFile } = require('../utils/cloudinary')
const fs =require('fs-extra')

// Funciones del controlador
const createExamen = async (req, res) => {
    try {
        const {preguntas, ...evaluacion} = req.body
        const evaluacionRegistrada = await Evaluaciones.create(evaluacion)

        const preguntasRegistradas = await  preguntas.map(async (pregunta)=>{
            pregunta.idEvaluacion= evaluacionRegistrada.id
            return await PreguntasExamen.create(pregunta)
        })

        const data ={
            evaluacion: evaluacionRegistrada,
            preguntas: preguntasRegistradas.length
        }

        if(data){
            const Aula = await Secciones.findOne({
                where: {id:req.body.idSeccion},
                attributes: ['idAula']
            })
            const dataCreate={
                idAula:Aula.dataValues.idAula,
                tipoNotificación:"Examen",
                mensaje:"Tiene un nuevo examen creado para su aula",
                idDocente:1
            }
            await Notificaciones.create(dataCreate)
        }

        console.log(preguntasRegistradas)

        res.send({ data })
    } catch (error) {
        res.send({error})
    }
}

const createTarea = async (req, res) => {
    try {
        const tarea = req.body
        const data = await Evaluaciones.create(tarea)

        if(data){
            const Aula = await Secciones.findOne({
                where: {id:req.body.idSeccion},
                attributes: ['idAula']
            })
            const dataCreate={
                idAula:Aula.dataValues.idAula,
                tipoNotificación:"Tarea",
                mensaje:"Tiene una nueva tarea creada para su aula",
                idDocente:1
            }
            await Notificaciones.create(dataCreate)
        }

        res.send({ data })

    } catch (error) {
        res.send({error})
    }
}

const reprogramarEvaluacion = async (req, res) => {
    try {
        const data = await Evaluaciones.update(req.body,{ where: { id: req.query.idEvaluacion } } )
        console.log(req.body, req.query)
        res.send({ data })
    } catch (error) {
        res.send({error})
    }
}

const eliminarEvaluacion = async (req, res) => {
    try {
        
    } catch (error) {
        res.send({error})
    }
}

const tiposEvaluacion = async (req, res) => {
    try {
        const data = await TipoEvaluacion.findAll({
            attributes: {exclude: ['idTipo']}
        })
        res.send({data})
    } catch (error) {
        res.send({error})
    }
}

// Evaluaciones por seccion
const allSection = async (req, res) => {
    try {
        const idSeccion = req.query.idSeccion
        const tareas = await Evaluaciones.findAll({
            where: {
                idSeccion,
                idTipo:2
            },
            attributes: {exclude: ['idEvaluacion']}
        })

        const examenes = await Evaluaciones.findAll({
            where: {
                idSeccion,
                idTipo:1
            },
            attributes: {exclude: ['idEvaluacion']}
        })

        const data = {
            tareas,
            examenes
        }

        res.send({data})
    } catch (error) {
        res.send({error})
    }
}

//Contenido de la evaluacion
const getContent = async (req, res) => {
    try {
        const idExamen = req.query.idExamen
        const idTarea = req.query.idTarea

        if(idExamen){
            const dataPregunta = await PreguntasExamen.findAll({
                where: {
                    idEvaluacion: idExamen
                },
                attributes: {exclude: ['idPregunta']}
            })

            const dataEvaluacion = await Evaluaciones.findOne({
                where: {
                    id: idExamen
                },
                attributes: {exclude: ['idEvaluacion']}
            })

            const data = {
                evaluacion: dataEvaluacion,
                preguntas: dataPregunta
            }

            res.send({data})
        }else if(idTarea){
            const data = await Evaluaciones.findAll({
                where: {
                    id: idTarea
                },
                attributes: {exclude: ['idEvaluacion']}
            })
            res.send({data})
        }else{
            res.send({mgs:"parametros no validos"})
        }

    } catch (error) {
        res.send({error})
    }
}

// Resgistrar respuesta de examen
const respuestaExamen = async (req, res) => {
    try {

        const evaluacion = await Evaluaciones.findOne({
            where: {id:req.body[0].idEvaluacion},
            attributes: {exclude: ['idEvaluacion']}
        })

        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        const estudiante = await Estudiantes.findOne({
            where:{idUsuario: dataToken.id},
            attributes: ['id']
        })
        const idEstudiante = estudiante.dataValues.id

        let data = []
        await req.body.map(async (respuesta)=>{
            const dataEnviar = {
                idEstudiante,
                ...respuesta
            }
            data = await RespuestasExamen.create(dataEnviar)
        })

        if(data){
            const actividad = {
                actividad:'Realización de examen',
                nombreActividad:`Realizaste el examen: ${evaluacion.titulo}`,
                idEstudiante
            }
            await Actividades.create(actividad)
        }

        res.send({data})
    } catch (error) {
        res.send({error})
    }
}

// registrar respuesta tarea
const respuestaTarea = async (req, res) => {
    try {

        const evaluacion = await Evaluaciones.findOne({
            where: {id:req.body.idEvaluacion},
            attributes: {exclude: ['idEvaluacion']}
        })

        // Consiguiendo el ID del estudiante
        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        const estudiante = await Estudiantes.findOne({
            where:{idUsuario: dataToken.id},
            attributes: ['id']
        })
        const idEstudiante = estudiante.dataValues.id


        const enviar = {
            respuesta:req.body.respuesta,
            idEvaluacion:req.body.idEvaluacion,
            idEstudiante
        }

        // Verificando archivos
        if(req.files){
            const file = req.files.file.tempFilePath
            const ruta = `intranet/alumno-${idEstudiante}/evaluacion:${req.body.idEvaluacion}` 
            const nombre = req.files.file.name.split('.')
            const result = await uploadFile(file, ruta, nombre.shift())
            await fs.unlink(file)
            enviar.archivo = result.url;
            enviar.tipoArchivo = result.format
        }

        const data = await RespuestasTarea.create(enviar)

        if(data){
            const actividad = {
                actividad:'Respuesta de tarea',
                nombreActividad:`Respondiste la tarea: ${evaluacion.titulo}`,
                idEstudiante
            }
            await Actividades.create(actividad)
        }

        res.send({data})

    } catch (error) {
        res.send({error})
    }
}

const traerRespuestas = async (req, res) => {
    try {
        // Consiguiendo el ID del estudiante
        if(req.query.idExamen && req.query.idEstudiante){
            const data = await RespuestasExamen.findAll({
                where:{idEvaluacion: req.query.idExamen, idEstudiante:req.query.idEstudiante} 
            })
            res.send({data})
        }else if(req.query.idTarea && req.query.idEstudiante){
            const data = await RespuestasTarea.findAll({
                where:{idEvaluacion: req.query.idTarea, idEstudiante:req.query.idEstudiante} 
            })
            res.send({data})
        }

    } catch (error) {
        res.send({error})
    }
}


// Verificar si el la tarea ya fue respondida
const verficarExamen = async (req, res) => {
    try {

        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        const estudiante = await Estudiantes.findOne({
            where:{idUsuario: dataToken.id},
            attributes: ['id']
        })
        const idEstudiante = estudiante.dataValues.id

        const count = await RespuestasExamen.count({
            where:{idEstudiante,idEvaluacion:req.query.idEvaluacion}
        });

        if(count > 0){
            res.send({status:0,msg:'El alumno ya respondio el examen'})
        }else{
            res.send({status:1,msg:'Puede dar el examen'})
        }

    } catch (error) {
        console.log(error)
        res.send({error})
    }
}

// Verificar si el examen ya fue respondido
const verficarTarea = async (req, res) => {
    try {

        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        const estudiante = await Estudiantes.findOne({
            where:{idUsuario: dataToken.id},
            attributes: ['id']
        })
        const idEstudiante = estudiante.dataValues.id

        const count = await RespuestasTarea.count({
            where:{idEstudiante,idEvaluacion:req.query.idEvaluacion}
        });

        if(count > 0){
            res.send({status:0,msg:'El alumno ya respondio la tarea'})
        }else{
            res.send({status:1,msg:'Puede dar la tarea'})
        }

    } catch (error) {
        console.log(error)
        res.send({error})
    }
}

// Calificar evaluacion
const calificarExamen = async (req, res) => {
    try {
        const {notas, ...dataNota} = req.body
        const data = await Notas.create(dataNota)
        await notas.map(async (n)=>{
            console.log(n.nota)
            await RespuestasExamen.update({puntos:n.nota},{ where: { idPregunta:n.idPregunta, idEstudiante:n.idEstudiante } } )
        })
        res.send({data})
    } catch (error) {
        res.send({error})
    }
}

const calificarTarea = async (req, res) => {
    try {
        const request = req.body
        const data = await Notas.create(request)
        res.send({data})
    } catch (error) {
        res.send({error})
    }
}

// Notas por alumno

const notasAlumnos = async (req, res) => {
    try {
        //const [data, meta] = await sequelize.query(`SELECT DISTINCT Estudiantes.id, Estudiantes.nombre, Estudiantes.apellido, Estudiantes.codigo, Notas.estado, Notas.nota FROM Notas INNER JOIN Evaluaciones ON Notas.idEvaluacion = Evaluaciones.id INNER JOIN Secciones ON Evaluaciones.idSeccion = Secciones.id INNER JOIN Aulas ON Aulas.id = Secciones.idAula INNER JOIN Estudiantes ON Estudiantes.idAula = Aulas.id WHERE Secciones.id=${req.query.idSeccion} AND Evaluaciones.id =${req.query.idEvaluacion}`)
        const data = await Notas.findAll({where:{idEvaluacion:req.query.idEvaluacion}})
        res.send({data}) 
    
    } catch (error) {
        console.log(error)
        res.send({error})
    }
}


const todasNotas = async (req, res) => {
    try {
        const [data, meta] = await sequelize.query(`SELECT * FROM Notas INNER JOIN Evaluaciones ON Notas.idEvaluacion = Evaluaciones.id WHERE Evaluaciones.idSeccion = ${req.query.idSeccion}`)
        res.send({data}) 
    
    } catch (error) {
        console.log(error)
        res.send({error})
    }
}


// Rectificar nota
const rectificarNotas = async (req, res) => {
    try {
        const data = await Notas.update(req.body,{
            where:{id:req.query.idNota}
        })
        res.send({data}) 
    
    } catch (error) {
        console.log(error)
        res.send({error})
    }
}


// Exportacion de funciones
module.exports = { 
    createExamen,
    createTarea,
    reprogramarEvaluacion,
    eliminarEvaluacion,
    tiposEvaluacion,
    allSection,
    getContent,
    respuestaExamen,
    verficarExamen,
    respuestaTarea,
    verficarTarea,
    traerRespuestas,
    calificarExamen,
    calificarTarea,
    notasAlumnos,
    todasNotas,
    rectificarNotas
}