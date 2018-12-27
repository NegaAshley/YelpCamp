var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
    author: String,
    created: {type: Date, default: Date.now}
});


module.exports = mongoose.model("Comment", commentSchema);