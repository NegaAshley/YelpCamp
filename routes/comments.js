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
           var newAuthor = {
               id: req.user._id,
               username: req.user.username
           };
           var newComment = {text: req.body.comment, author: newAuthor};
            Comment.create(newComment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
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

//Edit - shows form to edit comment
router.get("/:comment_id/edit", function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            console.log("Error showing edit comment page!");
            console.log(err);
            res.redirect("back");
        }else{
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment}); 
        }
    });
});

//Update - allows update of campground
router.put("/:comment_id", function(req, res){
    res.send("You hit the update route for comment!");
});

//Function to be used as middleware to check for auth
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;