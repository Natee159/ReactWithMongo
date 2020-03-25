let mongoose = require('mongoose');

//Schema Validation

let userSchema9 = mongoose.Schema({
    fx : {type: String ,required : true },
    d : {type: Number ,required : true},
    h : {type: Number ,required : true},
    x : {type: Number ,required : true}
});

let Backward = mongoose.model('backwards',userSchema9);
module.exports = Backward;
