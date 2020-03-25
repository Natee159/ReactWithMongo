let mongoose = require('mongoose');

//Schema Validation

let userSchema13 = mongoose.Schema({
    inx : {type: Array ,required : true },
    iny : {type: Array ,required : true },
    x : {type: Number ,required : true},
    n : {type: Number ,required : true}
});

let Newtondivides = mongoose.model('newtondivides',userSchema13);
module.exports = Newtondivides;