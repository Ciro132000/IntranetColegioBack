const express = require('express');
const router = express.Router();


const anunciosController = require('../controllers/announcements')

router.post('/create', anunciosController.create )

router.get('', anunciosController.getSection )

module.exports = router; 