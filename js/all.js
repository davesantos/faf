$(function(){
	var $body = $('html, body'),
		$loader = $('.loader'),
		content = $('#wrap').smoothState({
			prefetch: true,
			onStart: {
				duration: 250, // Duration of our animation
				// pageCacheSize: 4,
				render: function (url, $container) {
					// toggleAnimationClass() is a public method
					// for restarting css animations with a class
					content.toggleAnimationClass('is-exiting');
					$body.animate({
					  scrollTop: 0
					});
				}
			},
			onProgress : {
				duration: 0,
				render: function (url, $container) {
					$loader.addClass('loading');
					console.log('loading');
				}
			},
			onEnd : {
				duration: 0,
				render: function (url, $container, $content) {
					$loader.removeClass('loading');
					$container.html($content);
					console.log('done');
				}
			}
		}).data('smoothState');

});