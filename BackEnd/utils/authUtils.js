require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return 'Bearer ' + jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn:'10d'
    })
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {generateToken, verifyToken}