// Impotaciones necesarias
require('dotenv').config();
const { QueryTypes } = require('sequelize');

const { sequelize } = require('../config/connection')

const { generateRandomString }  = require('../utils/shared')
const {Estudiantes, Usuarios, Actividades} = require('../sequelize/models')
const { encrypt } = require('../utils/handlePassword');
const { verifyToken } = require('../utils/handleJwt')

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

const studentsSection = async(req, res) => {
    try {
        const [data, meta] = await sequelize.query(`SELECT Estudiantes.* , Perfiles.img AS img FROM Estudiantes INNER JOIN Secciones ON Secciones.idAula = Estudiantes.idAula INNER JOIN Perfiles ON Estudiantes.idUsuario = Perfiles.idUsuario WHERE Secciones.id=${req.query.idSeccion}`)

        res.send({data}) 

    } catch (error) {
        console.log(error)
        res.send({error})
    }
}

const notasSection = async(req, res) => {
    try {
        
        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        const estudiante = await Estudiantes.findOne({
            where:{idUsuario: dataToken.id},
            attributes: ['id']
        })

        const idEstudiante = estudiante.dataValues.id

        const idSeccion = req.query.idSeccion

        const [data, meta] = await sequelize.query(`SELECT e.id as idEvaluacion, e.titulo, e.notaMaxima, e.idTipo, n.nota, n.estado FROM Notas AS n INNER JOIN Evaluaciones AS e ON n.idEvaluacion = e.id INNER JOIN Secciones AS s ON s.id = e.idSeccion WHERE n.idEstudiante = ${idEstudiante} AND s.id = ${idSeccion}`)

        res.send({data}) 

    } catch (error) {
        console.log(error)
        res.send({error})
    }
}

const actividadesPendientes = async(req,res)=>{
    try {
        const [evaluaciones,meta] =await sequelize.query(`SELECT * FROM Evaluaciones WHERE Evaluaciones.fechaFin > now() AND Evaluaciones.idSeccion =${req.query.idSeccion}`)


        const [foros, metada] = await sequelize.query(`SELECT * FROM Foros WHERE Foros.fechaFin > now() AND Foros.idSeccion=${req.query.idSeccion}`)

        const data ={
            evaluaciones,
            foros
        }

        res.send({data})
    } catch (error) {
        console.log(error)
        res.send({error})
    }
}

const historial = async(req,res)=>{
    try {
        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        const estudiante = await Estudiantes.findOne({
            where:{idUsuario: dataToken.id},
            attributes: ['id']
        })
        const idEstudiante = estudiante.dataValues.id

        const data = await Actividades.findAll({
            where:{idEstudiante:idEstudiante},
            order: [
                ['createdAt', 'DESC']
            ],
        })

        res.send({data})
    } catch (error) {
        console.log(error)
        res.send({error})
    }
} 


// Exportacion de funciones
module.exports = { mainFunction, registerStudens, studentsSection, notasSection, actividadesPendientes, historial }