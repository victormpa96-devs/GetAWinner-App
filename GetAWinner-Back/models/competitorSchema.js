const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const competitorsSchema = new Schema(
    {
        name: String,
        createdBy: String,
        createdOn: Date,
        updatedAt: Date        
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Competitors', competitorsSchema);