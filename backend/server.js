const express = require("express");
const colors = require("colors")
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db")
const port = process.env.PORT || 5000

connectDB()

const app = express()

//adding middleware for the text body of the new goal to make the postman options work
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/goals", require("./routes/goalRoutes"))
app.use("/api/users", require("./routes/userRoutes"))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))


/* MongoDB's oSQL documents-database has collections, which are like tables in a relational database -- 1ST AND SECOND VIDEOS NOW BOTH DONE -- (25:47 second video is where the jwt token stuff starts, and 28:32 is where he starts testing the token coding in Postman) new git repo set up with the backupPostman.txt file, to prevent having to restart from the beginning again if further problems develop*/