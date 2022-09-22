const express = require('express');
const router = express.Router();

const controllerForos = require('../controllers/foros')

// Definicio de rutas
router.post('/create', controllerForos.createForo)

router.get('/search', controllerForos.main)

router.get('/responses', controllerForos.foroRespuesta)

router.post('/respuesta', controllerForos.Respuesta)


// Exportamos todas las rutas
module.exports = router; 