const mongoose = require('mongoose')

const connectDB = async() => { // NOTE: this is how you define an async function
    try {
        await mongoose.connect(process.env.DATABASE_URI)
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = connectDB