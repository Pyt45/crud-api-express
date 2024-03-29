const mongoose = require('mongoose');

const connectDb = async (url) => {
    try {
        await mongoose.connect(url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
    } catch(err) {
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectDb;
