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

router.get('/getContent', controllerEvaluaciones.getContent)

router.post('/respuestaExamen', controllerEvaluaciones.respuestaExamen)

router.post('/respuestaTarea', controllerEvaluaciones.respuestaTarea)

router.get('/verificarExamen', controllerEvaluaciones.verficarExamen)

router.get('/verificarTarea', controllerEvaluaciones.verficarTarea) 

router.get('/verRespuestas', controllerEvaluaciones.traerRespuestas) 

router.post('/calificarExamen', controllerEvaluaciones.calificarExamen)

router.post('/calificarTarea', controllerEvaluaciones.calificarTarea)

router.get('/notas', controllerEvaluaciones.notasAlumnos)

router.get('/todosNotas', controllerEvaluaciones.todasNotas)

router.post('/rectificarNota', controllerEvaluaciones.rectificarNotas)

// Exportamos todas las rutas
module.exports = router; 