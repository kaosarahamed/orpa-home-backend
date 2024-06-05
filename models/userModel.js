const mongoose =  require("mongoose");

// this is userSchema schema and add your userSchema schema name here
const userSchema = mongoose.Schema({
    userName : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true
    },
    password : {
        type : String,
        required: true
    },
    ConfirmPassword : {
        type : String,
        required: true
    }
}, {timestamps : true});

module.exports = mongoose.model("users", userSchema);