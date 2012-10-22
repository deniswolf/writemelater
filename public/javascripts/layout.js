(function($){
$(document).ready(function(){

function resizeElement (e) {
  var offsetHeight = e.offsetHeight - e.clientHeight;

  // e.style.height = 'auto';
  e.style.height = (e.scrollHeight  + offsetHeight ) + 'px';

  var offsetWidth = e.offsetWidth - e.clientWidth;

  // e.style.width = 'auto';
  e.style.width = (e.scrollWidth  + offsetWidth ) + 'px';
}

$('#ideas').on('input, keyup', 'textarea', function autoResize () {
  resizeElement(this);
});



});
})(jQuery);
