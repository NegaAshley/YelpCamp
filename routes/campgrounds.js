var express     = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campground");

//Index - show all campgrounds
router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log("Error getting campgrounds from database!");
            console.log(err);
        }else{
            //TODO Remove
            //Pass through current user to campgrounds index
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
});

//Create - add new campground to database
router.post("/", function(req, res){
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
router.get("/new", function(req, res){
    res.render("campgrounds/new");
});

//Show - show details about specific campground
router.get("/:id", function(req, res){
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

module.exports = router;