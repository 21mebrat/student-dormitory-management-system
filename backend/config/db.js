const mongoose = require('mongoose')

module.exports =  dbConnection = () => {
    try {
        mongoose.connect(process.env.DB_CONNCTION_STRING)
    } catch (error) {
        console.log('mongoose db connection error', error)
    }
}