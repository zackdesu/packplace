import mongoose from 'mongoose';

const Contact = mongoose.model({
    nama: {
        type: String,
        required: true,
    },
    nohp: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
})

export {Contact as default}