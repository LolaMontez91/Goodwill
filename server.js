const express= require("express");
const path= require('path');
const bodyParser= require('body-parser');
const cookieParser= require('cookie-parser');
const routes= require('./routes/index');
const port = process.env.PORT || 8080;
const app= express();
var partials = require('express-partials');
const db= require('./config/keys').MongoURI;
const mongoose= require('mongoose');

//connect to mongo using mongoose
/*mongoose.connect(db, {
  useNewURLParser: true
}).then(() => console.log("MongoDB connected")).catch(err => console.log(err));*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//parse incoming requests
app.use(bodyParser.urlencoded({extended:false}));


app.use(express.static(path.join(__dirname, 'public')));
app.use(partials());
app.use('/', routes);

app.listen(port, function(req,res){
  console.log("listening on 8080")
});


/*app.use(session({
  secret: 'Dont steal my cookies',
  resave: true,
  saveUninitialized: false
}));*/

app.use(function (req, res, next){
  res.locals.currentUser = req.session.userID;
  next();
});


// parse incoming requests
app.use(bodyParser.urlencoded({ extended: false }));



app.use(bodyParser());


module.exports= app;
