(function($){
$(document).ready(function(){

/* TEXTAREA auto-resize code */
/* some copypaste from the net + hack on it */
/* HERE BE DRAGONS! */
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

setTimeout(function resizeOnLoadedElements () {
  $.each(
    $('#ideas textarea'),
    function(i,domElement){ resizeElement(domElement);}
  );
},1000);


});
})(jQuery);
