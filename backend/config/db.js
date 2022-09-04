const mongoose = require("mongoose")

//connecting to the MongoDB Atlas database, all mongoose methods are asynchronous
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB