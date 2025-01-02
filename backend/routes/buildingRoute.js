const express = require('express');
const {
    insertBuildingFromExcel,
    getAllBuildings,
    getBuildingById,
    updateBuilding,
    deleteBuilding,
} = require('../controllers/buildingController');
const upload = require('../config/multer');
const router = express.Router();

// Route to insert buildings from Excel file
router.post('/insert', upload.single('file'), insertBuildingFromExcel);

// Route to get all buildings
router.get('/get', getAllBuildings);

// Route to get a building by ID
router.get('/get/:id', getBuildingById);

// Route to update a building by ID
router.put('/update', updateBuilding);

// Route to delete a building by ID
router.delete('/delete', deleteBuilding);

module.exports = router;
