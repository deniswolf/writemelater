var locomotive = require('locomotive'),
    Controller = locomotive.Controller;

var action = new Controller();

// renderers

action.index = function() {
  this.render();
};

action.show = function() {
  this.render();
};

action.edit = function() {
  this.render();
};

// doers

action.create = function() {
  return;
};

action.update = function() {
  return;
};

action.destroy = function() {
  return;
};




module.exports = action;
