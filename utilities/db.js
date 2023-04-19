require('dotenv').config();

const uri = process.env.DB_URL

const mongoose = require('mongoose');
try {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
} catch (error) {
    console.log(error)
}