// Importaciones necesarias
const express = require('express');
const router = express.Router();

const auth = require('../middleware/session');
const controllerClassroom = require('../controllers/classroom')

// Definicio de rutas

router.get('', controllerClassroom.allClassroom)

router.get('/schedule', controllerClassroom.scheduleClassroom)

router.post('/create', auth.authMiddlewareAdmin, controllerClassroom.createClassroom)

// Exportamos todas las rutas
module.exports = router; 