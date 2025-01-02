const express = require('express')
require('dotenv').config()
const dbConnection = require('./config/db')
const userRouter = require('./routes/userRoute')
const studentRouter = require('./routes/studentRoute')
const buildingRouter = require('./routes/buildingRoute')
const directorRouter = require('./routes/director.route')
const messageRouter = require('./routes/message.route')
const resetRouter = require('./routes/reset.route')
const studentDormRouter = require('./routes/student.getDorm.route')
const path = require('path')
const cookie = require('cookie-parser')
const cors = require('cors')
const handleRefrsh = require('./controllers/refreshToken.controller')

const app = express()
//Global Middleware  
app.use(express.static('upload'))
app.use(express.json())
// Backend - Express example
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cookie())
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))
// app router
app.use('/api/user', userRouter)
app.use('/api/student', studentRouter)
app.use('/api/building', buildingRouter)
app.use('/api/director', directorRouter)
app.use('/api/student-dorm', studentDormRouter)
//message route
app.use('/api/message', messageRouter)
// password -reset route
app.use('/api/reset', resetRouter)
// generate refreshToken
app.get('/api/refresh', handleRefrsh)


//Error Middleware

app.use((err, req, res, next) => {
    if (err.isOperational) {
        err.status = err.status || 'error'
        err.statusCode = err.statusCode || 500
        err.message = err.message
        res.status(err.statusCode).json({ status: err.status, message: err.message })
    } else {
        res.status(500).json({ status: err.status, message: 'Something go wrong.' })
    }
})
const appConfigure = () => {
    try {
        app.listen(process.env.PORT, () => console.log('server runing on port ' + process.env.PORT))
        dbConnection()
        console.log('db connects successfully.')
    } catch (error) {
        console.log('configure error', error)
    }
}
appConfigure()