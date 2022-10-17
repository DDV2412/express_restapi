const express = require('express');
const chatController = require('../controller/chat')
const authorize = require('../helpers/jwt')

const router = express.Router()

router.get('/', authorize, chatController.get_chats)

module.exports = router