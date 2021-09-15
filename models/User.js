const mongoose = require('mongoose');
const { v4: uuidv4, v4 } = require('uuid');

const USER_TYPES = {
    CONSUMER: "consumer",
    SUPPORT: "support"
};

const User = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4().replace(/\-/g, "")
        },
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true  
        },
        password: {
            type: String,
            required: true
        },
        type: String
    },
    {
        timestamps: true,
        collection: "users",
    }
);

User.statics.CreateUser = async function (username, email, password, type) {
    try {
        const user = await this.create({ username, email, password, type });
        return user;
    } catch(error) {
        throw error;
    }
}

User.statics.findUserById = async function(id) {
    try {
        const user = await this.findOne({ _id: id}).select(['-password']);
        if (!user)
            throw ({ error: 'No user with tis id found' });
        return user;
    } catch(err) {
        // res.status(500).send('server error')
        throw err;
    }
}

User.statics.getUsers = async function() {
    try {
        const users = await this.find().select(['-password']);
        return users;
    }catch(err) {
        throw err;
    }
}

User.statics.deleteUserById = async function(id) {
    try {
        const rsl = await this.remove({ _id: id });
        return rsl;
    } catch(err) {
        throw err;
    }
}

module.exports = mongoose.model('user', User);
// module.exports = USER_TYPES;
