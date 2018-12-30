var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds"),
    campgroundRoutes= require("./routes/campgrounds"),
    commentRoutes   = require("./routes/comments"),
    indexRoutes     = require("./routes/index");

seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

//Passport Configuration
app.use(require("express-session")({
    secret: "Meepo is the best cat ever!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Passes current user through all routes
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//Use routes required
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server has started!");
});