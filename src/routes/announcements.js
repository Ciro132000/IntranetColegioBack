const express = require('express');
const router = express.Router();

const auth = require('../middleware/session');
const anunciosController = require('../controllers/announcements')

router.post('/create', auth.authMiddlewareDocente , anunciosController.create )

router.get('', auth.authMiddleware ,anunciosController.getSection )

module.exports = router; 