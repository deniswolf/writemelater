var locomotive = require('locomotive'),
    Controller = locomotive.Controller,
    Model = require('../models/idea_model');

var action = new Controller();

// renderers

action.index = function() {
  var self = this,
      idea_id = self.param('idea_id');
      self.idea_id = idea_id;

  Model.findById(
    idea_id,
    function(err, idea){
      if (err) return;

      self.comments = idea.drafts.sort(
        function(a, b){
          return b.updated.getTime() - a.updated.getTime();
        });
      self.render();
    }
  );
};

action.show = function() {
  var self = this,
    id = self.param(id),
    idea_id = self.param('idea_id');
    self.idea_id = idea_id;

  Model.findById(
    idea_id,
    function(err, idea){
      if (err) return;

      self.drafts = idea.drafts.id(id);
      self.render();
    }
  );
};

action.edit = function() {
  var self = this,
    id = self.param(id),
    idea_id = self.param('idea_id');
    self.idea_id = idea_id;

  Model.findById(
    idea_id,
    function(err, idea){
      if (err) return;

      self.draft = idea.drafts.id(id);
      self.render();
    }
  );
};

// doers

action.create = function() {
  var self = this,
    idea_id = self.param('idea_id'),
    draft = self.param('draft');

  Model.findById(
    idea_id,
    function(err, idea){
      if (err) return;
        idea.drafts.push(draft);
        idea.save(function(){
          self.render();
        });
    }
  );
};

action.update = function() {
  var self = this,
    idea_id = self.param('idea_id'),
    id = self.param('id'),
    draft = self.param('draft');

  Model.findById(
    idea_id,
    function(err, idea){
      if (err) return;
        idea.drafts.id(id).remove();
        idea.drafts.push(draft);
        idea.save(function(){
          self.render();
        });
    }
  );
};

action.destroy = function() {
  var self = this,
    idea_id = self.param('idea_id'),
    id = self.param('id'),
    draft = self.param('draft');

  Model.findById(
    idea_id,
    function(err, idea){
      if (err) return;
        idea.drafts.id(id).remove();
        idea.save(function(){
          self.render();
        });
    }
  );
};




module.exports = action;
