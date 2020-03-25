let mongoose = require('mongoose');

//Schema Validation

let userSchema16 = mongoose.Schema({
    MatrixA : {type: Array ,required : true },
    MatrixB : {type: Array ,required : true },
    n : {type: Number ,required : true}
});

let GaussE = mongoose.model('gausses',userSchema16);
module.exports = GaussE;