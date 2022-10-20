const fs = require('fs')

const { encrypt } = require('../utils/handlePassword');
const { verifyToken } = require('../utils/handleJwt')
const {Anuncios, Notificaciones, Secciones, Docentes} = require('../sequelize/models')

const create = async (req,res) => {
    try {

        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);
        let idDocente

        if(dataToken.role == 2){
            const Docente = await Docentes.findOne({
                where:{idUsuario: dataToken.id},
                attributes: ['id']
            })
            idDocente = Docente.dataValues.id
        }else{
            return
        }

        const data = await Anuncios.create(req.body)
        
        if(data){
            const Aula = await Secciones.findOne({
                where: {id:req.body.idSeccion},
                attributes: ['idAula']
            })
            const dataCreate={
                idAula:Aula.dataValues.idAula,
                tipoNotificación:"NUevo",
                mensaje:"Nuevo",
                idDocente
            }
            await Notificaciones.create(dataCreate)
        }

        res.send({data})
    } catch (e) {
        res.send({e})
        console.log(e)
    }
}

const getSection = async (req,res) => {
    try {
        const idSeccion = req.query.idSeccion
        if(idSeccion){
            const data = await Anuncios.findAll({
                where:{idSeccion:idSeccion}
            })
            res.send({data})
        }else{
            res.send({msg: 'Parametro no valido'})
        }
    } catch (e) {
        res.send({e})
        console.log(e)
    }
}


module.exports = { create, getSection }
