(function($){
$(document).ready(function(){
	var $ideas = $.writemelater.ideas;

	$ideas.enableDeleteIdeaOnBackspace();

	$('p#new').click($ideas.addNewIdea);

	$('#ideas').on('submit','form', $ideas.commitIdea);

	$('#ideas').on('update', function rerenderIdeas () {
		$(this).html('');
		$ideas.addAllIdeas($(this));
	});

	$('#ideas').trigger('update');

});
})(jQuery);
