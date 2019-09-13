const express= require('express');
const router= express.Router();

router.get('/', function(req, res){
  console.log("GETTING HOME PAGE")
  res.render('index');
});

router.get('/forms', function(req, res){
  console.log("GETTING FORMS PAGE")
  res.render('forms');
});

router.get('/form2', function(req, res){
  console.log("GETTING FORM2 PAGE")
  res.render('form2');
});

router.get('/form3', function(req, res){
  console.log("GETTING FORM3 PAGE")
  res.render('form3');
});

router.get('/form4', function(req, res){
  console.log("GETTING FORM4 PAGE")
  res.render('form4');
});

router.get('/centers', function(req, res){
  console.log("GETTING CENTERS PAGE")
  res.render('centers');
});

router.get('/contact', function(req, res){
  console.log("GETTING CONTACT PAGE")
  res.render('contact');
});

router.get('/login', function(req, res){
  console.log("GETTING LOGIN PAGE")
  res.render('login');
});

router.get('/register', function(req, res){
  console.log("GETTING REGISTER PAGE")
  res.render('register');
});

module.exports= router;
