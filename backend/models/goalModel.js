//the models are for anything you have in your app blogs, etc., we define the Schema which is the fields in the object being passed in for this particular resource, the mongoose model makes it easier to work with MongoDB Atlas when it has its Schema object set up
//for every goal we have to know which user created that goals
const mongoose = require("mongoose");

const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    text: {
        type: String,
        required: [true, "Please add a text value"]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Goal", goalSchema )
