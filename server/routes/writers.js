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
router.route("/eliminar/:id")
.get((req,res)=>{
    Writer.findById(req.params.id)
        .then(writer => res.json(writer))
        .catch(err => res.status(400).json("Error: "+err));
})
.delete((req,res)=>{
    Writer.findByIdAndDelete(req.params.id)
        .then(()=>res.json("Escritor eliminado."))
        .catch(err=>res.status(400).json("Error: " + err));
});

router.route("/actualizar/:id")
.post((req,res)=>{
    Writer.findById(req.params.id)
    .then(writer=>{
        writer.username = req.body.username;
        writer.password = req.body.password;

        writer.save()
            .then(()=> res.json("Escritor actualizado!"))
            .catch(err=>res.status(400).json("Error: " + err));
    })
    .catch(err=>res.status(400).json("Error: " + err));
});

module.exports=router;