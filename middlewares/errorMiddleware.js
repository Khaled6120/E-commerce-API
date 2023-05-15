const ApiError = require("../utils/apiError")

const handleJwtInvalidSignature = () => new ApiError("Invalid token , please login again...", 401)
const handleJwtExpired = () => new ApiError("JWT expired, please login again..", 401)

const globalError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"

    if (process.env.NODE_ENV === 'development') {
        sendErrorForDev(err, res)
    } else {
        if (err.name === 'JsonWebTOkenError') err = handleJwtInvalidSignature()
        if (err.name === 'TokenExpiredError') err = handleJwtExpired()

        sendErrorForProduction(err, res)
    }


}


const sendErrorForDev = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

const sendErrorForProduction = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    })
}



module.exports = globalError