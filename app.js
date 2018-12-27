var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    //User        = require("./models/user"),
    seedDB      = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/",  function(req, res){
    res.render("landing");
});

//Index - show all campgrounds
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log("Error getting campgrounds from database!");
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
});

//Create - add new campground to database
app.post("/campgrounds", function(req, res){
    var newCampgroundName = req.body.newCampgroundName;
    var newCampgroundImage = req.body.newCampgroundImage;
    var newCampgroundDescription = req.body.newCampgroundDescription;
    var newCampground = {name: newCampgroundName, image: newCampgroundImage, 
        description: newCampgroundDescription};
    Campground.create(newCampground, function(err, campground){
        if(err){
            console.log("Error creating campground!");
            console.log(err);
        }else{
            console.log("Campground saved to database!");
            console.log(campground);
            res.redirect("/campgrounds");
        }
    });
});

//New - show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

//Show - show details about specific campground
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log("Error getting campground by ID!");
            console.log(err);
        }else{
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// =================
// Comments Routes
// =================

app.get("/campgrounds/:id/comments/new", function(req, res){
    res.render("comments/new");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server has started!");
});