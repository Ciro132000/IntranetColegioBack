const express = require('express');
const router = express.Router();

const auth = require('../middleware/session');
const controllerForos = require('../controllers/foros')

// Definicio de rutas
router.post('/create', auth.authMiddlewareDocente, controllerForos.createForo)

router.get('/search', auth.authMiddleware, controllerForos.main)

router.get('/responses', auth.authMiddleware, controllerForos.foroRespuesta)

router.post('/respuesta', auth.authMiddleware, controllerForos.Respuesta)


// Exportamos todas las rutas
module.exports = router; 