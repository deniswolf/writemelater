(function($){
	var c = function(){
		console.log(arguments);
	};
$(document).ready(function(){

	function addNewIdea () {
		var el = $('div#ideas'),
				self = this;

			$.get('/ideas/new')
				.success(function addToDom(data){
				el.append(data);
			});
	}

	function commitIdea () {
		var event = arguments[0],
				form = $(this),
				self = this,
				update = (form.find('input[name=_method]').val() === 'put'),
				data = form.serialize(),
				url = form.attr('action');

		event.preventDefault();

		$.post(url, data)
		// if no id - re-render this element as 'edit'
			.success(function checkIfNew (idea) {
				if (! update && idea._id) {
					$.get('/ideas/'+idea._id+'/edit')
						.success(function(data){
							c('render stuff from post resp:',data, self);
							form.html(data);
						});
				}
			})
			.error(function onError () {
				window.alert('f-cup in post update!');
			});

	}

	$('p#new').click(addNewIdea);

	$('#ideas').on('submit','form',commitIdea);


});
})(jQuery);
