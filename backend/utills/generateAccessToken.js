const jwt = require('jsonwebtoken')
const httpError = require('../middleware/httpError')
require('dotenv').config()

module.exports = async (userInfo,next) => {
    try {
        return jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' })
    } catch (error) {
        next(new httpError(error.message, 500))
    }

}
