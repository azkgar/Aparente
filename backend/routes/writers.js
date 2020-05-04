const router = require("express").Router();
let Writer = require("../models/writers.model");

router.route("/")
.get((req,res)=>{
    Writer.find()
        .then(writers => res.json(writers))
        .catch(err=>res.status(400).json("Error: " + err));
});

router.route("/nuevo")
.post((req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const newWriter = new Writer({
        username,
        password
    });

    newWriter.save()
        .then(()=>res.json("Escritor agregado!"))
        .catch(err=> res.status(400).json("Error: " + err));
    
});

module.exports=router;