const fs = require('fs')

const { handleHttpError } = require('../utils/handleError')
const { encrypt, compare } = require('../utils/handlePassword');
const { tokenSign } = require('../utils/handleJwt')
const {Usuarios, Docentes, Estudiantes, Roles, Asistencias} = require('../sequelize/models')


const registrarAsistencia = async (req,res) => {
    try {
        const {estudiantes, ...dataGeneral}=req.body
        const exists = await Asistencias.count({
            where:{dia:dataGeneral.dia, idSeccion:dataGeneral.idSeccion}
        })
        if(exists > 0){
            res.send({msg:'Ya se registro la asistencia de este dia', status:false})
        }else{
            await estudiantes.map(async(e)=>{
                await Asistencias.create({...e, ...dataGeneral})
            })
            res.send({msg:'registrado',status:true})
        }

    } catch (e) {
        handleHttpError(res, "ERROR" + e);
    }
}

const verificarAsistencia = async (req,res) => {
    try {
        const dia=req.query.dia
        const idSeccion=req.query.idSeccion

        const data = await Asistencias.findAll({
            where:{dia, idSeccion}
        })
        res.send({data})
        
    } catch (e) {
        handleHttpError(res, "ERROR" + e);
    }
}


module.exports = { registrarAsistencia, verificarAsistencia }
