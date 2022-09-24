// Importaciones necesarias
const express = require('express');
const router = express.Router();

const controllerEvaluaciones = require('../controllers/evaluaciones')

// Definicio de rutas

router.post('/crearExamen', controllerEvaluaciones.createExamen)

router.post('/crearTarea', controllerEvaluaciones.createTarea)

router.get('/tipos', controllerEvaluaciones.tiposEvaluacion)

router.get('/todos', controllerEvaluaciones.allSection)

router.post('/reprogramar', controllerEvaluaciones.reprogramarEvaluacion)
// Exportamos todas las rutas
module.exports = router; 