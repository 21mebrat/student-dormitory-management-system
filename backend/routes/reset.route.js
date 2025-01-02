const express = require('express')
const { passwordReset, changePassword } = require('../controllers/reset.controller')
const resetAuth = require('../middleware/resetAuth')

const router = express.Router()

router.post('/post/:email', passwordReset)
router.post('/post/change/:token',resetAuth, changePassword)

module.exports = router