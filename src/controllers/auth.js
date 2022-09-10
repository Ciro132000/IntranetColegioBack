
const fs = require('fs')

const { handleHttpError } = require('../utils/handleError')
const { encrypt, compare } = require('../utils/handlePassword');
const { tokenSign } = require('../utils/handleJwt')
const {Usuarios, Docentes, Estudiantes} = require('../sequelize/models')


const loginCtrl = async (req,res) => {

    try {
        const user = await Usuarios.findOne({ 
            where: {usuario:req.body.usuario},
            attributes: {exclude: ['idUsuario']}
        })

        if(!user){
            handleHttpError(res, "USER_NOT_EXISTS",404);
            return
        }
        
        const pass = user.contrasena
        
        console.log(pass)

        const check = await compare(req.body.contraseña, pass)

        if(!check){
            handleHttpError(res, "PASSWORD_INVALID",401);
            return
        }    


        const data = {
            token: await tokenSign(user),
            user
        }


        res.send({data});


    } catch (e) {
        handleHttpError(res, "ERROR_LOGIN_USER" + e);
    }

}


module.exports = { loginCtrl }
