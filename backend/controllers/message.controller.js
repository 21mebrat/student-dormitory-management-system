const httpError = require("../middleware/httpError")
const messageModel = require("../models/message.model")

const sendMessage = async (req, res, next) => {
    const { fullName, email, studentId, message } = req.body
    try {
        const newMessage = new messageModel({
            fullName,
            email,
            studentId,
            message
        })
        await newMessage.save()
        res.status(200).json({ message: 'Your request is successfully send.' })
    } catch (error) {
        next(new httpError(error.message, 500))
    }


}
const getMessage = async (req, res, next) => {
  try{ 
    const message = await messageModel.find({})
        res.status(200).json(message)
    } catch (error) {
        next(new httpError(error.message, 500))
    }


}
const deleteMessage = async (req, res, next) => {
    const {id} = req.params
  try{ 
  await messageModel.findByIdAndDelete(id)
        res.status(200).json({
            message:'The message deleted successfully',
            status:'success'
        })
    } catch (error) {
        next(new httpError(error.message, 500))
    }


}
module.exports = { sendMessage,getMessage,deleteMessage }