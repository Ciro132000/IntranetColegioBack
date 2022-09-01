// Importaciones necesarias
const express = require('express');
const router = express.Router();

const controllerStudents = require('../controllers/students')

// Definicio de rutas

router.get('', controllerStudents.mainFunction)

router.post('/register', controllerStudents.registerStudens)

// Exportamos todas las rutas
module.exports = router; 