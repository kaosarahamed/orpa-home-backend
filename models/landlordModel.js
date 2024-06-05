const mongoose = require("mongoose");

// this is landLord schema and add your landLord schema name here
const landLord = new mongoose.Schema({
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
});

module.exports = mongoose.model("landLord", landLord);
