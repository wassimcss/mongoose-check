const mongoose = require("mongoose");
const ShemaPerson = mongoose.Schema({
    name: {
        type:String,
        required : true
    },
    age : {
        type: Number
    },
    favouriteFoods : [String]
})
module.exports = mongoose.model("Person",ShemaPerson);