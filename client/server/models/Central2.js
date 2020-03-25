let mongoose = require('mongoose');

//Schema Validation

let userSchema12 = mongoose.Schema({
    fx : {type: String ,required : true },
    d : {type: Number ,required : true},
    h : {type: Number ,required : true},
    x : {type: Number ,required : true}
});

let Central2 = mongoose.model('central2s',userSchema12);
module.exports = Central2;
