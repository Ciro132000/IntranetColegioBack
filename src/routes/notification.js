// Importaciones necesarias
const express = require('express');
const router = express.Router();

const controllerNotification = require('../controllers/notification')

// Definicio de rutas

router.get('', controllerNotification.getNotification)

router.post('/desactivate', controllerNotification.desacNotification)

// Exportamos todas las rutas
module.exports = router; 