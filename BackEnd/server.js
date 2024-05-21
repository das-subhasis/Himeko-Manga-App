const express = require('express')
const User = require('./models/User')
const CORS = require('cors')
const { loginHandler, signUpHandler } = require('./controller/AuthController')
const app = express()
require('dotenv').config();
app.use(CORS())
app.use(express.json())

const PORT = process.env.REACT_PORT || 5000

// app.get('/user', (req, res) => {
//     try {
//         console.log(req.body)
//         const newUser = new User({
//             firstName: "Subhasis",
//             lastname: "Das",
//             email: "abc@gmail.com",
//             password: "poppy"
//         })
//         const saveNewUser = async () => {
//             const savedUser = await newUser.save()
//             res.status(500).json({ message: "connection successful", user: savedUser })
//         }
//         saveNewUser()
//     } catch (error) {
//         console.log(error)
//     }
// })

app.post('/user/login', loginHandler)
app.post('/user/signin', signUpHandler)

app.listen(PORT, (req, res) => {
    console.log(`server is listening at port: ${PORT}`)
})