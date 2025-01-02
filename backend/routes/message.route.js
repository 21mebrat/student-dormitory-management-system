const express = require('express')
const { sendMessage, getMessage, deleteMessage } = require('../controllers/message.controller')

const router = express.Router()

router.post('/post',sendMessage)
router.get('/get',getMessage)
router.delete('/delete/:id',deleteMessage)

module.exports = router