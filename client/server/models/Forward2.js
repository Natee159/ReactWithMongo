let mongoose = require('mongoose');

//Schema Validation

let userSchema8 = mongoose.Schema({
    fx : {type: String ,required : true },
    d : {type: Number ,required : true},
    h : {type: Number ,required : true},
    x : {type: Number ,required : true}
});

let Forward2 = mongoose.model('forward2s',userSchema8);
module.exports = Forward2;
