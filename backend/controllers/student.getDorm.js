const httpError = require("../middleware/httpError")
const Student = require("../models/studentModel")

const getDorm = async (req, res, next) => {
    const { id } = req.body
    console.log(id)
    try {
        const studentDorm = await Student.findById(id)
        if(!studentDorm) return next(new httpError('No Student with this id tray again.'))
        res.status(200).json(studentDorm)
    } catch (error) {
        next(new httpError(error.message, 500))
    }

}

module.exports = {
    getDorm
}