const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema ({
    username: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type:Date,
        required: true
    },
    content: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Post = mongoose.model("Post",postSchema);

module.exports = Post;