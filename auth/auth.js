const bcrypt = require("bcrypt"); // import bcrypt package
const userModel = require("../models/usersModel"); //import user model
const jwt = require("jsonwebtoken"); // import jsonwebtoken package

exports.login = function (req, res,next) {
  //take details passed from form and store
  let username = req.body.username;
  let password = req.body.password;

  userModel.lookup(username, function (err, user) {
    // if there is an err looking up user
    if (err) {
      console.log("error looking up user", err);
      return res.status(401).send();
    }
    //if user not found return to home page
    if (!user) { 
      console.log("Unauthorised login");
      return res.redirect("/");
    }
    //compare provided password with stored password
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        //use the payload to store information about the user such as username.
        let payload = { username: username };
        //create the access token, this comes from .env
        let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{expiresIn: 500}); 
        res.cookie("jwt", accessToken);
        next();
      } else {
        // if entered password does not match stored
        console.log("Unauthorised login");
        return res.redirect("/"); //res.status(403).send();
      }
    });
  });
};

exports.register = function (req, res, next) {
  //take details passed from form and store
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;

  userModel.lookup(username, function (err, user) {
    // if err looking up user
    if (err) {
      console.log("error looking up user", err);
      return res.status(401).send();
    }
    //if user not found return to home page
    if (!user) {
      console.log("Unauthorised login");
      return res.redirect("/");
    }
    //compare provided password with stored password
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        //use the payload to store information about the user such as username.
        let payload = { username: username, email: email };
        //create the access token 
        let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{expiresIn: 500}); //token comes from .env
        res.cookie("jwt", accessToken);
        next();
      } else { // if entered password does not match stored
        console.log("Unauthorised login");
        return res.redirect("/"); //res.status(403).send();
      }
    });
  });
};

exports.verify = function (req, res, next) {
  let accessToken = req.cookies.jwt;
  // if no access token
  if (!accessToken) {
    return res.status(403).send();
  }
  let payload;
  
  try {
    // confirm access token matches secret token
    payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    //if an error occurred return request unauthorized error
    res.status(401).send();
  }
};