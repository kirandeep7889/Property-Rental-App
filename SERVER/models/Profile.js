const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    gender : {
        type : String,
        enum : ["Male", "Female", "Others", null]
    },
    dateOfBirth : {
        type : String
    },
    contactNumber : {
        type : Number,
        trim : true
    }
});

module.exports = mongoose.model("Profile", profileSchema);