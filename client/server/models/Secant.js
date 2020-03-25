let mongoose = require('mongoose');

//Schema Validation

let userSchema4 = mongoose.Schema({
    fx : {type: String ,required : true },
    x0 : {type: Number ,required : true},
    x1 : {type: Number ,required : true},
});

let Secants = mongoose.model('Secants',userSchema4);
module.exports = Secants;