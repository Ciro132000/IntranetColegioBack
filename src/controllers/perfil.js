// Impotaciones necesarias
require('dotenv').config();
const { QueryTypes } = require('sequelize');

const { sequelize } = require('../config/connection')
const { verifyToken } = require('../utils/handleJwt')

const {Estudiantes, Perfiles, Docentes} = require('../sequelize/models')
const { uploadFile } = require('../utils/cloudinary')
const fs =require('fs-extra')

// Funciones del controlador
const modificarPerfil = async (req, res) => {
    try {
        const {file, ...dataRequest} = req.body
        let data
        if(req.files!=null){
            console.log('sds')

            const file = req.files.file.tempFilePath
            const ruta = `intranet/usuarios/usuario-${req.query.idUsuario}` 
            const nombre = `perfil-${req.query.idUsuario}`
            const result = await uploadFile(file, ruta, nombre)
            await fs.unlink(file)

            const dataSend={
                ...dataRequest,
                img:result.url
            }

            data = await Perfiles.update(dataSend,{
                where:{idUsuario:req.query.idUsuario}
            })

        }else{
            data = await Perfiles.update(dataRequest,{
                where:{idUsuario:req.query.idUsuario}
            })
        };
        res.send({data})
    } catch (error) {
        console.log(error)
        res.send({error})
    }
}

const modificarAlumno = async (req, res) => {
    try {
        const {nombre, apellido} = req.body
        const dataSend ={
            nombre,
            apellido
        }
        const data = await Estudiantes.update(dataSend,{
            where:{idUsuario:req.query.idUsuario}
        })

        res.send({data})
    } catch (error) {
        console.log(error)
        res.send({error})
    }
}

const modificarDocente = async (req, res) => {
    try {
        const {nombre, apellido} = req.body
        const dataSend ={
            nombre,
            apellido
        }
        const data = await Docentes.update(dataSend,{
            where:{idUsuario:req.query.idUsuario}
        })

        res.send({data})
    } catch (error) {
        console.log(error)
        res.send({error})
    }
}

const datosUsuario = async (req, res) => {
    try {
        let datos
        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);
        const idUsuario = dataToken.id

        const perfil = await Perfiles.findOne({
            where: {idUsuario}
        })

        const rol = dataToken.role
        if(rol==2){
            datos = await Docentes.findOne({
                where: {idUsuario},
                attributes: {exclude: ['idDocente']}
            })
        }else if(rol==3){
            datos = await Estudiantes.findOne({
                where: {idUsuario},
                attributes: {exclude: ['idSeccion','idEstudiante']}
            })
        }
        

        const data = {
            perfil,
            datos
        }
        res.send({data})
    } catch (error) {
        console.log(error)
        res.send({error})
    }
}


// Exportacion de funciones
module.exports = { modificarPerfil, modificarAlumno,  modificarDocente, datosUsuario }