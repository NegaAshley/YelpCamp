var express     = require("express"),
    passport    = require("passport"),
    router      = express.Router(),
    User        = require("../models/user");

//Root route
router.get("/",  function(req, res){
    res.render("landing");
});

//Show register form
router.get("/register", function(req, res){
    res.render("register");
});

//Sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log("Error registering user!");
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

//Show log in form
router.get("/login", function(req, res){
    res.render("login");
});

//Log in logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds", 
        failureRedirect: "/login"
        
    }),
    function(req, res){
    res.send("Login logic here");
    }
);

//Log out route
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

//Function to be used as middleware to check for auth
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;