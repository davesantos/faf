window.lazySizesConfig = {
  addClasses: true
};

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-4820278-8', 'auto');
ga('send', 'pageview');

$(function(){

  // Target your .container, .wrapper, .post, etc.
  var vp = $(".video-player"),
      ap = $(".audio-player");



  vp.fitVids();
  ap.fitVids();
});

$(window).lazyLoadXT();
