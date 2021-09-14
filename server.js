require('dotenv').config();
const express = require('express');
const connectDb = require('./utils/connectDb');

const app = express();

connectDb(process.env.MONGO_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', require('./routes/api/users'));

app.listen(process.env.PORT || 8080);
