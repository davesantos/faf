$(function(){
  "use strict"
  // Target your .container, .wrapper, .post, etc.
  var vp = $(".video-player"),
      ap = $(".audio-player");

  vp.fitVids();
  ap.fitVids();

  $(window).on('resize', function(){
    lazySizes.autoSizer.checkElems();
  });
});


