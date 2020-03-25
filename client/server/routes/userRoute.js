var express = require('express');
var router = express.Router();
let Bisection = require('../models/userModel');
let Falseposition = require('../models/False');
let Onepoints = require('../models/Onepoint');
let Newtons = require('../models/Newton');
let Trap = require('../models/Trap');
let Secants = require('../models/Secant');
let Simpson = require('../models/Simpson');
let Forward = require('../models/Forward');
let Forward2 = require('../models/Forward2');
let Backward = require('../models/Backward');
let Backward2 = require('../models/Backward2');
let Central = require('../models/Central');
let Central2 = require('../models/Central2');
let Newtondivide = require('../models/Newtondivide');
let Lagrange = require('../models/Lagrange');
let Cramer = require('../models/Cramer');
let GaussE = require('../models/GaussE');
let GaussJ = require('../models/GaussJ');
let Lu = require('../models/Lu');
/* GET users listing. */
router.get('/showbisection', function(req, res, next) {
 
  Bisection.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.get('/showfalse', function(req, res, next) {
 
  Falseposition.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.get('/showonepoint', function(req, res, next) {
 
  Onepoints.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.get('/shownewton', function(req, res, next) {
 
  Newtons.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.get('/showsecant', function(req, res, next) {
 
  Secants.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.get('/showtrap', function(req, res, next) {
 
  Trap.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.get('/showsimpson', function(req, res, next) {
 
  Simpson.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.get('/showforward', function(req, res, next) {
 
  Forward.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});
router.get('/showforward2', function(req, res, next) {
 
  Forward2.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.get('/showbackward', function(req, res, next) {
 
  Backward.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});
router.get('/showbackward2', function(req, res, next) {
 
  Backward2.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});
router.get('/showcentral', function(req, res, next) {
 
  Central.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});
router.get('/showcentral2', function(req, res, next) {
 
  Central2.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.get('/shownewtondivide', function(req, res, next) {
 
  Newtondivide.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.get('/showlagrange', function(req, res, next) {
 
  Lagrange.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});
router.get('/showcramer', function(req, res, next) {
 
  Cramer.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});
router.get('/showgausse', function(req, res, next) {
 
  GaussE.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});
router.get('/showgaussj', function(req, res, next) {
 
  GaussJ.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});
router.get('/showlu', function(req, res, next) {
 
  Lu.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

module.exports = router;
