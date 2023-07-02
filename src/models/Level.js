const { Schema, model } = require('mongoose');

const levelSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  xp: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 0,
  },
});

module.exports = model('Level', levelSchema);