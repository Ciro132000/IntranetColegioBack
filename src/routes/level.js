// Importaciones necesarias
const express = require('express');
const router = express.Router();

const controllerallLevel = require('../controllers/level')
const auth = require('../middleware/session');

// Definicio de rutas

router.get('', auth.authMiddleware, controllerallLevel.allLevels)

// Exportamos todas las rutas
module.exports = router; 