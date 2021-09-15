const express = require('express');

const users = require('../controllers/user');

const encode = require('../middleware/jwt');

const router = express.Router();

router.post('/login', (req, res) => {
    // data
    // check exists database
    // generate jwt
 });


// middleware = auth
// extract token
// verefy token
// req.user = payload, next()

module.exports = router;