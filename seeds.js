var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Gordons Campground", 
        image: "https://media.pitchup.co.uk/images/3/image/private/s--wEfYg59T--/c_limit,h_1350,w_1800/e_improve,fl_progressive/q_50/b_rgb:000,g_south_west,l_pu_logo_white_vcbkgt,o_25/v1455737547/gordons-campground/133079.jpg", 
        description: "Gordons Campground is a 75 wooded acre campground nestled in the heart of Northern Indiana overlooking Big Long Lake. With activities for the whole family, Gordons is truly a great staycation destination. Pool, playground, two modern bathhouses, activities, dodgeball, volleyball, basketball, horseshoes, hayrides, BINGO, crafts, and more. Cabin Rentals, Camper Rentals, Primitive/Tent and RV Sites."
    },
    {
        name: "Johnny Appleseed Campground",
        image: "https://i.pinimg.com/originals/4e/92/6f/4e926ffff71d80b23d19f6e77b7ba81c.jpg",
        description: "Johnny Appleseed Park, including what was formerly known as Archer Park, is a public park in Fort Wayne, Indiana. It is named after the popular-culture nickname of John Chapman, better known as 'Johnny Appleseed', a famous American pioneer, who was buried on the site."
    },
    {
        name: "Bixler Lake",
        image: "https://50campfires.com/wp-content/uploads/2014/05/photo51-620x330.jpg",
        description: "Bixler Lake Park completely surrounds 117-acre Bixler Lake, providing unique opportunities for outdoor recreation and education. The natural beauty of the area has been combined with development of facilities for the enjoyment of all ages and interests. Bixler Lake Park is over 530 acres including the lake! A pedestrian walkway and nature trail of over three miles circles the lake through the wetland nature area, and it runs by two beaches and landscaped woodlands. Six open-air pavilions are available for reservation and numerous playgrounds provide fun for children. Fishing, boating and swimming are popular activities. Varied habitats throughout the park encourage wildlife ranging from deer to fox. Observation platforms enable excellent wildlife viewing of waterfowl and nature interpretation is accomplished with signs along the trail and at the trailheads. Other facilities include a lighted softball field, campground, tennis courts and basketball courts."
    },
    {
        name: "Camp Potawotami",
        image: "https://photos.smugmug.com/photos/i-78dhF7q/0/M/i-78dhF7q-M.jpg",
        description: "YMCA Camp Potawotami has provided friendship and fun, challenges and character-building in a beautiful, safe environment for over 90 years. Located in Lagrange County about 40 miles north of Fort Wayne, we sit along the shores of Blackman Lake on over 210 acres of woodlands, meadows, wetlands and hiking trails for you to explore."
    },
    {
        name: "Pokagon State Park",
        image: "http://4.bp.blogspot.com/_fF5Eo5yImCQ/S-yZJAQ1lAI/AAAAAAAAAWs/ydk8CRH87pA/s1600/camper+1.JPG",
        description: "Pokagon State Park is an Indiana state park in the northeastern part of the state, near the village of Fremont and 5 miles north of Angola. It was named for the 19th-century Potawatomi chief, Leopold Pokagon, and his widely known son, Simon Pokagon, at Richard Lieber's suggestion."
    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Removed campgrounds!");
            Comment.remove({}, function(err){
               if(err){
                   console.log(err);
               }else{
                   console.log("Removed comments!");
               }
            });
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Added a campground!");
                        //Create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish that there was internet.",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                }else{
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Comment created!");
                                }
                            }
                        );
                    }
                });
            });
        }
    });
}

module.exports = seedDB;