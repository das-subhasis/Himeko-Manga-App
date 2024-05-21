const User = require('../models/User')
const bcrypt = require('bcrypt')
const generateToken = require('../utils/generateToken')

const signUpHandler = async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    const foundUser = await User.findOne({ email: email })

    if (foundUser) {
        return res.status(400).json({ message: "User already exists" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        readHistory: []
    })

    if (user) {
        return res.status(201).json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            readHistory: user.readHistory,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Something happened!!")
    }
}

const loginHandler = async (req, res) => {
    const { email, password } = req.body

    const foundUser = await User.findOne({ email })

    if (!foundUser || !(await bcrypt.compare(password, foundUser.password))) {
        return res.status(400).json({ message: "Invalid Email or Password" })
    }

    return res.status(200).json({
        user: {
            _id: foundUser._id,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            email: foundUser.email,
            readHistory: foundUser.readHistory
        },
        token: generateToken(foundUser._id)
    })
}

module.exports = { loginHandler, signUpHandler }