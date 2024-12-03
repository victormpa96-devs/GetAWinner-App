const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema(
    {
        username: String,
        password: String,
        createdOn: Date,
        updatedAt: Date,
        role: {type: Number, default: 0}
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Users', usersSchema);