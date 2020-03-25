let mongoose = require('mongoose');

//Schema Validation

let userSchema1 = mongoose.Schema({
    fx : {type: String ,required : true },
    xl : {type: Number ,required : true},
    xr : {type: Number ,required : true}
});
let Falseposition = mongoose.model('falseposition',userSchema1);
module.exports = Falseposition;