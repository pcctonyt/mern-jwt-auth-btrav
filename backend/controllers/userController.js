const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
//the asyncHandler wrap handles exceptions
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

// @desc    Register a new user
// @route   POST /api/users
// @access  Public, can't access a protected route without login, can't login without being registered

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    //Check existence of user, we can't register a user already there, so we throw an error
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    //Hash the password with bcrypt, 10 is the default
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create a new user, give that user's object the same properties with the password hashed
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }

    res.json({message: "Register a new User"})
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
// do the login before token authentication, since the token will get sent for new and returning users both
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({email})
    // the password is hashed in the MongoDB, so we compare it to the password the user types in, which would not be hashed, by passing it in to .compare with that user, and we send the same data back they registered with in the .json, match the email and password with the data
    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error("Invalid credentials")
    }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
// protect routes coding starts at 30:02 second video at this getMe function public now changes to private, by creating a new middleware function called authMiddleware.js to check the token and keep the route protected
const getMe = asyncHandler(async (req, res) => {
    res.json({message: "Display user data"})
})

//create a separate function to get used both in register and in login
//This function will generate the JWT token
//The id gets passed in to this function as well as the id as payload and that new secret variable, and then a third parameter for the time expiration in the .sign method
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    })
}

module.exports = {
    registerUser, loginUser, getMe,
}