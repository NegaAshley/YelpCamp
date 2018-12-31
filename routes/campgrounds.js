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
router.post("/", isLoggedIn, function(req, res){
    //Add username and id to author
    var newAuthor = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampgroundName = req.body.newCampgroundName;
    var newCampgroundImage = req.body.newCampgroundImage;
    var newCampgroundDescription = req.body.newCampgroundDescription;
    var newCampground = {name: newCampgroundName, image: newCampgroundImage, 
        description: newCampgroundDescription, author: newAuthor};
    Campground.create(newCampground, function(err, campground){
        if(err){
            console.log("Error creating campground!");
            console.log(err);
        }else{
            campground.save();
            console.log("Campground saved to database!");
            console.log(campground);
            res.redirect("/campgrounds");
        }
    });
});

//New - show form to create new campground
router.get("/new", isLoggedIn, function(req, res){
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

//Function to be used as middleware to check for auth
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;