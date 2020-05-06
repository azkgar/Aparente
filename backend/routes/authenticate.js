require("dotenv").config();

const router = require("express").Router();
const session = require("express-session");
const passport = require("passport");

router.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());

const Writer = require ("../models/writers.model");

passport.use(Writer.createStrategy());
passport.serializeUser(Writer.serializeUser());
passport.deserializeUser(Writer.deserializeUser());

router.route("/")
.get((req,res)=>{
    Writer.find()
        .then(writers => res.json(writers))
        .catch(err=>res.status(400).json("Error: " + err));
});

router.route("/login")
.get(function(req,res){
    res.redirect("http://localhost:3000/entrar");
})
.post(function(req,res){
    const user = new Writer({
        username : req.body.username,
        password: req.body.password
    });
    req.login(user,function(err){
        if(err){
            console.log(err);
        } else {
            passport.authenticate("local")(req,res,function(){
                res.redirect("/admin");
            });
        }
    });
});

router.route("/register")
.get(function(req,res){
    res.redirect("http://localhost:3000/nuevousuario");
})
.post(function(req,res){
    Writer.register({username: req.body.username}, req.body.password, function(err,user){
        if (err){
            console.log(err);
            res.redirect("http://localhost:3000/nuevousuario");
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("http://localhost:3000/");
            });
        }
    });
});

router.route("/admin")
.get(function(req,res){
    if (req.isAuthenticated()){
        res.redirect("http://localhost:3000/");
    } else {
       res.redirect("/login"); 
    }
});

router.route("/logout")
.get(function(req,res){
    req.logout();
    res.redirect("/login");
});

module.exports = router;