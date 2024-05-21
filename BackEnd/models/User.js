const mongoose = require('../config/config')
const uuid = require('uuid')
const User = mongoose.Schema({
    id: {
        type: String,
        default: uuid.v4()
    },
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    readHistory: {
        type: Array
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, {
    collection: "User"
})

module.exports = mongoose.model("User", User, "Users")
