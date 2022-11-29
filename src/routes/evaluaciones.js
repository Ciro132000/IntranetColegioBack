// Importaciones necesarias
const express = require('express');
const router = express.Router();

const auth = require('../middleware/session');
const controllerEvaluaciones = require('../controllers/evaluaciones')

// Definicio de rutas

router.post('/crearExamen', auth.authMiddlewareDocente, controllerEvaluaciones.createExamen)

router.post('/crearTarea', auth.authMiddlewareDocente, controllerEvaluaciones.createTarea)

router.get('/tipos', auth.authMiddleware, controllerEvaluaciones.tiposEvaluacion)

router.get('/todos', auth.authMiddleware, controllerEvaluaciones.allSection)

router.post('/reprogramar', auth.authMiddlewareDocente, controllerEvaluaciones.reprogramarEvaluacion)

router.get('/getContent', auth.authMiddleware, controllerEvaluaciones.getContent)

router.post('/respuestaExamen', auth.authMiddlewareAlumno, controllerEvaluaciones.respuestaExamen)

router.post('/respuestaTarea', auth.authMiddlewareAlumno, controllerEvaluaciones.respuestaTarea)

router.get('/verificarExamen', auth.authMiddleware, controllerEvaluaciones.verficarExamen)

router.get('/verificarTarea', auth.authMiddleware, controllerEvaluaciones.verficarTarea) 

router.get('/verRespuestas', auth.authMiddleware, controllerEvaluaciones.traerRespuestas) 

router.post('/calificarExamen', auth.authMiddlewareDocente, controllerEvaluaciones.calificarExamen)

router.post('/calificarTarea', auth.authMiddlewareDocente, controllerEvaluaciones.calificarTarea)

router.get('/notas', auth.authMiddleware, controllerEvaluaciones.notasAlumnos)

router.get('/todosNotas', auth.authMiddleware, controllerEvaluaciones.todasNotas)

router.post('/rectificarNota', auth.authMiddlewareDocente, controllerEvaluaciones.rectificarNotas)

// Exportamos todas las rutas
module.exports = router; 