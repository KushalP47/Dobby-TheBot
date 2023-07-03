const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    guildId: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        default: 0,
    },
    lastDaily: {
        type: Date,
        required: true,
    },
    data :[{
        type: String,
        default: "Dobby",
    }],
});

module.exports = model('User', userSchema);