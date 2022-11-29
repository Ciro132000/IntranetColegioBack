// Importaciones necesarias
const express = require('express');
const router = express.Router();

const auth = require('../middleware/session');
const controllerTeachers = require('../controllers/teachers')

// Definicio de rutas

router.get('', auth.authMiddleware, controllerTeachers.allTeachers)

router.post('/register', auth.authMiddlewareAdmin, controllerTeachers.registerTeacher)

router.get('/schedule', auth.authMiddleware, controllerTeachers.scheduleTeacher)

router.get('/sections', auth.authMiddleware, controllerTeachers.sections)

// Exportamos todas las rutas
module.exports = router; 