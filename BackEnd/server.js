const express = require('express')
const User = require('./models/User')
const CORS = require('cors')
const { loginHandler, signUpHandler } = require('./controller/AuthController')
const { notFoundHandler, errorHandler } = require('./middlewares/errorMiddleware')
const mangaRoutes = require('./routes/mangaRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const port = process.env.PORT || 3000;

const app = express()
app.use(CORS())
app.use(express.json())


app.use('/api/user', userRoutes);
app.use('/api/manga', mangaRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
