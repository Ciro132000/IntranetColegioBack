// Impotaciones necesarias
require('dotenv').config();
const { QueryTypes } = require('sequelize');

const { sequelize } = require('../config/connection')
const { verifyToken } = require('../utils/handleJwt')

const {Notificaciones, Perfiles } = require('../sequelize/models')
const { uploadFile } = require('../utils/cloudinary')
const fs =require('fs-extra')

// Funciones del controlador
const getNotification = async (req, res) => {
    try {
        const data = await Notificaciones.findAll({
            where:{idAula:req.query.idAula}
        }) 
        res.send({data})
    } catch (error) {
        console.log(error)
        res.send({error})
    }
}

const desacNotification = async (req, res) => {
    try {
        const DataSend ={
            idPerfil:req.query.idPerfil,
            isNotificacion:req.query.isNotificacion
        }
        const data = await Perfiles.update(DataSend,{
            where:{id:req.query.idPerfil}
        }) 
        res.send({data})
    } catch (error) {
        console.log(error)
        res.send({error})
    }
}


// Exportacion de funciones
module.exports = { getNotification, desacNotification }