require("dotenv").config();
const express = require("express");
const mongoose = require ("mongoose");
const session = require("express-session");
const passport = require ("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require ("mongoose-findorcreate");

const app = express();

app.use(express.static("public"));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", {useUnifiedTopology:true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    secret: String,
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User",userSchema);

passport.use(User.createStrategy());
passport.serializeUser(function(user,done){
    done(null, user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        done(err,user);
    });
});

app.route("/writescribir")
.get(function(req,res){
    res.render("login"); // Investigar como hacer eso
})
.post(function(req,res){
    const user = new User({
        username: req.body.username, //Investigar como leer eso
        password: req.body.password //Investigar como leer eso
    });
    req.login(user, function(err){
        if(err){
            console.log(err);
        } else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/writescribir/compose");
            });
        }
    });
});

app.route("writescribir/register")
.get(function(req,res){
    res.render("register"); //Investigar como hacer eso
})
.post(function(req,res){
    User.register({username: req.body.username}, req.body.password,
        function(err,user){
            if (err){
                console.log(err);
                res.redirect("/writescribir/register"); //Cómo se hace
            } else {
                passport.authenticate("local")(req,res,function(){
                    res.redirect("/writescribir/compose"); // cómo se hace
                });
            }
        });
});

app.route("writescribir/posts")
.get(function(req,res){
    User.find({"secret": {$ne:null}}, function(err,foundUsers{ //Aguas aquí con secret ¿?
        if(err){
            console.log(err);
        } else {
            if (foundUsers){
                res.render("secrets", {usersWithSecrets: foundUsers}); //Aguas acá con secrets ¿?
            }
        }
    }));
});

app.route("logout")
.get(function(req,res){
    req.logout();
    res.redirect("/"); //Esto cómo se hace
});

app.route("/writescribir/compose")
.get(function(req, res){
    if(req.isAuthenticated()){
        res.render("submit");
    } else {
        res.redirect("/login");
    }
})
.post(function(req,res){
    const submittedSecret = req.body.secret; //Esto como
    console.log(req.user.id);
    User.findById(req.user.id,function(err,foundUser){
        if(err){
            console.log(err);
        } else {
            if(foundUser){
                foundUser.secret = sybmittedSecret; //aquí debe ser blog
                foundUser.save(function(){
                    res.redirect("/secrets"); //esto como
                });
            }
        }
    });
});

app.listen(4000, function(){
    console.log("Server started on port 4000");
});