var container = getFirstElementByClassName('gallery');
var highlight = getFirstElementByClassName('highlight');
var content = getFirstElementByClassName('content');

// Add event listener to picture
container.addEventListener('click', function(e) {
  if (e.target != e.currentTarget) {
    var uri = e.target.getAttribute('hero');
    loadFile(uri + '.html', function successCb(xhr) {
      var el = document.createElement( 'html' );
      el.innerHTML = xhr.responseText;

      // Update hero content
      var heroName = getFirstElementByClassName('highlight', el).innerText;
      var heroContent = getFirstElementByClassName('content', el).innerHTML;
      highlight.innerText = heroName;
      content.innerHTML = heroContent;

      // Update heroes image
      var selectedHeroImg = document.querySelector('[hero="' + uri + '"]');
      var otherHeroesImg = document.querySelectorAll('[hero]:not([hero="' + uri + '"])');
      selectedHeroImg.className = 'current';

      for (var i = 0; i < otherHeroesImg.length; i++) {
        otherHeroesImg[i].className = '';
      }
    }, null);

    e.preventDefault();
  }
  e.stopPropagation();
}, false);

function loadFile(path, successCb, errorCb) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', path);
  xhr.send();

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200 && typeof successCb === 'function') {
        successCb(xhr);
      } else if(xhr.status > 400 && typeof errorCb === 'function') {
        errorCb(xhr);
      }
    }
  };
}

function getFirstElementByClassName(className, el) {
  if (el) {
    return el.getElementsByClassName(className)[0];
  }
  return document.getElementsByClassName(className)[0];
}
