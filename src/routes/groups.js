const express = require('express');
const router = express.Router();

const auth = require('../middleware/session');
const controllerGroups = require('../controllers/groups')

// Definicio de rutas
router.post('/create', auth.authMiddlewareDocente, controllerGroups.create)

router.post('/asing', auth.authMiddlewareDocente, controllerGroups.asing)

router.get('',  auth.authMiddleware,controllerGroups.getSection)

router.get('/students', auth.authMiddleware, controllerGroups.getStudents)

// Exportamos todas las rutas
module.exports = router; 