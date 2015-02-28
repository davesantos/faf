window.lazySizesConfig = {
  addClasses: true
};

$(function(){

  // Target your .container, .wrapper, .post, etc.
  var vp = $(".video-player"),
      ap = $(".audio-player");

  vp.fitVids();
  ap.fitVids();


});