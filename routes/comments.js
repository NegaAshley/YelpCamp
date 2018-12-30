var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment");

//New - show form to create new comment
router.get("/new", isLoggedIn, function(req, res){
    //Find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.loge(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    });
});

//Create - add new comment to database
router.post("/", isLoggedIn, function(req, res){
   //Lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       }else{
          Comment.create(req.body.comment, function(err, comment){
              if(err){
                  console.log(err);
              }else{
                  //Add username and id to comment
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  //Save comment
                  comment.save();
                  campground.comments.push(comment);
                  campground.save();
                  console.log(comment);
                  res.redirect("/campgrounds/" + campground._id);
              }
          });
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