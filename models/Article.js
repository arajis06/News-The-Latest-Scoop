const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Schema constructor, to create a new UserSchema object
const ArticleSchema = new Schema({
    // Title of Article
    title: {
        type: String,
        required: true
    },
    // // img of Article
    // image: {
    //     type: String,
    //     required: false,
    //     default: null
    // },
    // // Summary to Article
    // summary: {
    //     type: String,
    //     required: true
    // },
    // Link to Article
    link: {
        type: String,
        required: true
    },
    // Save Article
    saved: {
        type: Boolean,
        required: true,
        default: false
    },
    // Delete Article
    deleted: {
        type: Boolean,
        required: true,
        default: false
    },
    // Set date when added to DB
    createdAt: {
        type: Date,
        default: Date.now
    },

    // `note` is an object that stores a Note id
    // The ref property links the ObjectId to the Note model
    // This allows us to populate the Article with an associated Note
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        required: false
    }
});

// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
