const mongoose = require('mongoose');
try {
    mongoose.connect('mongodb://127.0.0.1:27017/packplace', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
} catch (error) {
    console.log(error)
}