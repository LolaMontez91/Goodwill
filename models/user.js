var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true
  },
  name: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
UserSchema.statics.authenticate = function(email, password, callback) {
  User.findOne({
      email: email
    })
    .exec(function(error, user) {
      if (error) {
        return callback(error);
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      //if the user exists, compare the hashed password to the new hash from req.body.password
      bcrypt.compare(password, user.password, function(error, result) {
        // if passwords are the same return the user
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      });
    });
};

//sign up with an existing username NOT allowed
// User will not be added to the database
UserSchema.pre('save', function(next) {
  var self = this;
  User.find({
    email: self.email
  }, function(err, doc) {
    if (!doc.length) {
      next();
    } else {
      console.log('User Exists: ', self.email);
      next(new Error('User exists!'));
    }
  });
});

//using bcrypt to hash password
UserSchema.pre('save', function(next) {
  const user = this;
  bcrypt.hash(user.password, 10, function(error, hash) {
    if (error) {
      return next(error);
    }
    user.password = hash;
    next();
  });
});
register.ejs
<div class="row mt-5">
  <div class="col-md-6 m-auto">
    <div class="card card-body">
      <h1 class="text-center mb-3">
        <i class="fas fa-user-plus"></i> Register
      </h1>
      <form action="/users/register" method="POST">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="name"
            id="name"
            name="name"
            class="form-control"
            placeholder="Enter Name"
            value="<%= typeof name != 'undefined' ? name : '' %>"
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            class="form-control"
            placeholder="Enter Email"
            value="<%= typeof email != 'undefined' ? email : '' %>"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            class="form-control"
            placeholder="Create Password"
            value="<%= typeof password != 'undefined' ? password : '' %>"
          />
        </div>
        <div class="form-group">
          <label for="password2">Confirm Password</label>
          <input
            type="password"
            id="password2"
            name="password2"
            class="form-control"
            placeholder="Confirm Password"
            value="<%= typeof password2 != 'undefined' ? password2 : '' %>"
          />
        </div>
        <button type="submit" class="btn btn-primary btn-block">
          Register
        </button>
      </form>
      <p class="lead mt-4">Have An Account? <a href="/users/login">Login</a></p>
    </div>
  </div>
</div>
login.ejs
<div class="row mt-5">
  <div class="col-md-6 m-auto">
    <div class="card card-body">
      <h1 class="text-center mb-3"><i class="fas fa-sign-in-alt"></i>  Login</h1>
      <form action="/users/login" method="POST">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            class="form-control"
            placeholder="Enter Email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            class="form-control"
            placeholder="Enter Password"
          />
        </div>
        <button type="submit" class="btn btn-primary btn-block">Login</button>
      </form>
      <p class="lead mt-4">
        No Account? <a href="/users/register">Register</a>
      </p>
    </div>
  </div>
</div>
