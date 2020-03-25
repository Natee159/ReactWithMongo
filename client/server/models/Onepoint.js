let mongoose = require('mongoose');

//Schema Validation

let userSchema2 = mongoose.Schema({
    fx : {type: String ,required : true },
    x0 : {type: Number ,required : true},
});

let Onepoints = mongoose.model('onepoints',userSchema2);
module.exports = Onepoints;