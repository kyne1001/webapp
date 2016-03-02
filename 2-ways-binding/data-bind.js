'use strict';

var modelWatcher = function() {
  if (!dataBind.dirtyValues.length) {
    return;
  }

  while (dataBind.dirtyValues.length) {
    var name = dataBind.dirtyValues[0];
    var els = document.querySelectorAll('[data-bind="' + name + '"]');
    for (var i = 0; i < els.length; i++) {
      if (els[i].tagName === 'INPUT') {
        // TODO
      } else {
        els[i].innerText = dataBind.bindObj[name] || "";
      }

    }

    dataBind.dirtyValues.shift();
  }

};

var viewWatcher = function(els) {
  for (var i = 0; i < els.length; i++) {
    var el = els[i];
    el.addEventListener('input', function() {
      var bindKey = el.getAttribute('data-bind');
      dataBind.dirtyValues.push(bindKey);
      dataBind.bindObj[bindKey] = el.value;
    }, false);

    // First run to set data
    dataBind.dirtyValues.push(el.getAttribute('data-bind'));
  }
};

// Execute
(function() {
  window.dataBind = {
    dirtyValues: [],
    bindObj: {}
  };
  // DOM tasks
  var bindingEls = document.querySelectorAll('[data-bind]');
  viewWatcher(bindingEls);
  setInterval(modelWatcher, 50);
})();
