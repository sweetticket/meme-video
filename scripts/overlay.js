(function(window, document) {
  'use strict'

  /**
   *  Update the photo given its new index
   */
  var updatePhotoData = function() {

    var index = window.Overlay.index

    var photoData = window.Photos.data[index]

    var $img = document.querySelector('.overlay-img')
    $img.setAttribute('src', photoData.src + '.jpg')
    $img.setAttribute('alt', photoData.title) 

    var $title = document.querySelector('.overlay-title')
    $title.textContent = photoData.title
  }

  /**
   *  Handler for next arrow click. Navigate to the next photo
   */
  var onNextClick = function() {
    if (window.Overlay.index < window.Photos.data.length - 1) {
      window.Overlay.index++
      updatePhotoData()
    }
  }

  /**
   *  Handler for previous arrow click. Navigate to the previous photo
   */
  var onPrevClick = function() {
    if (window.Overlay.index > 0) {
      window.Overlay.index--
      updatePhotoData()
    }
  }

  /**
   *  Handler for keydown. Call onPrevClick if left arrow is pressed.
   *  Call onNextClick if right arrow is pressed.
   */
  var onKeyDown = function(e) {
    var charCode = (typeof e.which == 'number') ? e.which : e.keyCode
    if (charCode == 37) {
      onPrevClick()
    }
    if (charCode == 39) {
      onNextClick()
    }
  }

  /**
   *  Handler for overlay click. Calls hideOverlay.
   */
  var onOverlayClick = function(e) {
    if (e.target == e.currentTarget || e.target.parentNode == e.currentTarget) {
      hideOverlay()
    }
  }

  /**
   *  Initialize the overlay
   */
  var init = function() {
    var $overlay = document.querySelector('.overlay')
    var $prevArrow = document.querySelector('.overlay .prev')
    var $nextArrow = document.querySelector('.overlay .next')
    
    $prevArrow.addEventListener('click', onPrevClick)
    $nextArrow.addEventListener('click', onNextClick)

    $overlay.addEventListener('click', onOverlayClick)
  }

  /**
   *  Show overlay with the photo given its index
   *  in window.Photos.data
   */
  var showOverlay = function(index) {

    window.Overlay.index = index

    updatePhotoData()

    var $overlay = document.querySelector('.overlay')
    $overlay.style.display = 'block'

    document.addEventListener('keydown', onKeyDown)
  }

  /**
   * Hide overlay
   */
  var hideOverlay = function() {
    var $overlay = document.querySelector('.overlay')
    $overlay.style.display = 'none'

    document.removeEventListener('keydown', onKeyDown)
  }

  /**
   *  Add to global space
   */
  window.Overlay = Object.assign(window.Overlay || {}, {
    init: init,
    showOverlay: showOverlay,
    index: 0
  })

})(window, document)
