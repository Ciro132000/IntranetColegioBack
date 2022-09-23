require('dotenv').config();
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../config/connection')
const { Evaluaciones, PreguntasExamen, TipoEvaluacion} = require('../sequelize/models')

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
        res.send({ data })

    } catch (error) {
        res.send({error})
    }
}

const reprogramarEvaluacion = async (req, res) => {
    try {
        
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

// Exportacion de funciones
module.exports = { 
    createExamen,
    createTarea,
    reprogramarEvaluacion,
    eliminarEvaluacion,
    tiposEvaluacion
}