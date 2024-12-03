const mongoose = require('mongoose');

async function connectMongoose() {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/getawinnerDB');
    }catch(error){
        throw error;
    }
}

exports.connectMongoose = connectMongoose;

