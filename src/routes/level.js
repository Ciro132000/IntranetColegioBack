// Importaciones necesarias
const express = require('express');
const router = express.Router();

const controllerallLevel = require('../controllers/level')

// Definicio de rutas

router.get('', controllerallLevel.allLevels)

// Exportamos todas las rutas
module.exports = router; 