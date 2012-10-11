var db = require('../../db');

var IdeaSchema = new db.mongoose.Schema({
  text: String,
  owners: [db.mongoose.Schema.Types.ObjectId],
  drafts: [{
    text: String
  }]
});

var Idea = db.connection.model('Idea', IdeaSchema);




module.exports = Idea;