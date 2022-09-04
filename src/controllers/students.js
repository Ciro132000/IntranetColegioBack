// Impotaciones necesarias
require('dotenv').config();
const { QueryTypes } = require('sequelize');

const { sequelize } = require('../config/connection')

const { generateRandomString }  = require('../utils/shared')
const {Estudiantes} = require('../sequelize/models')

// Funciones del controlador
const mainFunction = async (req, res) => {
    const [data, metadata] =await sequelize.query(`SELECT estudiantes.*, niveles.nombre AS nivel, aulas.nombre AS aula FROM estudiantes INNER JOIN niveles ON niveles.id = estudiantes.idNivel LEFT JOIN aulas ON estudiantes.idAula = aulas.id`)
    res.send({data})
}

const registerStudens = async (req, res) => {
    try {
        let existCod = 0
        let cod = ''
        
        // Verificando si existe estudiante con mismo dni
        const existStudent = await Estudiantes.findOne({
            where: {dni: req.body.dni}
        }) 

        if(existStudent === null){
            do {
                cod = generateRandomString(6,'E')
                existCod = await Estudiantes.findOne({
                    where: {codigo: cod}
                })  
            } while (existCod != null);
    
            const dataEstudiante = {
                codigo: cod,
                ...req.body
            }
    
            const data = await Estudiantes.create(dataEstudiante)
    
            res.send({data}) 
        }else{
            res.send({msg:`El estudiante con dni ${req.body.dni} ya se encuentra registrado en la institución`})
        }

    } catch (error) {
        res.send({error})
    }
}

const studentsSection = (req, res) => {
    
}


// Exportacion de funciones
module.exports = { mainFunction, registerStudens }