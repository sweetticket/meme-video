(function(window, document) {
  'use strict'

  /**
   * Get the closest ancestor of the given element that has the class
   * 'thumbnail'. If the element has class 'thumbnail', return the element.
   */
  var getParentThumbnail = function($elem) {
    if ($elem.classList.contains('thumbnail')) {
      return $elem;
    }

    while ($elem.parentNode && !$elem.parentNode.classList.contains('thumbnail')) {
      $elem = $elem.parentNode
    }

    return $elem.parentNode;
  }

  /**
   *  Return a thumbnail node with the given src
   *  Src does not have the file extension.
   */
  var createThumbnail = function(data, index) {
    var $thumbnail = document.createElement('div')
    $thumbnail.classList.add('thumbnail')
    $thumbnail.setAttribute('data-index', index)

    var $thumbnailOverlay = document.createElement('div')
    $thumbnailOverlay.classList.add('thumbnail-overlay')

    var $thumbnailContent = document.createElement('div')
    $thumbnailContent.textContent = data.title;
    $thumbnailContent.classList.add('thumbnail-overlay-content')

    $thumbnailOverlay.appendChild($thumbnailContent)
    $thumbnail.appendChild($thumbnailOverlay)

    var $img = document.createElement('img')
    $img.setAttribute('src', data.src + '_q.jpg')
    $img.setAttribute('alt', data.title) 

    $thumbnail.appendChild($img)
    
    return $thumbnail
  }

  /**
   *  Add a thumbnails to the parent node
   */
  var addThumbnails = function(data, $parent, onClick) {

    // default dummy function
    var noop = function() {}
    onClick = onClick || noop

    for (var i = 0, length = data.length; i < length; i++) {
      var $thumbnail = createThumbnail(data[i], i)
      $parent.appendChild($thumbnail)
    }

    // Add click listener
    $parent.addEventListener('click', function(e) {

      var $thumbNode = getParentThumbnail(e.target)

      if ($thumbNode) {
        var thumbIndex = $thumbNode.getAttribute('data-index')
        onClick(thumbIndex)
      }

    })

  }

  /**
   *  Add to global space
   */
  window.Thumbnail = Object.assign(window.Thumbnail || {}, {
    addThumbnails: addThumbnails
  })

})(window, document)
