$(document).ready(function () {
  var playlist = [
    {
      title: "Mộc Lan Hành",
      artist: "Thương Khung",
      mp3:
        "https://github.com/DangDev/dang-audio-player/releases/download/music/y2mate.com.-.Vietsub.M.c.Lan.Hanh.Th.ng.Khung.SynthV.Vong.Xuyen.Phong.Hoa.L.c.mp3",
      oga:
        "https://github.com/DangDev/dang-audio-player/releases/download/music/y2mate.com.-.Vietsub.M.c.Lan.Hanh.Th.ng.Khung.SynthV.Vong.Xuyen.Phong.Hoa.L.c.mp3",
      poster:
        "https://i1.sndcdn.com/artworks-9yu8NtqUzMqfItul-o6Vwuw-t500x500.png"
    },
    {
      title: "Họ yêu ai mất rồi",
      artist: "Doãn Hiếu",
      mp3:
        "https://github.com/DangDev/dang-audio-player/releases/download/music/y2mate.com.-.H.Yeu.Ai.M.t.R.i.l.Doan.Hi.u.l.Official.Lofi.Version.mp3",
      oga:
        "https://github.com/DangDev/dang-audio-player/releases/download/music/y2mate.com.-.H.Yeu.Ai.M.t.R.i.l.Doan.Hi.u.l.Official.Lofi.Version.mp3",
      poster:
        "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/2/0/c/8/20c8208e735601981e8d3b85b3d4cacd.jpg"
    },
    {
      title: "Windy Hill",
      artist: "BGM",
      mp3:
        "https://github.com/DangDev/dang-audio-player/releases/download/music/y2mate.com.-.Windy.Hill.BGM.mp3",
      oga:
        "https://github.com/DangDev/dang-audio-player/releases/download/music/y2mate.com.-.Windy.Hill.BGM.mp3",
      poster: "https://i.ytimg.com/vi/f1hsXN9XA8k/0.jpg"
    },
    {
      title: "Năm ấy",
      artist: "Đức Phúc",
      mp3:
        "https://github.com/DangDev/dang-audio-player/releases/download/music/y2mate.com.-.Nam.y.D.c.Phuc.Video.Lyrics.mp3",
      oga:
        "https://github.com/DangDev/dang-audio-player/releases/download/music/y2mate.com.-.Nam.y.D.c.Phuc.Video.Lyrics.mp3",
      poster: "https://i.ytimg.com/vi/7GePzw6q5EQ/0.jpg"
    }
  ];

  var cssSelector = {
    jPlayer: "#jquery_jplayer",
    cssSelectorAncestor: ".music-player"
  };

  var options = {
    swfPath:
      "https://cdnjs.cloudflare.com/ajax/libs/jplayer/2.6.4/jquery.jplayer/Jplayer.swf",
    supplied: "ogv, m4v, oga, mp3",
    volumechange: function (event) {
      $(".volume-level").slider("value", event.jPlayer.options.volume);
    },
    timeupdate: function (event) {
      $(".progress").slider(
        "value",
        event.jPlayer.status.currentPercentAbsolute
      );
    }
  };

  var myPlaylist = new jPlayerPlaylist(cssSelector, playlist, options);
  var PlayerData = $(cssSelector.jPlayer).data("jPlayer");

  // Create the volume slider control
  $(".volume-level").slider({
    animate: "fast",
    max: 1,
    range: "min",
    step: 0.01,
    value: $.jPlayer.prototype.options.volume,
    slide: function (event, ui) {
      $(cssSelector.jPlayer).jPlayer("option", "muted", false);
      $(cssSelector.jPlayer).jPlayer("option", "volume", ui.value);
    }
  });

  // Create the progress slider control
  $(".progress").slider({
    animate: "fast",
    max: 100,
    range: "min",
    step: 0.1,
    value: 0,
    slide: function (event, ui) {
      var sp = PlayerData.status.seekPercent;
      if (sp > 0) {
        // Move the play-head to the value and factor in the seek percent.
        $(cssSelector.jPlayer).jPlayer("playHead", ui.value * (100 / sp));
      } else {
        // Create a timeout to reset this slider to zero.
        setTimeout(function () {
          $(".progress").slider("value", 0);
        }, 0);
      }
    }
  });
});
