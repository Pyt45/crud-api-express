const { validationResult } = require('express-validator');
// const { USER_TYPE } = require('../models/User');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const onGetAllUsers =  async (req, res) => { 
    try {
        const users = await User.getUsers();
        return res.status(200).json(users);
    } catch(err) {
        console.log(err.message);
        res.status(500).send('error server');
    }
};
const onGetUserById =  async (req, res) => {
    try {
        const user = await User.findUserById(req.params.id);
        return res.status(200).json(user);
    } catch(err) {
        console.log(err.message);
        res.status(500).send('server error')
        // throw err;
    }
};

const onCreateUser =  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json(errors);
    }
    const { username, email, password, type } = req.body;
    try {
        const oldUser = await User.findOne({email});
        if (oldUser) {
            return res.status(400).json({
                errors: [
                    {
                        msg: 'User Alredy exist'
                    }
                ]
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        
        const user = await User.CreateUser(username, email, hash, type);

        // user.save();

        return res.status(200).json(user);

    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server error 1');
    }
};

const onDeleteUserById =  async (req, res) => {
    try {
        const user = await User.deleteUserById(req.params.id);
        return res.status(200).json({
            success: true,
            msg: 'user deleted'
        })
    } catch(err) {
        console.log(err.message);
        res.status(500).send('server error');
    }
};

module.exports = {
    onGetAllUsers,
    onGetUserById,
    onCreateUser,
    onDeleteUserById
};