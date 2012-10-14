(function($){

$(document).ready(function(){

  // check and scope keymaster.js
  if (typeof(window.key) === 'undefined') {
    console.log('no keymaster lib! so no warnAndDeleteOnEmptyIdea.');
  }
  var key = window.key;


  // --- IDEAS ---

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

	function commitIdea (event) {
		var form = $(this),
				update = (form.find('input[name=_method]').val() === 'put'),
				data = form.serialize(),
				url = form.attr('action');

		event.preventDefault();

		$.post(url, data)
		// if no id - re-render this element as 'edit'
			.success(function checkIfNew (idea) {
				if (! update && idea.id) {
					$.get('/ideas/'+idea.id+'/edit')
						.success(function(data){
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
		var input = $(event.srcElement),
				idea = input.closest('.idea'),
				text = input.val(),
				warning = idea.find('.alarm.dare-backspace'),
				wasWarned = input.attr('data-delete-warning');

				if (text) return;
				if (wasWarned) {
					var id = input.closest('.idea').attr('id');
					deleteIdea(id);
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

	// EXPORT

	var ideas = {};

	ideas.enableDeleteIdeaOnBackspace = enableDeleteIdeaOnBackspace;
	ideas.addNewIdea = addNewIdea;
	ideas.commitIdea = commitIdea;
	ideas.addAllIdeas = addAllIdeas;

	$.writemelater.ideas = ideas;

});
})(jQuery);
