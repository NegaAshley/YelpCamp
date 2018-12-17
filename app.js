var express = require("express");
var app = express();

app.get("/",  function(req, res){
    console.log("Root route accessed")
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server has started!");
});