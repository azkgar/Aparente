require("dotenv").config();
const mongoose = require ("mongoose");
const passport = require ("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require ("mongoose-findorcreate");

