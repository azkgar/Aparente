const express = require("express");
const cors = require("cors");
const router = require("express").Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

router.use(cors());

let Writer = require ("../models/writers.model");


passport.use(Writer.createStrategy());

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id,done){
    Writer.findById(id, function(err, user){
        done(err,user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"

},
function(accessToken, refreshToken, profile,cb){
    console.log(profile);
    Writer.findOrCreate({googleId: profile.id}, function(err,user){
        return cb(err,user);
    });
}));

router.route("/")
.get((req,res)=>{
    Writer.find()
        .then(writers => res.json(writers))
        .catch(err=>res.status(400).json("Error: " + err));
});

router.route("/login")
.get(function(req,res){
    res.redirect("http://localhost:3000/entrar/");
})
.post(function(req,res){
    const user = new Writer({
        username : req.body.username,
        password: req.body.password
    });
    req.login(user,function(err){
        if(err){
            console.log("No se pudo entrar!");
            console.log(err);
        } else {
            passport.authenticate("local")(req,res,function(){
                console.log("Si está autenticando!");
                res.redirect("/admin");
            });
        }
    });
});

router.route("/register")
.get(function(req,res){
    res.redirect("http://localhost:3000/nuevousuario/");
})
.post(function(req,res){
    Writer.register({username: req.body.username}, req.body.password, function(err,user){
        if (err){
            console.log(err);
            res.redirect("http://localhost:3000/nuevousuario/");
        } else {
            passport.authenticate("local")(req, res, function(){
                console.log("usuario autenticado!")
                res.redirect("nttp://localhost:3000/");
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

router.route("/auth/google")
.get(passport.authenticate("google", {scope:["profile"]}));

router.route("/auth/google/secrets")
.get(
    passport.authenticate("google", {failureRedirect: "/login"}),
    function(req,res){
        res.redirect("http://localhost:3000/")
    }
);

module.exports = router;