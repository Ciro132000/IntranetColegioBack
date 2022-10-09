
const fs = require('fs')

const { handleHttpError } = require('../utils/handleError')
const { encrypt, compare } = require('../utils/handlePassword');
const { tokenSign } = require('../utils/handleJwt')
const {Mensajes, sequelize} = require('../sequelize/models')


const sendMessage = async (req,res) => {
    try {
        const dataSend = req.body
        const data = await Mensajes.create(dataSend)
        res.send({data});
    } catch (e) {
        handleHttpError(res, "ERROR_LOGIN_USER" + e);
    }
}

const getChat = async (req,res) => {
    try {
        const user1 = req.query.idUser1
        const user2 = req.query.idUser2
        const [data,meta] = await sequelize.query(`SELECT * FROM Mensajes AS m WHERE (m.idEnvia =${user1} or m.idRecibe = ${user1}) AND (m.idEnvia =${user2} or m.idRecibe = ${user2})`)
        res.send({data});
    } catch (e) {
        handleHttpError(res, "ERROR_LOGIN_USER" + e);
    }
}

const getChats = async (req,res) => {
    try {
        const idUser = req.query.idUser
        res.send(idUser);
    } catch (e) {
        handleHttpError(res, "ERROR_CHATS" + e);
    }
}

const listUsers = async (req,res) => {
    try {
        if(req.query.idAula){
            const [data,met] = await sequelize.query(`SELECT DISTINCT d.nombre, d.apellido, d.idUsuario, p.img FROM Secciones as s INNER JOIN Aulas AS a ON a.id = s.idAula INNER JOIN Docentes AS d ON s.idDocente = d.id INNER JOIN Perfiles AS p ON p.idUsuario = d.idUsuario   WHERE s.idAula = ${req.query.idAula}`)
            res.send({data});
        }else if(req.query.idDocente){
            const [data,met] = await sequelize.query(`SELECT DISTINCT e.nombre, e.apellido, e.idUsuario, p.img FROM Secciones as s INNER JOIN Estudiantes AS e ON e.idAula = s.idAula INNER JOIN Perfiles AS p ON e.idUsuario = p.idUsuario WHERE s.idDocente = ${req.query.idDocente}`)
            res.send({data});
        }
  
    } catch (e) {
        handleHttpError(res, "ERROR_PARAMS" + e);
    }
}


module.exports = { sendMessage, getChat, getChats, listUsers }