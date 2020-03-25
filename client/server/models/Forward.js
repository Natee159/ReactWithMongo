let mongoose = require('mongoose');

//Schema Validation

let userSchema7 = mongoose.Schema({
    fx : {type: String ,required : true },
    d : {type: Number ,required : true},
    h : {type: Number ,required : true},
    x : {type: Number ,required : true}
});

let Forward = mongoose.model('forwards',userSchema7);
module.exports = Forward;
