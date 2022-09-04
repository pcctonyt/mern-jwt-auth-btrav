//each resource in your API has its own route file
const express = require("express")
const router = express.Router()
const { getGoals, setGoal, updateGoal, deleteGoal } = require("../controllers/goalController")


//to get around the first 404 not found response, now sends the get goals message
router.get("/", getGoals )

//to create a goal
router.post("/", setGoal)

//to update an existing goal, need the goal's id
router.put("/:id", updateGoal)

//to delete a goal, need the goal's id
router.delete("/:id", deleteGoal)

module.exports = router