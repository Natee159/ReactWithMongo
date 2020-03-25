let mongoose = require('mongoose');

//Schema Validation

let userSchema = mongoose.Schema({
    fx : {type: String ,required : true },
    xl : {type: Number ,required : true},
    xr : {type: Number ,required : true}
});

let Bisection = mongoose.model('bisections',userSchema);
module.exports = Bisection;
