require('dotenv').config();
const express = require('express');
// DB
const connectDb = require('./utils/connectDb');

// Routes
// const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

// Middlewares
// const decode = require('./middleware/jwt');

const app = express();

connectDb(process.env.MONGO_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/users', userRouter);

app.use('*', (req, res) => {
    return res.status(404).json({
        success: false,
        message: 'Api endpoint doesnt exist'
    })
});

app.listen(process.env.PORT || 9000, () => {
    console.log('connected');
});
