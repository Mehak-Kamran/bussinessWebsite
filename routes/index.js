var express = require('express');
const passport = require('passport');
var router = express.Router();
const usermodel=require("./users")
const localStrategy=require("passport-local");
passport.use(new localStrategy(usermodel.authenticate()));

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/dashboard',isLoggedIn, function(req, res) {
  res.render('dashboard');
});

//register
router.post("/register",function(req,res){
  var userdata=new usermodel({
    username:req.body.username,
    userCity:req.body.userCity,
    userAge:req.body.userAge,
    password:req.body.password
  });
  usermodel.register(userdata,req.body.password)
     .then(function(registereduser){
      passport.authenticate("local")(req,res,function(){
        res.redirect("/dashboard");
      })
     })
});

//code for login
router.post("/login",passport.authenticate("local",{
  successRedirect:"/dashboard",//if user is authentic go to profile page
  failureRedirect: "/"//if not then redirect to homepage
}),function(req,res){ })

//logout
router.get('/logout',function(req,res,next){
  req.logout(function(err){//if someone want to logout , log him out
    if (err){ return next(err); }
    res.redirect("/");//and redirect him to home page
  });
});

//isloggedin middleware
function isLoggedIn(req,res,next){//protection from unreg people
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
}

// create user in db
// router.get("/create", async function(req,res){
//   const createduser= await um.create({

//     username:"jack",
//     userCity:"Seoul",
//     userAge:23,
//     password:"fofo"
//   });
//   res.send(createduser);
// });

module.exports = router;
