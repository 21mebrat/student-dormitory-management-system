const express = require('express')
const { getDorm } = require('../controllers/student.getDorm')

const router = express.Router()

router.post('/get',getDorm)

module.exports = router