// Importaciones necesarias
const express = require('express');
const router = express.Router();

const controllerTeachers = require('../controllers/teachers')

// Definicio de rutas

router.get('', controllerTeachers.allTeachers)

router.post('/register', controllerTeachers.registerTeacher)

router.get('/schedule', controllerTeachers.scheduleTeacher)

router.get('/sections', controllerTeachers.sections)

// Exportamos todas las rutas
module.exports = router; 