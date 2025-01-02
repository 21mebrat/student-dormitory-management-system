const multer = require('multer');
const path = require('path')
const fs = require('fs')
// Set up multer storage and file naming options
const uploadPath = path.join(__dirname, '..', 'uploads')
try {
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath)
    }
} catch (error) {
    console.log(error)
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath); // The folder to store the uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname); // Set a unique name for the file
    },
});

const upload = multer({ storage: storage });
module.exports = upload
