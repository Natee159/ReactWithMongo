let mongoose = require('mongoose');

//Schema Validation

let userSchema17 = mongoose.Schema({
    MatrixA : {type: Array ,required : true },
    MatrixB : {type: Array ,required : true },
    n : {type: Number ,required : true}
});

let GaussJ = mongoose.model('gaussjs',userSchema17);
module.exports = GaussJ;