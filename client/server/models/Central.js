let mongoose = require('mongoose');

//Schema Validation

let userSchema11 = mongoose.Schema({
    fx : {type: String ,required : true },
    d : {type: Number ,required : true},
    h : {type: Number ,required : true},
    x : {type: Number ,required : true}
});

let Central = mongoose.model('centrals',userSchema11);
module.exports = Central;
