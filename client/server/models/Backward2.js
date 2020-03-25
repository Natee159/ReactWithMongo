let mongoose = require('mongoose');

//Schema Validation

let userSchema10 = mongoose.Schema({
    fx : {type: String ,required : true },
    d : {type: Number ,required : true},
    h : {type: Number ,required : true},
    x : {type: Number ,required : true}
});

let Backward2 = mongoose.model('backward2s',userSchema10);
module.exports = Backward2;
