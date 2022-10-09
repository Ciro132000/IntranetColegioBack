// Importaciones necesarias
const express = require('express');
const router = express.Router();

const controllerSections = require('../controllers/sections')

// Definicio de rutas

router.get('', controllerSections.mainFunction)

router.get('/search', controllerSections.searchSection)

router.post('/register', controllerSections.registerSection)

router.post('/assign', controllerSections.assignSection)

router.post('/assign/schedule', controllerSections.assignSchedule)

router.get('/schedule', controllerSections.Schedule)

router.get('/classroom', controllerSections.allSectionClassroom)

router.get('/students', controllerSections.getStudents)

// Exportamos todas las rutas
module.exports = router; 