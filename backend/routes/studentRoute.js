const express = require('express')
const {
    insertStudentsFromExcel,
    makePlacement,
    getAllStudents,
    deleteStudent,
    getStudentById,
    updateStudentById

} = require('../controllers/studentController')
const upload = require('../config/multer')
const router = express.Router()

router.post('/insert',upload.single('file'), insertStudentsFromExcel)
router.post('/placement', makePlacement)
router.get('/get', getAllStudents)
router.get('/get/:id', getStudentById)
router.put('/update', updateStudentById)
router.delete('/delete', deleteStudent)


module.exports = router