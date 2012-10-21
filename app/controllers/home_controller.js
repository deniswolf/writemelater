var locomotive = require('locomotive'),
    Controller = locomotive.Controller,
    Model = require('../models/idea_model');

var action = new Controller();

// Renderers

action.show = function() {
  var self = this;
  self.user = self.req.user;

  self.respond(
    {
      html:true,
      json: true
    });
};

module.exports = action;
