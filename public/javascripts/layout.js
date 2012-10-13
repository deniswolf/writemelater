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
					el.prepend(data);
					var first_form = el.find('form:first');
					first_form.find('textarea').focus();
			});
	}

	function addIdea (container, id) {
		$.get('/ideas/'+id+'/edit')
			.success(function addToDom (idea) {
				container.append(idea);
			});
	}

	function addAllIdeas (container) {
		$.getJSON('/ideas.json')
			.success(function  (ideas) {
				ideas.forEach(function (idea) {
					addIdea(container, idea._id);
				});
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
							form.replaceWith(data);
						});
				}
			})
			.error(function onError () {
				window.alert('f-cup in post update!');
			});

	}

	function deleteIdea (id) {
		var	idea = $('#ideas .idea#'+id),
				form = idea.find('form.delete'),
				data = form.serialize(),
				url = form.attr('action');

		$.post(url, data)
		// if no id - re-render this element as 'edit'
			.success(function afterDelete() {
				idea.fadeOut(function afterFadeOut (argument) {
					idea.remove();
				});
			})
			.error(function onError () {
				window.alert('f-cup in delete!');
			});

	}
	$('p#new').click(addNewIdea);

	$('#ideas').on('submit','form',commitIdea);

	$('#ideas').on('update', function rerenderIdeas () {
		$(this).html('');
		addAllIdeas($(this));
	});

	$('#ideas').trigger('update');

});
})(jQuery);
