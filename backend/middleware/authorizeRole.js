const httpError = require("./httpError")

const authorizeRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.userInfo) return next(httpError('Please loin Firest', 401))
        const isLegal = allowedRoles.includes(req?.userInfo?.role)
        if (!isLegal) return next(httpError('please login with allowed Account only', 401))
        next()
    }
}

module.exports = authorizeRole