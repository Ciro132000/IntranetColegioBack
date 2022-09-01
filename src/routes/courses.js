// Importaciones necesarias
const express = require('express');
const router = express.Router();

const controllerCourses = require('../controllers/courses')

// Definicio de rutas

router.get('', controllerCourses.allCourses)

// Exportamos todas las rutas
module.exports = router; 