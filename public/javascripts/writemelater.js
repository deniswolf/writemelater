(function($){
$('document').ready(function(){

  // data model
  var Idea = function(text, children) {
    this.text = ko.observable(text);
    this.children = ko.observableArray(children || []);
  };

  // mmvc model
  var IdeaMMVCModel = function() {
      this.ideas = ko.observableArray([
          new Idea("Bob", [
              new Idea("Jan"),
              new Idea("Don", [
                  new Idea("Doug")
              ])
          ]),
          new Idea("Ann", [
              new Idea("Eve"),
          ])
      ]);

      this.addChild = function(text, parentArray) {
          parentArray.push(new Idea(text));
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
          childName = context.$data.text() + " child",
          parentArray = context.$data.ideas || context.$data.children;

      //add a child to the appropriate parent, calling a method off of the main view model (context.$root)
      context.$root.addChild(childName, parentArray);

      return false;
  });

  $("#new").on("click", ".create", function(){
    var ideas = ko.contextFor($('#ideas')[0]).$root.ideas;
    ideas.push(new Idea('nya!'));
  });


});
})(jQuery);
