// Impotaciones necesarias
require('dotenv').config();
const { QueryTypes } = require('sequelize');

const { sequelize } = require('../config/connection')

const { generateRandomString }  = require('../utils/shared')
const {Estudiantes, Usuarios} = require('../sequelize/models')
const { encrypt } = require('../utils/handlePassword');

// Funciones del controlador
const mainFunction = async (req, res) => {
    const [data, metadata] =await sequelize.query(`SELECT Estudiantes.*, Niveles.nombre AS nivel, CONCAT(Aulas.grado, Aulas.seccion) AS aula FROM Estudiantes INNER JOIN Niveles ON Niveles.id = Estudiantes.idNivel LEFT JOIN Aulas ON Estudiantes.idAula = Aulas.id`)
    res.send({data})
}

const registerStudens = async (req, res) => {
    try {
        let existCod = 0
        let cod = ''
        
        // Verificando si existe estudiante con mismo dni
        const existStudent = await Estudiantes.findOne({
            where: {dni: req.body.dni},
            attributes: {exclude: ['idEstudiante']}
        }) 

        if(existStudent === null){
            do {
                cod = generateRandomString(6,'E')
                existCod = await Estudiantes.findOne({
                    where: {codigo: cod},
                    attributes: {exclude: ['idEstudiante']}
                })  
            } while (existCod != null);

            const dni = req.body.dni

            const registerUsuario = {
                usuario:cod,
                contrasena:await encrypt(dni.toString()),
                idRol:3,
            }

            const dataUsuario = await Usuarios.create(registerUsuario)
    
            const dataEstudiante = {
                codigo: cod,
                ...req.body,
                idUsuario: dataUsuario.id
            }
    
            const data = await Estudiantes.create(dataEstudiante)

            res.send({data}) 
        }else{
            res.send({msg:`El estudiante con dni ${req.body.dni} ya se encuentra registrado en la institución`})
        }

    } catch (error) {
        console.log(error)
        res.send({error})
    }
}

const studentsSection = (req, res) => {
    
}


// Exportacion de funciones
module.exports = { mainFunction, registerStudens }