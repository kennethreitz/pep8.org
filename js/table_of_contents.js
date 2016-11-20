window.addEventListener("DOMContentLoaded", function(event) {
  // get headers from page
  var content = document.querySelector('.nine.columns');
  var headers = [];
  var children = content.children;
  for (var i = 0, child; i < children.length; i++) {
    child = children[i];
    if (~['H1', 'H2', 'H3'].indexOf(child.nodeName)) headers.push(child);
  }

  // create table of contents
  var toc = document.createElement('nav');
  toc.className = 'toc';
  toc.innerHTML = '<h3 class=toc-header>Table of Contents</h3>';
  var links = {};
  for(var i = 0, header, a; i < headers.length; i++) {
    header = headers[i];
    a = document.createElement('a');
    a.className = 'toc-link ' + header.nodeName.toLowerCase();
    a.href ='#' + header.id;
    a.textContent = header.textContent;
    links[a.hash] = a;
    toc.appendChild(a);
  }
  var top = content.offsetTop;
  toc.style.top = top + 'px';
  content.parentNode.insertBefore(toc, content);

  // make toc sticky
  var sticky = false;
  var y = toc.getBoundingClientRect().top + pageYOffset;
  function stickOnscroll() {
    if (!sticky && pageYOffset > y) {
      toc.style.position = 'fixed';
      toc.style.top = 0;
      sticky = true;
    } else if (sticky && pageYOffset <= y) {
      toc.style.position = 'absolute';
      toc.style.top = top + 'px';
      sticky = false;
    }
  }
  stickOnscroll();
  window.addEventListener('scroll', stickOnscroll);

  // highlight current link
  var previous = null, current = null;
  function highlight(hash) {
    current = links[hash];
    if (previous == current) return;
    previous && previous.classList.remove('current');
    current && current.classList.add('current');
    previous = current;
  }
  highlight(location.hash);
  current && current.scrollIntoView();
  window.addEventListener('hashchange', function() {
    highlight(location.hash);
  });

  // determine sections by pixels because markup is not semantic
  var positions = headers.map(function(h) {
    return {hash: '#' + h.id, y: h.getBoundingClientRect().top + pageYOffset};
  });
  function highlightOnScroll() {
    for (var i = positions.length - 1; i >= 0; i--)
      if (positions[i].y <= pageYOffset + 30) {
        highlight(positions[i].hash);
        break;
      }
  }
  window.addEventListener('scroll', highlightOnScroll);

  var highlightOnResize = debounce(function() {
    positions = headers.map(function(h) {
      return {hash: '#' + h.id, y: h.getBoundingClientRect().top + pageYOffset};
    });
    highlightOnScroll();
    current && current.scrollIntoView();
  }, 300);
  window.addEventListener('resize', highlightOnResize);
});

function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}