var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    email: String,
    comments: [commentSchema]
});


module.exports = mongoose.model("User", userSchema);