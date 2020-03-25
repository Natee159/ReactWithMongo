let mongoose = require('mongoose');

//Schema Validation

let userSchema15 = mongoose.Schema({
    MatrixA : {type: Array ,required : true },
    MatrixB : {type: Array ,required : true },
    n : {type: Number ,required : true}
});

let Cramer = mongoose.model('cramers',userSchema15);
module.exports = Cramer;