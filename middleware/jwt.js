require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const encode = (req, res, next) => {
    
};

const decode = (req, res, next) => {
};

module.exports = {
    decode,
    encode
};