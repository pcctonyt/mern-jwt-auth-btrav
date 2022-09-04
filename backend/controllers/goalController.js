// best practice is to have the controller functions in a separate file
// the async await is to get along with the MongoDB Atlas and mongoose, uses try/catch instead of .then/catch, but he's using express's asyncHandler

const asyncHandler = require("express-async-handler")

//this has all of our mongoose methods for CRUD
const Goal = require("../models/goalModel")

// @desc    Get all of the goals in the database, after authentication, target the specific user's goals
// @route   GET /api/goals
// @access  Private, after authentication added
const getGoals = asyncHandler(async (req, res) => {
    //pass in an object if you don't want to get all of the goals
    const goals = await Goal.find()

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
        text: req.body.text
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

    await goal.remove()


    res.status(200).json({ id: req.params.id })
})

//still need to bring them in on the goalRoutes file
module.exports = {
    getGoals, setGoal, updateGoal, deleteGoal
}