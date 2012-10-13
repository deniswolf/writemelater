(function($){
	//scope keymaster.js
	var key = window.key;
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

	function deleteIfEmptyIdea(event){
		// if idea has no text and user click 'backspace'
		// display warning about delete
		//   if he starts print text - disable warning and return
		//   if he didn't press backspace for 1 sec - disable warning and return
		//   else on his second click - delete idea
		console.log('and text is:', $(event.srcElement).val());
		var input = $(event.srcElement),
				idea = input.closest('.idea'),
				text = input.val(),
				warning = idea.find('.alarm.dare-backspace'),
				wasWarned = input.attr('data-delete-warning');

				if (text) return;
				if (wasWarned) {
					var id = input.closest('.idea').attr('id');
					deleteIdea(id);
					console.log('go to delete');
					warning.fadeOut();
					return;
				}

				input.attr('data-delete-warning','true');
				warning.fadeIn(function(){
					window.setTimeout(
						function(){
							if (input.attr('data-delete-warning')){
								input.attr('data-delete-warning','');
								warning.fadeOut();
							}
						},
						1500);
				});
	}

	function enableDeleteIdeaOnBackspace (argument) {
		var keyOriginalFilter = key.filter;

		$('#ideas')
			.on('focus','.idea form .idea-text',function(){
				key.filter = function filterModified (event) {
					var tagName = (event.target || event.srcElement).tagName;
					return !(tagName === 'INPUT' || tagName === 'SELECT');
				};
				key.setScope('idea');
			})
			.on('blur', '.idea form .idea-text', function(){
				key.filter = keyOriginalFilter;
				key.setScope('all');
			});

		key('backspace', 'idea', deleteIfEmptyIdea);
	}

	enableDeleteIdeaOnBackspace();

	$('p#new').click(addNewIdea);

	$('#ideas').on('submit','form',commitIdea);

	$('#ideas').on('update', function rerenderIdeas () {
		$(this).html('');
		addAllIdeas($(this));
	});

	$('#ideas').trigger('update');

});
})(jQuery);
