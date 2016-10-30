(function(window, document) {
  'use strict'

  var config = {
    apiKey: '95ca47c06e77fe6310abd2aee3f43d3b',
    secret: 'd553ba0990d6f896',
    apiRoot: 'https://api.flickr.com/services/rest/'
  }

  /**
   *  Given a youtube video url, return the video id
   **/
  var getYTVideoId = function(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
  }

  /**
   *  Update video url
   */
  var handleUrlKeyUp = function(event) {
    var videoId = getYTVideoId(event.currentTarget.value.trim())
    window.YTPlayer.updateVideo(videoId)
  }

  /**
   *  Update caption
   */
  var handleCaptionKeyUp = function(event) {
    var captionId = event.currentTarget.getAttribute('caption-id')
    var text = event.currentTarget.value.trim()
    var $topText = document.getElementById(captionId)
    $topText.textContent = text
  }

  document.getElementById("top").addEventListener('keyup', handleCaptionKeyUp)
  document.getElementById("bottom").addEventListener('keyup', handleCaptionKeyUp)
  document.getElementById("url").addEventListener('keyup', handleUrlKeyUp)

  window.Editor = {
  }

})(window, document)
