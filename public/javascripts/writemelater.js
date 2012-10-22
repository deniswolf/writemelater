(function($){
$('document').ready(function(){

  var ipsum = {
    short:"I thought what I'd do was, I'd pretend I was one of those deaf-mutes.",
    medium:"That way I wouldn't have to have any goddamn stupid useless conversations with anybody. If anybody wanted to tell me something they'd have to write it on a piece of paper and shove it over to me. They'd get bored as hell doing that after a while, and then I'd be through with having conversations for the rest of my life.",
    long:"Here's to the crazy ones\nThe misfits\nThe rebels\nThe troublemakers\nThe round pegs in the square holes\nThe ones who see things differently\nThey're not fond of rules\nAnd they have no respect for the status quo\nYou can quote them, disagree with them, glorify or vilify them\nAbout the only thing you can't do is ignore them\nBecause they change things\nThey push the human race forward\nAnd while some may see them as the crazy ones, we see genius\nBecause the people who are crazy enough to think they can change the world, are the ones who do.",
  };

  // data model
  var Idea = function(text, children) {
    this.text = ko.observable(text);
    this.children = ko.observableArray(children || []);
  };

  // mmvc model
  var IdeaMMVCModel = function() {
      this.ideas = ko.observableArray([
          new Idea(ipsum.short, [
              new Idea(ipsum.medium),
              new Idea(ipsum.short, [
                  new Idea(ipsum.long)
              ])
          ]),
          new Idea(ipsum.medium)
      ]);

      this.addChild = function(text, parentArray) {
          parentArray.unshift(new Idea(text));
      };
  };
  window.i = ko.applyBindings(new IdeaMMVCModel());

  //attach event handlers
  $("#ideas").on("click", ".remove", function() {
      //retrieve the context
      var context = ko.contextFor(this),
          parentArray = context.$parent.ideas || context.$parent.children;

      //remove the data (context.$data) from the appropriate array on its parent (context.$parent)
      parentArray.remove(context.$data);

      return false;
  });

  $("#ideas").on("click", ".add", function() {
      //retrieve the context
      var context = ko.contextFor(this),
          parentArray = context.$data.ideas || context.$data.children;

      //add a child to the appropriate parent, calling a method off of the main view model (context.$root)
      context.$root.addChild('', parentArray);

      return false;
  });

  $("#new").on("click", ".create", function(){
    var ideas = ko.contextFor($('#ideas')[0]).$root.ideas;
    ideas.unshift(new Idea(''));
  });


});
})(jQuery);
