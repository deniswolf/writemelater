var locomotive = require('locomotive'),
    Controller = locomotive.Controller,
    Model = require('../models/idea_model');

var action = new Controller();

// Renderers

action.index = function() {
  var self = this;
  self.user = self.req.user;

  Model.find(null,null,{sort:'updated'}, function(err, data){
    if (err) console.log('Idea: failed to index with req:',this.req);
    self.ideas = data;
    self.render();
  });
};

action.new = function() {
  var self = this;

  self.render();
};

action.show = function() {
  var self = this,
    id = self.param('id');
    self.user = self.req.user;

  if (id){
    Model.findById(
      id,
      function(err, data){
    if (err) console.log('Idea: failed to show with req:',this.req);
        self.idea = data;
        self.render();
      }
    );
  } else {
    self.render();
  }
};

action.edit = function() {
  var self = this,
    id = self.param('id');

  if (id){
    Model.findById(
      id,
      function(err, data){
        if (err) console.log('Idea: failed to edit with req:',this.req);
        self.idea = data;
        self.render();
      }
    );
  } else {
    self.redirect('/');
  }
};

// Doers

action.create = function() {
  var self = this,
    idea = self.param('idea');


  if (idea){
    Model.create(
      idea,
      function(err, data){
        if (err) console.log('Idea: failed to create with req:',this.req);
        self.res.send(200, data);
      }
    );
  } else {
    self.redirect('/');
  }
};

action.update = function() {
  var self = this,
    id = self.param('id'),
    idea = self.param('idea');

  if (id){
    Model.findByIdAndUpdate(
      id,
      idea,
      function(err, data){
        if (err) console.log('Idea: failed to update with req:',this.req);
        self.res.send(200, data);
      }
    );
  } else {
    self.redirect('/');
  }
};

action.destroy = function() {
  var self = this,
    id = self.param('id');
    self.user = self.req.user;

  if (id){
    Model.findByIdAndRemove(
      id,
      function(err){
        if (err) console.log('Idea: failed to destroy with req:',this.req);
        self.redirect('/');
      }
    );
  } else {
    self.redirect('/');
  }
};


module.exports = action;
