import mongoose from 'mongoose';

const database = 'mongodb://127.0.0.1:27017/packplace';

mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})