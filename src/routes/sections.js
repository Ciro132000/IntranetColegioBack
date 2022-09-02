// Importaciones necesarias
const express = require('express');
const router = express.Router();

const controllerSections = require('../controllers/sections')

// Definicio de rutas

router.get('', controllerSections.mainFunction)

router.post('/register', controllerSections.registerSection)

router.post('/assign', controllerSections.assignSection)

router.post('/assign/schedule', controllerSections.assignSchedule)

// Exportamos todas las rutas
module.exports = router; 