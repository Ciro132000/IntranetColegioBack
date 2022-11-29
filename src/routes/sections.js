// Importaciones necesarias
const express = require('express');
const router = express.Router();

const auth = require('../middleware/session');
const controllerSections = require('../controllers/sections')

// Definicio de rutas

router.get('', auth.authMiddleware, controllerSections.mainFunction)

router.get('/search', auth.authMiddleware, controllerSections.searchSection)

router.post('/register', auth.authMiddlewareAdmin, controllerSections.registerSection)

router.post('/assign', auth.authMiddlewareAdmin, controllerSections.assignSection)

router.post('/assign/schedule',  auth.authMiddlewareAdmin, controllerSections.assignSchedule)

router.get('/schedule', auth.authMiddleware, controllerSections.Schedule)

router.get('/classroom', auth.authMiddleware, controllerSections.allSectionClassroom)

router.get('/students', auth.authMiddleware, controllerSections.getStudents)

// Exportamos todas las rutas
module.exports = router; 