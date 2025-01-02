const ExcelJS = require('exceljs');
const Building = require('../models/buildingModel');
const httpError = require('../middleware/httpError');

// Function to read Excel and insert building data into MongoDB
const insertBuildingFromExcel = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'File not provided' });
        }

        const file = req.file;
        const workbook = new ExcelJS.Workbook();

        await workbook.xlsx.readFile(file.path);

        const worksheet = workbook.worksheets[0];

        const buildingData = [];
        worksheet.eachRow((row, rowIndex) => {
            if (rowIndex === 1) return;

            const building = {
                name: row.getCell(1).value,
                location: row.getCell(2).value,
                totalFloors: row.getCell(3).value,
                capacity: row.getCell(4).value,
                amenities: row.getCell(5).value,
                status: row.getCell(6).value || 'Active',
                manager: {
                    name: row.getCell(7).value,
                    contact: row.getCell(8).value,
                },
            };

            buildingData.push(building);
        });

        const insertedBuildings = await Building.insertMany(buildingData);

        res.status(200).json({
            message: 'Building data uploaded successfully',
            insertedCount: insertedBuildings.length,
        });
    } catch (error) {
        console.error('Error inserting building data:', error);
        res.status(500).json({ message: 'Failed to upload data' });
    }
};

// Function to get all buildings
const getAllBuildings = async (req, res, next) => {
    try {
        const buildings = await Building.find();

        if (!buildings || buildings.length === 0) {
            return next(new httpError('No buildings found', 404));
        }

        res.status(200).json(buildings);
    } catch (error) {
        next(new httpError(error.message, 500));
    }
};

// Function to get a single building by ID
const getBuildingById = async (req, res, next) => {
    try {
        const buildingId = req.params.id;

        const building = await Building.findById(buildingId);

        if (!building) {
            return next(new httpError('Building not found', 404));
        }

        res.status(200).json(building);
    } catch (error) {
        next(new httpError(error.message, 500));
    }
};

// Function to update building data
const updateBuilding = async (req, res, next) => {
    try {
        const updatedBuilding = await Building.findByIdAndUpdate(req.body.id, {...req.body}, { new: true });

        if (!updatedBuilding) {
            return next(new httpError('Building not found', 404));
        }

        res.status(200).json({ message: 'Building updated successfully', building: updatedBuilding });
    } catch (error) {
        next(new httpError(error.message, 500));
    }
};

// Function to delete a building
const deleteBuilding = async (req, res, next) => {
    try {

        const deletedBuilding = await Building.findByIdAndDelete(req.body.id);

        if (!deletedBuilding) {
            return next(new httpError('Building not found', 404));
        }

        res.status(200).json({ message: 'Building deleted successfully',});
    } catch (error) {
        next(new httpError(error.message, 500));
    }
};

module.exports = {
    insertBuildingFromExcel,
    getAllBuildings,
    getBuildingById,
    updateBuilding,
    deleteBuilding,
};
