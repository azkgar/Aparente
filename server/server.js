require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
//const bodyParser = require("body-parser");


const app = express();
const port = process.env.PORT||5000;

app.use(cors());
app.use(express.json());
//app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true});
const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("MongoDB sí está jalando chido");
});

const postRouter = require("./routes/post");
const writersRouter = require("./routes/writers");
const authenticationRouter = require("./routes/authenticate");

app.use("/writescribir/post", postRouter);
app.use("/writescribir/writescritor", writersRouter);
app.use("/",authenticationRouter);

app.listen(port,()=>{
    console.log("Servidor corriendo en el 5000");
});