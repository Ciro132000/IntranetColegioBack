// Importaciones necesarias
const express = require('express');
const router = express.Router();
const auth = require('../middleware/session');
const controllerPerfil = require('../controllers/perfil')

// Definicio de rutas

router.post('', auth.authMiddleware, controllerPerfil.modificarPerfil)

router.post('/alumno', auth.authMiddleware, controllerPerfil.modificarAlumno)

router.post('/docente', auth.authMiddleware, controllerPerfil.modificarAlumno)

router.get('', auth.authMiddleware, controllerPerfil.datosUsuario)

// Exportamos todas las rutas
module.exports = router; 