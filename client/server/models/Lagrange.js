let mongoose = require('mongoose');

//Schema Validation

let userSchema14 = mongoose.Schema({
    inx : {type: Array ,required : true },
    iny : {type: Array ,required : true },
    x : {type: Number ,required : true},
    n : {type: Number ,required : true}
});

let Newtondivides = mongoose.model('lagranges',userSchema14);
module.exports = Newtondivides;