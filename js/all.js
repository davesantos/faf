$(function(){

	$(".content img").unveil(200, function() {
	  $(this).load(function() {
	    this.style.opacity = 1;
	  });
	});

});