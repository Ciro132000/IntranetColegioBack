const express = require('express');
const router = express.Router();

const controllerGroups = require('../controllers/groups')

// Definicio de rutas
router.post('/create', controllerGroups.create)

router.post('/asing', controllerGroups.asing)

router.get('', controllerGroups.getSection)

router.get('/students', controllerGroups.getStudents)

// Exportamos todas las rutas
module.exports = router; 