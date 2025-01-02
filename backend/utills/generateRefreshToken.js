const jwt = require('jsonwebtoken')
require('dotenv').config()
const httpError = require('../middleware/httpError')

module.exports = async (userInfo,next) => {
    try {
        return await jwt.sign(userInfo, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1h' })
    } catch (error) {
        next(new httpError(error.message, 500))  
    }

}
