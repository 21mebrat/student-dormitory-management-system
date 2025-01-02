const userModel = require("../models/userModel")

const getAccount = async (req, res, next) => {
    const { userName } = req.params
    console.log(userName,'getAccount')
    try {
        const account = await userModel.findOne({ userName }).select('-password')
        res.status(200).json(account)
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log(error)
    }
}

module.exports = {
    getAccount
}