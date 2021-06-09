$(document).ready(function(){


  var playlist = [{
      title:"Mộc Lan Hành",
      artist:"Thương Khung",
      mp3:"https://mp3.fastupload.co/data/1623245229/y2mate.com-Vietsub-Moc-Lan-Hanh-Thuong-Khung-SynthV-Vong-Xuyen-Phong-Hoa-Luc.mp3",
      oga:"https://mp3.fastupload.co/data/1623245229/y2mate.com-Vietsub-Moc-Lan-Hanh-Thuong-Khung-SynthV-Vong-Xuyen-Phong-Hoa-Luc.mp3",
      poster: "https://i1.sndcdn.com/artworks-9yu8NtqUzMqfItul-o6Vwuw-t500x500.png"
    },{
      title:"Họ yêu ai mất rồi",
      artist:"Doãn Hiếu",
      mp3:"https://mp3.fastupload.co/data/1623251650/y2mate.com-Ho-Yeu-Ai-Mat-Roi-l-Doan-Hieu-l-Official-Lofi-Version.mp3",
      oga:"https://mp3.fastupload.co/data/1623251650/y2mate.com-Ho-Yeu-Ai-Mat-Roi-l-Doan-Hieu-l-Official-Lofi-Version.mp3",
      poster: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/2/0/c/8/20c8208e735601981e8d3b85b3d4cacd.jpg"
    }];
  
  var cssSelector = {
    jPlayer: "#jquery_jplayer",
    cssSelectorAncestor: ".music-player"
  };
  
  var options = {
    swfPath: "https://cdnjs.cloudflare.com/ajax/libs/jplayer/2.6.4/jquery.jplayer/Jplayer.swf",
    supplied: "ogv, m4v, oga, mp3",
    volumechange: function(event) {
      $( ".volume-level" ).slider("value", event.jPlayer.options.volume);
    },
    timeupdate: function(event) {
      $( ".progress" ).slider("value", event.jPlayer.status.currentPercentAbsolute);
    }
  };
  
  var myPlaylist = new jPlayerPlaylist(cssSelector, playlist, options);
  var PlayerData = $(cssSelector.jPlayer).data("jPlayer");
  
  
  // Create the volume slider control
  $( ".volume-level" ).slider({
     animate: "fast",
		max: 1,
		range: "min",
		step: 0.01,
		value : $.jPlayer.prototype.options.volume,
		slide: function(event, ui) {
			$(cssSelector.jPlayer).jPlayer("option", "muted", false);
			$(cssSelector.jPlayer).jPlayer("option", "volume", ui.value);
		}
  });
  
  // Create the progress slider control
  $( ".progress" ).slider({
		animate: "fast",
		max: 100,
		range: "min",
		step: 0.1,
		value : 0,
		slide: function(event, ui) {
			var sp = PlayerData.status.seekPercent;
			if(sp > 0) {
				// Move the play-head to the value and factor in the seek percent.
				$(cssSelector.jPlayer).jPlayer("playHead", ui.value * (100 / sp));
			} else {
				// Create a timeout to reset this slider to zero.
				setTimeout(function() {
					 $( ".progress" ).slider("value", 0);
				}, 0);
			}
		}
	});

  
});
