const httpError = require("../middleware/httpError")
const Building = require("../models/buildingModel")
const Student = require("../models/studentModel")


// get total number of Students
const getTotalStudents = async (req, res, next) => {
    try {
        const totalStudents = await Student.find().countDocuments()
        const totalBuildings = await Building.find().countDocuments()
        const totalBuilding = await Building.find()
        let totalRooms = 0
        totalBuilding.forEach(room => {
            totalRooms += room.rooms.length
        })
        const activeUser = await Student.find({ status: { $in: ['Active'] } }).countDocuments()
        const inActiveUser = await Student.find({ status: { $in: ['InActive'] } }).countDocuments()
        const sampleStudents = await Student.aggregate([
            {$sample:{size:6}},
            {$sort:{createdAt:-1}}
        ])
        const activePercentage = (activeUser * 100) / totalStudents
        res.status(200).json({
            status: 'success',
            totalStudents: totalStudents ? totalStudents : 0,
            totalBuildings: totalBuildings ? totalBuildings : 0,
            totalRooms,
            inActiveUser: inActiveUser ? inActiveUser : 0,
            activeUser: activeUser ? activeUser : 0,
            activePercentage,
            sampleStudents:sampleStudents ? sampleStudents:[]
        })

    } catch (error) {
        console.log(error)
        next(new httpError(error.message, 500))
    }

}

module.exports = {
    getTotalStudents
}