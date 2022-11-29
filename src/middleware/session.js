
const { handleHttpError } =require('../utils/handleError');
const { verifyToken } = require('../utils/handleJwt');

const authMiddlewareAdmin = async (req,res,next) =>{
    try {
        
        if(!req.headers.authorization){
            handleHttpError(res, "NOT_TOKEN", 401);
            return
        }

        // Omitir la palabra beard
        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        if(!dataToken){
            handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
            return
        }

        const role = dataToken.role;

        if(role === 1){
            next()
            return
        }else{
            handleHttpError(res, "USUARIO NO PERMITIDO", 401);
            return
        }

    } catch (error) {
        handleHttpError(res, "NOT_SESSION", 401);
    }
}

const authMiddleware = async (req,res,next) =>{
    try {
        
        if(!req.headers.authorization){
            handleHttpError(res, "NOT_TOKEN", 401);
            return
        }

        // Omitir la palabra beard
        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        if(!dataToken){
            handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
            return
        }

        next()

    } catch (error) {
        handleHttpError(res, "NOT_SESSION", 401);
    }
}

const authMiddlewareDocente = async (req,res,next) =>{
    try {
        
        if(!req.headers.authorization){
            handleHttpError(res, "NOT_TOKEN", 401);
            return
        }

        // Omitir la palabra beard
        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        if(!dataToken){
            handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
            return
        }

        const role = dataToken.role;

        if(role === 2){
            next()
            return
        }else{
            handleHttpError(res, "USUARIO NO PERMITIDO", 401);
            return
        }

    } catch (error) {
        handleHttpError(res, "NOT_SESSION", 401);
    }
}

const authMiddlewareAlumno = async (req,res,next) =>{
    try {
        
        if(!req.headers.authorization){
            handleHttpError(res, "NOT_TOKEN", 401);
            return
        }

        // Omitir la palabra beard
        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        if(!dataToken){
            handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
            return
        }

        const role = dataToken.role;

        if(role === 3){
            next()
            return
        }else{
            handleHttpError(res, "USUARIO NO PERMITIDO", 401);
            return
        }

    } catch (error) {
        handleHttpError(res, "NOT_SESSION", 401);
    }
}


module.exports = { authMiddlewareAdmin, authMiddlewareDocente, authMiddlewareAlumno, authMiddleware }