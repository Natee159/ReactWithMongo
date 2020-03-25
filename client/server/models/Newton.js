let mongoose = require('mongoose');

//Schema Validation

let userSchema3 = mongoose.Schema({
    fx : {type: String ,required : true },
    x0 : {type: Number ,required : true},
});

let Newtons = mongoose.model('newtons',userSchema3);
module.exports = Newtons;