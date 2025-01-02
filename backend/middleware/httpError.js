class httpError extends Error{
    constructor(message,statusCode){
        super(message)
        this.status = `${statusCode}`.startsWith(4) ? 'fails':'error'
        this.isOperational = true
        this.statusCode = statusCode
        Error.captureStackTrace(this,this.constructor)
    }

}

module.exports = httpError