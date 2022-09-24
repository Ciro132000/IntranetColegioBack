// Importaciones necesarias
const express = require('express');
const router = express.Router();

const controllerClassroom = require('../controllers/classroom')

// Definicio de rutas

router.get('', controllerClassroom.allClassroom)

router.get('/schedule', controllerClassroom.scheduleClassroom)

router.post('/create', controllerClassroom.createClassroom)

// Exportamos todas las rutas
module.exports = router; 