require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT||5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true});
const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("MongoDB sí está jalando chido");
});

const postRouter = require("./routes/post");
const writersRouter = require("./routes/writers");

app.use("/writescribir/post", postRouter);
app.use("/writescribir/writescritor", writersRouter)

app.listen(port,()=>{
    console.log("Servidor corriendo en el 5000");
});