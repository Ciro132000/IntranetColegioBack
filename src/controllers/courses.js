// Impotaciones necesarias
require('dotenv').config();
const { QueryTypes } = require('sequelize');

const { sequelize } = require('../config/connection')

const {Cursos, Modulos, Lecciones} = require('../sequelize/models')
const { uploadFile } = require('../utils/cloudinary')
const fs =require('fs-extra')
const { verifyToken } = require('../utils/handleJwt')

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


// Crear curso
const createCourses = async (req, res) => {
    try {

        // Verificando si el curso existe
        const existCourse = await Cursos.findOne({
            where: {nombre: req.body.nombre, idNivel: req.body.idNivel},
            attributes: {exclude: ['idCurso']}
        }) 

        if(existCourse === null){

            const data = await Cursos.create(req.body)

            res.send({data}) 
        }else{
            res.send({msg:`El curso que intenta registrar ya existe`})
        }

    } catch (error) {
        res.send({error})
    }
}

// Agregar leccion
const addLesson = async (req, res) => {
    try {
        if(req.body.nombre && req.body.idModulo && req.files){
            const enviar = {
                nombre:req.body.nombre,
                idModulo:req.body.idModulo,
            }
    
            // Verificando archivos
            if(req.files){
                const file = req.files.file.tempFilePath
                const ruta = `intranet/lecciones/modulo-${req.body.idModulo}` 
                const nombre = req.files.file.name.split('.')
                const result = await uploadFile(file, ruta, nombre.shift())
                await fs.unlink(file)
                enviar.archivo = result.url;
                enviar.tipoArchivo = result.format
            }

            const data = await Lecciones.create(enviar)

            res.send({data})

        }else{
            res.send({msg:'Parametros incorrectos'})
        }

    } catch (error) {
        res.send({error})
    }
}

// Mostrar contenido del curso
const getContent = async (req, res) => {
    try {

        if(req.query.idModulo){
            const data = await Lecciones.findAll({
                where: {idModulo: req.query.idModulo}
            })

            res.send({data})

        }else if(req.query.idSeccion){
            const data = await Modulos.findAll({
                where: {idSeccion: req.query.idSeccion},
                attributes: {exclude: ['idModulo']}
            })
           
            // await modulos.map(async (m,index)=>{
            //     modulos[index].dataValues.Lecciones=[]
            //     const id = modulos[index].dataValues.id
            //     const data = await Lecciones.findAll(({
            //         where: {idModulo: id}
            //     }))
            //     await data.map(async (d,i) =>{
            //         console.log(data[i].dataValues)
            //         modulos[index].dataValues.Lecciones.push.call(data[i].dataValues)
            //     })
            // })
    
            res.send({data})
        }

    } catch (error) {
        res.send({error})
    }
}


// Crear modulo
const createModule = async (req, res) => {
    try {
        if(req.body.nombre && req.body.idSeccion){
            const data = await Modulos.create(req.body)
            res.send({data})
        }else{
            res.send({msg:'parametros invalidos'})
        }
    } catch (error) {
        res.send({error})
    }
}

const getLesson = async (req, res) => {
    try {
        const data = await Lecciones.findOne({
            where: {id: req.query.idLeccion}
        })
        res.send({data})
    } catch (error) {
        res.send({error})
    }
}

// Exportacion de funciones
module.exports = { mainFunction, allCourses, searchCourses, createCourses, createModule, addLesson, getContent, getLesson }