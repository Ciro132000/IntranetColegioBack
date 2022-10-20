
const fs = require('fs')

const { handleHttpError } = require('../utils/handleError')
const { encrypt, compare } = require('../utils/handlePassword');
const { tokenSign } = require('../utils/handleJwt')
const {Usuarios, Docentes, Estudiantes, Roles} = require('../sequelize/models')


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

        const check = await compare(req.body.contraseña, user.contrasena)

        if(!check){
            handleHttpError(res, "PASSWORD_INVALID",401);
            return
        }
        
        let dataUser = {
            nombre:'Administrador',
            apellido: 'Administrador'
        }

        switch (user.idRol) {
            case 1:

                break;
            case 2:
                dataUser = await Docentes.findOne({
                    where: {idUsuario:user.id},
                    attributes: {exclude: ['idDocente']}
                })
                break;
            case 3:
                dataUser = await Estudiantes.findOne({
                    where: {idUsuario:user.id},
                    attributes: {exclude: ['idEstudiante','idSeccion']}
                })
                break; 
        }


        user.set('contrasena', undefined, {strict:false})

        const data = {
            token: await tokenSign(user),
            user,
            dataUser
        }


        res.send({data});


    } catch (e) {
        handleHttpError(res, "ERROR_LOGIN_USER" + e);
    }

}


module.exports = { loginCtrl }
