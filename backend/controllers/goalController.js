// best practice is to have the controller functions in a separate file
// the async await is to get along with the MongoDB Atlas and mongoose, uses try/catch instead of .then/catch, but he's using express's asyncHandler

const asyncHandler = require("express-async-handler")

//this has all of our mongoose methods for CRUD
const Goal = require("../models/goalModel")
// at 47:01 done on 2nd video, this sets up one user not being able to update/delete another user's goals
const User = require("../models/userModel")

// @desc    Get all of the goals in the database, after authentication, target the specific user's goals
// @route   GET /api/goals
// @access  Private, after authentication added
// at 43:28 of second video, we now have the goals linked to the user model with the routes protected and the middleware protecting the user, we now only want that specific user's goals, hence the object being passed in below
const getGoals = asyncHandler(async (req, res) => {
    //pass in an object if you don't want to get all of the goals
    const goals = await Goal.find({ user: req.user.id })

    res.status(200).json(goals)
})

// @desc    Set a goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text) {
      res.status(400)
      throw new Error("Please add a text field")
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })


    res.status(200).json(goal)
})

// @desc    Update a goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    
    if(!goal) {
       res.status(400)
       throw new Error("Goal not found") 
    }

    const user = await User.findById(req.user.id)

    // Check for user
    if(!user) {
        res.status(401)
        throw new Error("User not found")
    }
    // to make sure that the logged-in user only changes that user's own goal(s)
    if(goal.user.toString() !== user.id ) {
        res.status(401)
        throw new Error("Updating not authorized for this user")
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedGoal)
})

// @desc    Delete a goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    
    if(!goal) {
       res.status(400)
       throw new Error("Goal not found") 
    }

    const user = await User.findById(req.user.id)

    // Check for user
    if(!user) {
        res.status(401)
        throw new Error("User not found")
    }
    // to make sure that the logged-in user only changes that user's own goal(s)
    if(goal.user.toString() !== user.id ) {
        res.status(401)
        throw new Error("Updating not authorized for this user")
    }

    await goal.remove()


    res.status(200).json({ id: req.params.id })
})

//still need to bring them in on the goalRoutes file
module.exports = {
    getGoals, setGoal, updateGoal, deleteGoal
}