const mongoose = require("mongoose");

// Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, creates a new Note Schema object
const NoteSchema = new Schema({
  // `title` is of type String
  title: {
    type: String,
    default: null
  },
  // `body` is of type String
  body: {
    type: String,
    required: true
  },
  article: {
    type:Schema.Types.ObjectId,
    ref: "Articles"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// This creates our model from the above schema, using mongoose's model method
const Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;
