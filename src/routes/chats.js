const express = require('express');
const router = express.Router();


const chatController = require('../controllers/chats')

router.get('', chatController.getChats)

router.get('/list', chatController.listUsers)

router.post('/sendMessage', chatController.sendMessage)

router.get('/chat', chatController.getChat)

module.exports = router; 