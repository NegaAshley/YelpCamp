# YelpCamp
* Made with guidance from Colt Steele's Web Developer Bootcamp
* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

# Each Campground has:
* Name
* Image

# Layout and Basic Styling
* Create header and footer partials
* Add in Bootsrap

# Creating New Campgrounds
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

# Style the Campgrounds page
* Add a better header/title
* Make campgrounds display in a grid

# Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form

# Add Mongoose
* Install and configure Mongoose
* Setup campground model
* Use campground model inside of routes

# Show Page
* Add description to campground model
* Show db.collection.drop()
* Add a show route/templates

# Refactor Mongoose
* Create models directory
* Use module.export
* Require everything correctly

# Add Seeds file
* Add a seed.js file
* Run the seeds file every time the server starts

# Add the Comment model
* Make errors go away
* Display comments on campground show page

# Comment New/Create
* Nested routes
* Add comment new and create routes
* Add new comment form

# Routes

# Campground Routes
* INDEX /campgrounds - GET
* NEW /camgrounds/new - GET
* CREATE /campgrounds - POST
* SHOW /campgrounds/:id - GET

# Comment Routes
* NEW /campgrounds/:id/comments/new - GET
* CREATE /campgrounds/:id/comments - POST

# Style Show Campground Page
* Add sidebar to show page
* Display comments nicely

# Finish Styling Show Page
* Add public directory
* Add custom stylesheet

# Add User Model
* Install all packages needed for auth
* Define User model

# Auth Register
* Configure Passport
* Add register routes
* Add register template