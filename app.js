var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");
var campgrounds = [
        {name: "Johnny Appleseed Campground", image: "https://i.pinimg.com/originals/4e/92/6f/4e926ffff71d80b23d19f6e77b7ba81c.jpg"},
        {name: "Bixler Lake", image: "https://50campfires.com/wp-content/uploads/2014/05/photo51-620x330.jpg"},    
        {name: "Camp Potawotami", image: "https://photos.smugmug.com/photos/i-78dhF7q/0/M/i-78dhF7q-M.jpg"},
        {name: "Johnny Appleseed Campground", image: "https://i.pinimg.com/originals/4e/92/6f/4e926ffff71d80b23d19f6e77b7ba81c.jpg"},
        {name: "Bixler Lake", image: "https://50campfires.com/wp-content/uploads/2014/05/photo51-620x330.jpg"},    
        {name: "Camp Potawotami", image: "https://photos.smugmug.com/photos/i-78dhF7q/0/M/i-78dhF7q-M.jpg"}    
    ];

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

//Schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

//Make model using campground schema
var Campground = mongoose.model("Campground", campgroundSchema);

//Create a campground
// Campground.create(
//     {
//         name: "Camp Potawotami", 
//         image: "https://photos.smugmug.com/photos/i-78dhF7q/0/M/i-78dhF7q-M.jpg"
//     }, function(err, campground){
//         if(err){
//             console.log("Error creating campground!");
//             console.log(err);
//         }else{
//             console.log("We just saved a campground to the database!");
//             console.log(campground);
//         }
//     }
// );

app.get("/",  function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    //Get all campgrounds from database
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log("Error getting campgrounds from database!");
            console.log(err);
        }else{
            res.render("campgrounds", {campgrounds:allCampgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res){
    var newCampgroundName = req.body.newCampgroundName;
    var newCampgroundImage = req.body.newCampgroundImage;
    var newCampground = {name: newCampgroundName, image: newCampgroundImage};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("addCampground");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server has started!");
});