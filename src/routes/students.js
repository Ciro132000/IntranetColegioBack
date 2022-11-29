// Importaciones necesarias
const express = require('express');
const router = express.Router();

const auth = require('../middleware/session');
const controllerStudents = require('../controllers/students')

// Definicio de rutas

router.get('',auth.authMiddleware,  controllerStudents.mainFunction)

router.post('/register', auth.authMiddlewareAdmin, controllerStudents.registerStudens)

router.get('/searchSection',auth.authMiddleware,  controllerStudents.studentsSection)

router.get('/notas', controllerStudents.notasSection)

router.get('/pendientes', auth.authMiddleware,  controllerStudents.actividadesPendientes)

router.get('/historial', auth.authMiddleware,  controllerStudents.historial)

// Exportamos todas las rutas
module.exports = router; 