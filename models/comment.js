var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    content: String,
    created: {type: Date, default: Date.now}
});


module.exports = mongoose.model("Comment", commentSchema);