const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const logger = require("morgan");

const express = require("express");
const app = express();

const exphbs = require("express-handlebars");
// // Scraping tools
// const axios = require("axios");
// const cheerio = require("cheerio");

// //Get Models
// const note = require("./models/Note");
// const article = require("./models/Article");
// const index = require("./models/index");

const PORT = process.env.PORT || 3000;

// Require all models
const db = require("./models");

// Morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//If deployed, use the deployed database use the local mongoHeadlines database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/MongoHeadlines";
//Connect to Mongo DB
mongoose.connect(MONGODB_URI);

// // Routes (move and update routes to route folder)

// // A GET route for scraping the E!News website
// app.get("/scrape", function (req, res) {
//     // First, we grab the body of the html with axios
//     axios.get("https://www.eonline.com/news").then(function (response) {
//         // Then, we load that into cheerio and save it to $ for a shorthand selector
//         var $ = cheerio.load(response.data);

//         // Save an empty result object
//         var result = {};

//         // Now, we grab every h2 within an article tag, and do the following:
//         $("h2.content-item__title").each(function (i, element) {

//             // Add the text and href of every link, and save them as properties of the result object
//             result.title = $(this)
//                 .children("")
//                 .text();
//             result.img = $(this)
//                 .find("content-item__thumbnail")
//                 .find("img")
//                 .attr("src")
//             result.link = $(this)
//                 .children("a")
//                 .attr("href");

//             // Create a new Article using the `result` object built from scraping
//             db.Article.create(result)
//                 .then(function (dbArticle) {
//                     console.log(dbArticle);
//                 })
//                 .catch(function (err) {
//                     console.log(err);
//                 });
//         });

//         // Send a message to the client
//         res.send("Scrape Complete");
//     });
// });

// // Route for getting all Articles from the db
// app.get("/articles", function (req, res) {
//     // Grab every document in the Articles collection
//     db.Article.find({})
//         .then(function (dbArticle) {
//             // If we were able to successfully find Articles, send them back to the client
//             res.json(dbArticle);
//         })
//         .catch(function (err) {
//             // If an error occurred, send it to the client
//             res.json(err);
//         });
// });

// // Route for grabbing a specific Article by id, populate it with it's note
// app.get("/articles/:id", function (req, res) {
//     // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
//     db.Article.findOne({ _id: req.params.id })
//         // ..and populate all of the notes associated with it
//         .populate("note")
//         .then(function (dbArticle) {
//             // If we were able to successfully find an Article with the given id, send it back to the client
//             res.json(dbArticle);
//         })
//         .catch(function (err) {
//             res.json(err);
//         });
// });

// // Route for saving/updating an Article's associated Note
// app.post("/articles/:id", function (req, res) {
//     // Create a new note and pass the req.body to the entry
//     db.Note.create(req.body)
//         .then(function (dbNote) {
//             // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
//             // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
//             // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
//             return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
//         })
//         .then(function (dbArticle) {
//             // If we were able to successfully update an Article, send it back to the client
//             res.json(dbArticle);
//         })
//         .catch(function (err) {
//             // If an error occurred, send it to the client
//             res.json(err);
//         });
// });

// //Delete Article
// app.delete("/articles/:id", function(req, res) {
//     db.Article.deleteOne({ 
//       where: { 
//         _id: req.params.id 
//       } 
//     }).then(result => {
//         db.Note.deletMany({
//             where: {
//             article: req.params.id
//             }
//         }).then//finish later
//       res.json(dbProduct);
//     });
//   });


// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
