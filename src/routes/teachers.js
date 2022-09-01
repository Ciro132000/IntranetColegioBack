// Importaciones necesarias
const express = require('express');
const router = express.Router();

const controllerTeachers = require('../controllers/teachers')

// Definicio de rutas

router.get('', controllerTeachers.mainFunction)

router.post('/register', controllerTeachers.registerTeacher)

// Exportamos todas las rutas
module.exports = router; 