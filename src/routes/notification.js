// Importaciones necesarias
const express = require('express');
const router = express.Router();
const auth = require('../middleware/session');
const controllerNotification = require('../controllers/notification')

// Definicio de rutas

router.get('', auth.authMiddleware, controllerNotification.getNotification)

router.post('/desactivate', auth.authMiddleware, controllerNotification.desacNotification)

// Exportamos todas las rutas
module.exports = router; 