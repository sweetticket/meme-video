(function(window, document) {
  'use strict'

  // This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script')

  tag.src = "https://www.youtube.com/iframe_api"
  var firstScriptTag = document.getElementsByTagName('script')[0]
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

  var createPlayer = function() {
    var player = new YT.Player('ytplayer', {
      height: '400',
      width: '400',
      videoId: "rbyVJlSu1XI",
      playerVars: {
        'controls': 0,
        'showinfo': 0,
        'autoplay': 1,
        'rel': 0,
        'loop': 1,
        'start': window.YTPlayer.starttime
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    })
    window.YTPlayer.player = player
  }

  // The API will call this function when the video player is ready.
  var onPlayerReady = function(event) {
    event.target.playVideo()
    event.target.mute()
    event.target.seekTo(window.YTPlayer.starttime)
  }

  // The API calls this function when the player's state changes.
  // The function indicates that when playing a video (state=1),
  // the player should play for six seconds and then stop.
  var onPlayerStateChange = function(event) {
    if (event.data == YT.PlayerState.PLAYING && !window.YTPlayer.done) {
      setTimeout(replayVideo, window.YTPlayer.duration)
      window.YTPlayer.done = true
    }
  }

  var replayVideo = function() {
    window.YTPlayer.done = false
    if (window.YTPlayer.player) {
      window.YTPlayer.player.seekTo(window.YTPlayer.starttime)
    }
  }

  // update video with new video id
  var updateVideo = function(videoId) {
    window.YTPlayer.player.loadVideoById(videoId)
  }

  window.YTPlayer = {
    createPlayer: createPlayer,
    starttime: 10,
    duration: 6000,
    player: null,
    done: false,
    updateVideo: updateVideo
  }

})(window, document)

// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
var onYouTubeIframeAPIReady = window.YTPlayer.createPlayer
