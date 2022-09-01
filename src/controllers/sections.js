// Impotaciones necesarias
require('dotenv').config();
const { QueryTypes } = require('sequelize');

const fs =require('fs-extra')
const { sequelize } = require('../config/connection')
const { generateRandomString }  = require('../utils/shared')
const {Secciones} = require('../sequelize/models')

// Funciones del controlador
const mainFunction = (req, res) => {
    res.send({data:"Funcionando"})
}

const registerSection = async ( req, res ) => {
    try {
        let existCod = 0
        let cod = ''
        
        do {
            cod = generateRandomString(6,'S')
            existCod = await Secciones.findOne({
                where: {codigo: cod}
            })  
        } while (existCod != null);

        const dataSection = {
            codigo: cod,
            ...req.body
        }

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
            where:{ idDocente: req.body.idDocente }
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



// Exportar todos los metodos
module.exports = { mainFunction, registerSection, assignSection }