const mongoose = require('mongoose')
const messageSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,

    },
    studentId: {
        type: String,
        ref: 'students'
    },
    senderInfo: {
        type: mongoose.Types.ObjectId,
        ref: 'students'
    },
    message:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const messageModel = mongoose.model('message',messageSchema)
module.exports = messageModel