const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const Schema = mongoose.Schema;

const writerSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        minlenght: 3
    },
    password: {
        type: String,
        minlenght: 6
    }
},{
    timestamps: true
});

writerSchema.plugin(passportLocalMongoose);
writerSchema.plugin(findOrCreate);

const Writer = mongoose.model("Writer", writerSchema);

module.exports = Writer;