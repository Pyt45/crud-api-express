require('dotenv').config();
const express = require('express');
const router = express.Router();
const { validationResult, check } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// Handle Register
router.post('/register',[check('username').isString(),
                    check('email').not().isEmpty(),
                    check('password').isLength({ min: 6 })
                    ],async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json(errors);
    const { username, email, password } = req.body;

    try {
        const oldUser = await User.findOne({email});
        if (oldUser) {
            return res.status(400).json({
                errors: [
                    {
                        msg: 'User Alredy Exist',
                    },
                ],
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = new User();

        user.username = username;
        user.email = email;
        user.password = hash;

        user.save();

        const payload = await {
            user: {
                username,
                email
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            jwt: token,
            jwt_type: 'jwt',
            expireIn: '1h'
        });

    } catch(err) {
        console.log(err.message);
        res.status(500).send('server error');
    }
});

router.post('/login', [check('email').isEmail(), check('password').isLength({ min: 6} )], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json(errors);
    const { email, password } = req.body;

    try {

        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({
                errors: [
                    {
                        msg: 'Invalid Credentials'
                    }
                ]
            })
        }

        const matched = await bcrypt.compare(password, user.password);
        if (!matched) {
            return res.status(400).json({
                errors: [
                    {
                        msg: 'Invalid Credentials'
                    }
                ]
            });
        }

        const payload = {
            user: {
                username: user.username,
                email: user.email,
            }
        };

        const token = await jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});

        return res.status(200).json({
            jwt: token,
            jwt_type: 'jwt',
            expireIn: '1h'
        })

    } catch(err) {
        console.log(err.message);
        res.status(500).send('server error');
    }
})

router.get('/', auth, (req, res) => {
    const users = User.find();
    return res.status(200).json({
        msg: 'you are allowed to go here'
    });
})

module.exports = router;