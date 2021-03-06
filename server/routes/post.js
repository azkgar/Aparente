const router = require("express").Router();
let Post = require ("../models/post.model");

router.route("/")
.get((req,res)=>{
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json ("Error: " + err));
});

router.route("/redactar")
.post((req,res)=>{
    const username = req.body.username;
    const title = req.body.title;
    const date = Date.parse(req.body.date);
    const content = req.body.content;
    const categories = req.body.categories;

    const newPost = new Post ({
        username,
        title,
        date,
        content,
        categories
    });

    newPost.save()
        .then(()=>res.json("Post guardado!"))
        .catch(err=>res.status(400).json("Error: " + err));
});

router.route("/:id")
.get((req,res)=>{
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(400).json("Error: " + err));
})
.delete((req,res)=>{
    Post.findByIdAndDelete(req.params.id)
        .then(()=>res.json("Post eliminado."))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/editar/:id")
.post((req,res)=>{
    Post.findById(req.params.id)
        .then(post => {
            post.username = req.body.username;
            post.title = req.body.title;
            post.date = Date.parse(req.body.date);
            post.content = req.body.content;
            post.categories = req.body.categories

            post.save()
                .then(()=> res.json("Post editado!"))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err=>res.status(400).json("Error: " + err));
});

module.exports = router;