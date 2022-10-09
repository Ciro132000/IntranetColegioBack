// Importaciones necesarias
const express = require('express');
const router = express.Router();

const controllerStudents = require('../controllers/students')

// Definicio de rutas

router.get('', controllerStudents.mainFunction)

router.post('/register', controllerStudents.registerStudens)

router.get('/searchSection', controllerStudents.studentsSection)

router.get('/notas', controllerStudents.notasSection)

router.get('/pendientes', controllerStudents.actividadesPendientes)

router.get('/historial', controllerStudents.historial)

// Exportamos todas las rutas
module.exports = router; 