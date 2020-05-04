const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const writerSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlenght: 3
    },
    password: {
        type: String,
        required: true,
        minlenght: 6
    }
},{
    timestamps: true
});

const Writer = mongoose.model("Writer", writerSchema);

module.exports = Writer;