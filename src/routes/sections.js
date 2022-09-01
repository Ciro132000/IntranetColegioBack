// Importaciones necesarias
const express = require('express');
const router = express.Router();

const controllerSections = require('../controllers/sections')

// Definicio de rutas

router.get('', controllerSections.mainFunction)

// Exportamos todas las rutas
module.exports = router; 