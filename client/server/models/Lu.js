let mongoose = require('mongoose');

//Schema Validation

let userSchema18 = mongoose.Schema({
    MatrixA : {type: Array ,required : true },
    MatrixB : {type: Array ,required : true },
    n : {type: Number ,required : true}
});

let Lu = mongoose.model('lus',userSchema18);
module.exports = Lu;