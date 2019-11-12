const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    users: {
        type: mongoose.Schema.Object.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    type: {
        type: String,
        default: 'personal'
    },
    date: {
        type: Date,
        default: Date.now
    },
});


// export module user with the user schema
module.exports = mongoose.model('contact', ContactSchema);

