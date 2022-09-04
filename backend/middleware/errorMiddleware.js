// middleware are functions that execute during the request response cycle, this one is to change express's default display of the error in the HTML body, 500 is a server error
const errorHandler = (err, req, res, next) => {
    // if the status code is there, we use it, if not, do a 500
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)
    // using the built-in error message instead and the stack trace if we are in development mode, in production mode we would get null instead
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    })
}

module.exports = {
    errorHandler,
}