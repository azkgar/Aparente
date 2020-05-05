require("dotenv").config();

const router = require("express").Router();
const session = require("express-session");
const passport = require("passport");
let Writer = require("../models/writers.model");




router.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());

passport.use(Writer.createStrategy());
passport.serializeUser(function(user,done){
    done(null, user.id);
});

passport.deserializeUser(function(id,done){
    Writer.findById(id, function(err, user){
        done(err,user);
    });
});

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
                res.redirect("http://localhost:3000/");
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
            res.redirect("/http://localhost:3000/nuevousuario"); //Cambiar a localhost:3000/entrar
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("localhost:3000/");
            });
        }
    });
});

module.exports = router;