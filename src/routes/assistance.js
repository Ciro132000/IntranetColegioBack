const express = require('express');
const router = express.Router();

const auth = require('../middleware/session');
const assistanceController = require('../controllers/assistance')

router.post('/register', auth.authMiddlewareDocente, assistanceController.registrarAsistencia )

router.get('/verify', auth.authMiddlewareDocente ,assistanceController.verificarAsistencia )

module.exports = router; 