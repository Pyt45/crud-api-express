require('dotenv').config();
const jwt = require('jsonwebtoken');

const verfiyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token)
        return res.status(403).send('A token is required for authentication');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch(err) {
        console.log(err.message);
        return res.status(401).send("Invalid Token");
    }
    return next();
}

module.exports = verfiyToken;