const express = require('express');
const router = express.Router();

const auth = require('../middleware/session');
const chatController = require('../controllers/chats')

router.get('', chatController.getChats)

router.get('/list', auth.authMiddleware, chatController.listUsers)

router.post('/sendMessage', auth.authMiddleware, chatController.sendMessage)

router.get('/chat', auth.authMiddleware, chatController.getChat)

module.exports = router; 