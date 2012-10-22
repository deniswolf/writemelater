(function($){
$('document').ready(function(){

  // data model
  var Idea = function(text, children) {
    this.text = ko.observable(text);
    this.children = ko.observableArray(children || []);
  };

  var ipsum = {
    short:"Okay, so, tell me about the hash bars.",
    medium:"What's wrong with that? Nobody ever robs restaurants. Why not? Bars, liquor stores, gas stations; you get your head blown off sticking up one of them. Restaurants, on the other hand, you catch with their pants down. They're not expecting to get robbed. Not as expectant, anyway.",
    long:"I been saying that shit for years. And if you heard it, that meant your ass. I never gave much thought to what it meant. I just thought it was some cold-blooded shit to say to a motherfucker before I popped a cap in his ass. But I saw some shit this morning made me think twice. See, now I'm thinking, maybe it means you're the evil man, and I'm the righteous man, and Mr. 9 millimeter here, he's the shepherd protecting my righteous ass in the valley of darkness. Or it could mean you're the righteous man and I'm the shepherd and it's the world that's evil and selfish. I'd like that. But that shit ain't the truth. The truth is, you're the weak, and I'm the tyranny of evil men. But I'm trying, Ringo. I'm trying real hard to be the shepherd.",
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
