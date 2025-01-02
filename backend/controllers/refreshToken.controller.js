const jwt = require("jsonwebtoken")
const httpError = require("../middleware/httpError")
const userModel = require("../models/userModel")
require('dotenv').config()

const handleRefrsh = async (req, res, next) => {
    const cookie = req.cookies
    if (!cookie) return res.sendStatus(403)
    const refreshToken = cookie.Token
    try {
        const user = userModel.findOne({ refreshToken })
        if (!user) return res.sendStatus(403)
        await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
            if (err || !await userModel.findOne({ userName: user?.userInfo?.userName })) {
                return res.sendStatus(403)
            }
            const userInfo = user.userInfo
            const accessToken = await jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
            res.status(200).json({
                ...user._doc,
                password: undefined,
                refreshToken: undefined,
                accessToken

            })
        })

    } catch (error) {
        console.log(error)
        next(new httpError(error.message, 500))
    }
}

module.exports = handleRefrsh