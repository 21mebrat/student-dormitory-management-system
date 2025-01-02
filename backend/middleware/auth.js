const jwt = require("jsonwebtoken")
const httpError = require("./httpError")

const Authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader) return next(new httpError('The auth header are not sent', 403))
    const token = authHeader.split(' ')[1]
    if (!token) return next(new httpError('empty token', 403))

    try {
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if (!decoded) return next(new httpError('Expired token', 403))
        req.userInfo = decoded.userInfo
        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            // If token expired, return a 403 status with an appropriate message
            return next(new httpError('Expired token', 403))
        }

        // For any other errors (e.g., invalid token), return a 500 error
        console.log(error)
        return next(new httpError(error.message || 'Something went wrong', 500))
    }
}


module.exports = Authenticate