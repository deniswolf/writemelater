var db = require('../../db');

var IdeaSchema = new db.mongoose.Schema({
  text: String,
  updated: { type: Date, default: Date.now },
  drafts: [{
    text: String,
    updated: { type: Date, default: Date.now },
  }]
});

var Idea = db.connection.model('Idea', IdeaSchema);




module.exports = Idea;