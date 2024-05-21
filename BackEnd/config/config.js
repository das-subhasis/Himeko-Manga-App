require('dotenv').config();
const mongoose = require('mongoose')

mongoose.connect(`${process.env.VITE_MONGO_URI}/Himeko`, {
    connectTimeoutMS: 5000
})

mongoose.connection.on("success", () => {
    console.log("connected to MongoDb")
})

mongoose.connection.on("error", (error) => {
    console.log(`MongoDB connection errror: ${error}`)
})

module.exports = mongoose