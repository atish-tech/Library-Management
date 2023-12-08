const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName : {
        type : String ,
        require : true
    },
    password : {
        type : String ,
        require : true
    },
    isLibrarian : {
        type : Boolean ,
        default : false,
    },
    myBook : {
        type : Array
    }
});

const userModel = mongoose.model("userData" , userSchema);

module.exports = userModel;