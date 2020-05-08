const router = require("express").Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;


let Writer = require ("../models/writers.model");


passport.use(Writer.createStrategy());

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id,done)=>{
    Writer.findById(id)
        .then(user=>{
            done(null,user);
        })
        .catch(e=>{
            done(new Error("Failed to deserialize an user"));
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
    Writer.findOrCreate({googleId: profile.id}, (err,user)=>{
        return cb(err,user);
    });
}));


router.route("/login")
.get((req,res)=>{
    res.redirect("http://localhost:3000/admin/login");
})
.post((req,res)=>{
    const user = new Writer({
        username : req.body.username,
        password: req.body.password
    });
    req.login(user,err=>{
        if(err){
            console.log("No se pudo entrar!");
            console.log(err);
            res.redirect("/login");
        } else {
            passport.authenticate("local")(req,res,()=>{
                res.redirect("http://localhost:3000/admin/consola");
            });
        }
    });
});

router.route("/login/success")
.get((req,res)=>{
    if(req.user){
        res.json({
            success: true,
            message: "user has successfully authenticated.",
            user: req.user,
            cookies: req.cookies
        });
    }
});

router.route("/login/failed")
.get((req,res)=>{
    res.status(401).json({
        success: false,
        message: "user failed to authenticate."
    });
});

router.route("/logout")
.get((req,res)=>{
    req.logout();
    res.redirect("http://localhost:3000/admin/login");
});

router.route("/auth/google")
.get(passport.authenticate("google", {scope:["profile"]}));

router.route("/auth/google/secrets")
.get(
    passport.authenticate("google", {failureRedirect: "/login"}),
    function(req,res){
        res.redirect("http://localhost:3000/admin/consola")
    }
);

router.route("/register")
.get(function(req,res){
    res.redirect("http://localhost:3000/admin/usuarios");
})
.post(function(req,res){
    Writer.register({username: req.body.username}, req.body.password, function(err,user){
        if (err){
            console.log(err);
            res.redirect("http://localhost:3000/admin/usuarios");
        } else {
            passport.authenticate("local")(req, res, function(){
                console.log("usuario autenticado!")
                res.redirect("nttp://localhost:3000/admin/consola");
            });
        }
    });
});

module.exports = router;