const express = require('express');
const router = express.Router();


const assistanceController = require('../controllers/assistance')

router.post('/register', assistanceController.registrarAsistencia )

router.get('/verify', assistanceController.verificarAsistencia )

module.exports = router; 