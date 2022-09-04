const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

//this is the protect variable to get passed in to the routes to protect them, the next parameter being passed in here is so it can execute the next middleware function awaiting
const protect = asyncHandler(async (req, res, next) => {
    let token

    //checking to see if it is a Bearer token, which it needs to be
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from header, split turns it into an array by the whitespace character after Bearer, the 0 index, and the actual token, the 1 index
            token = req.headers.authorization.split(" ")[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get which user it is from the token, so we can get the user on any of the protected routes, the id is in the decoded object we get from above code, this gets it from the token payload from the generateToken function, and we can put anything we want in there, but they have to match -- we don't want the hashed version of the password, however, the -password string excludes it
            req.user = await User.findById(decoded.id).select("-password")

            next()
        } catch (error) {
            console.log(error);
            res.status(401) //for a not authorized response
            throw new Error("Not authorized, token is there but doesn't match")
        }
    }

    if(!token) {
        res.status(401)
        throw new Error("Not authorized -- token isn't there at all")
    }
})

module.exports = { protect }
