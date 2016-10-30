(function(window, document) {
  'use strict'

  var config = {
    apiKey: '95ca47c06e77fe6310abd2aee3f43d3b',
    secret: 'd553ba0990d6f896',
    apiRoot: 'https://api.flickr.com/services/rest/'
  }

  /**
   *  Given an api root and parameters, return a url for making XHR requests
   **/
  var getUrl = function(root, params) {
    var query = '?'

    for (var key in params) {
      query += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
    }

    query = query.substring(0, query.length - 1)

    return root + query
  }

  /**
   *  Fetch photos given params
   *  info = { photosetId, userId }
   */
  var getPhotos = function(info, callback) {

    // default dummy function
    var noop = function() {}
    callback = callback || noop

    var params = {
      method: 'flickr.photosets.getPhotos',
      api_key: config.apiKey,
      photoset_id: info.photosetId,
      user_id: info.userId,
      format: 'json',
      nojsoncallback: 1
    }

    var url = getUrl(config.apiRoot, params)

    var xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function() {

      if (xhr.readyState == XMLHttpRequest.DONE ) {

        if (xhr.status == 200) {
          var photos = JSON.parse(xhr.response).photoset.photo
          var result = photos.map(transformData, this)
          window.Photos.data = result
          callback(result)

        } else {
          console.log('Status:' + xhr.status)
        }
      }
    }

    xhr.open('GET', url, true);
    xhr.send();
  }

  /**
   *  Transform photo data into the form:
   *  { title, src }
   *  Note: src does not have the file extension '.jpg'
   *  This is intentional because thumbnail urls have '_q.jpg' at
   *  the end but normal sized photos do not.
   */
  var transformData = function(data) {
    var src = 'https://farm' + data.farm + '.staticflickr.com/' + data.server + '/' + data.id + '_' + data.secret
    return {
      title: data.title,
      src: src
    }
  }

  // Add it to the global space
  // window.Photos = Object.assign(window.Photos || {}, {
  //   getPhotos: getPhotos,
  //   data: []
  // })

  window.Photos = {
    getPhotos: getPhotos,
    data: []
  }

})(window, document)
