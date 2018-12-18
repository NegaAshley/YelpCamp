var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var campgrounds = [
        {name: "Johnny Appleseed Campground", image: "https://i.pinimg.com/originals/4e/92/6f/4e926ffff71d80b23d19f6e77b7ba81c.jpg"},
        {name: "Bixler Lake", image: "https://50campfires.com/wp-content/uploads/2014/05/photo51-620x330.jpg"},    
        {name: "Camp Potawotami", image: "https://photos.smugmug.com/photos/i-78dhF7q/0/M/i-78dhF7q-M.jpg"}    
    ];
    
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/",  function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    // redirect back to campgrounds page
    var newCampgroundName = req.body.newCampgroundName;
    var newCampgroundImage = req.body.newCampgroundImage;
    var newCampground = {name: newCampgroundName, image: newCampgroundImage};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server has started!");
});