(function($){
$(document).ready(function(){

	function addNewIdeaHere () {
		var el = $(this),
				self = this;

			$.get('/ideas/new').success(function addToDom(data){
				el.append(data);
			});
	}

	$('div#ideas').click(addNewIdeaHere);


});
})(jQuery);
