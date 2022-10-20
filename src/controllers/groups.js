const fs = require('fs')

const { encrypt } = require('../utils/handlePassword');
const { verifyToken } = require('../utils/handleJwt')
const {Estudiantes, Grupos} = require('../sequelize/models')

const create = async (req,res) => {
    try {
        const {idEstudiantes, ...dataGrupo} = req.body
        const data = await Grupos.create(dataGrupo)
        const idGrupo = data.dataValues.id
        if(idEstudiantes){
            await idEstudiantes.map(async (id)=>{
                await Estudiantes.update({idGrupo},{
                    where:{id:id}
                })
            })
        }
        res.send(data)
    } catch (e) {
        res.send({e})
    }
}

const asing = async (req,res) => {
    try {
        const {idEstudiantes, idGrupo} = req.body
        await idEstudiantes.map(async (id)=>{
            await Estudiantes.update({idGrupo},{
                where:{id:id}
            })
        })
        res.send({msg:"grupo asignado"})
    } catch (e) {
        res.send({e})
    }
}

const getSection = async (req,res) => {
    try {
        const idSeccion = req.query.idSeccion
        const data = await Grupos.findAll({
            where:{idSeccion},
            attributes: {exclude: ['idGrupo']}
        })
        res.send({data})
    } catch (e) {
        res.send({e})
    }
}

const getStudents = async (req,res) => {
    try {
        const idGrupo = req.query.idGroup
        const data = await Estudiantes.findAll({
            where:{idGrupo},
            attributes: {exclude: ['idEstudiante','idSeccion']}
        })
        res.send({data})
    } catch (e) {
        res.send({e})
    }
}


module.exports = { create, asing, getSection, getStudents }
