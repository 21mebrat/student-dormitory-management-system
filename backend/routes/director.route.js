const express = require('express')
const {
     getDataAnalysis,
     AdminDataAnalysis

 } = require('../controllers/director.info.controller')
const { getAccount } = require('../controllers/director.controller')
const { getTotalStudents } = require('../controllers/directory.summary.controller')
const router = express.Router()

router.get('/get-data-analysis', getDataAnalysis)
router.get('/get-admin-data-analysis', AdminDataAnalysis)
router.get('/getby-userName/:userName', getAccount)
router.get('/summary', getTotalStudents)



module.exports = router