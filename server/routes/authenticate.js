const router = require("express").Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;


const Writer = require ("../models/writers.model");


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
    res.redirect("http://localhost:3000/admin");
})
.post((req,res)=>{
   const user = new Writer({
       username : req.body.username,
       password: req.body.password
   });
   req.login(user, (err)=>{
       if (err){
           console.log(err);
           return res.json(err.data);
       } else {
            passport.authenticate("local")(req,res,function(){
                return res.json(user);
            }); 
       }
   });
});


router.route("/logout")
.get((req,res)=>{
    req.logout();
    res.redirect("http://localhost:3000/admin");
});

router.route("/google")
.get(passport.authenticate("google", {scope:["profile"]}));

router.route("/google/secrets")
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
.post(function(req,res,next){
    Writer.register({username: req.body.username}, req.body.password, function(err,user){
        if(err){
            console.log(err);
            res.redirect("http://localhost:3000/admin/usuarios");
        } else {
            passport.authenticate("local",function(error,user,info){
                if(error){
                    return res.status(500).json({
                        message: error || "Oops... something went wrong!"
                    });
                }
                return res.json(user);
            })(req,res,next);
        }
    });
}); 

module.exports = router;