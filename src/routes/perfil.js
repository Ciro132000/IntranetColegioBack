// Importaciones necesarias
const express = require('express');
const router = express.Router();

const controllerPerfil = require('../controllers/perfil')

// Definicio de rutas

router.post('', controllerPerfil.modificarPerfil)

router.post('/alumno', controllerPerfil.modificarAlumno)

router.post('/docente', controllerPerfil.modificarAlumno)

router.get('', controllerPerfil.datosUsuario)

// Exportamos todas las rutas
module.exports = router; 