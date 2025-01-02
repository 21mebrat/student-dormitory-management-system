const express = require('express')
const {
    register,
    updateUser,
    getUserById,
    getAllUser,
    deleteUser,
    backupUsers,
    createBackup,
    restoreBackup,
    login,
    logout
} = require('../controllers/userController')
const upload = require('../config/multer')
const Authenticate = require('../middleware/auth')
const authorizeRole = require('../middleware/authorizeRole')
const router = express.Router()

router.post('/createbackup', createBackup)
router.post('/register', upload.single('file'),Authenticate, register)
router.post('/login', login)
router.patch('/update',Authenticate,authorizeRole(['user','admin']), updateUser)
router.get('/get/:id', getUserById)
router.get('/get', getAllUser)
router.get('/restore', restoreBackup)
router.get('/backup', backupUsers)
router.get('/logout', logout)
router.delete('/delete', deleteUser)

module.exports = router