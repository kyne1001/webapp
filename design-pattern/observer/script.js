// Observer list
function ObserverList() {
  this.observerList = [];
}

ObserverList.prototype.add = function(obj) {
  this.observerList.push(obj);
};

ObserverList.prototype.count = function() {
  return this.observerList.length;
};

ObserverList.prototype.get = function(index) {
  return this.observerList[index];
};

ObserverList.prototype.indexOf = function(obj, startIndex) {
  for (var i = startIndex; i < this.observerList.length; i++) {
    if (this.observerList[i] === obj) {
      return i;
    }
  }

  return -1;
};

ObserverList.prototype.removeAt = function(index) {
  this.observerList.splice(index, 1);
};

// Subject
function Subject() {
  this.observers = new ObserverList();
}

Subject.prototype.addObserver = function(observer) {
  this.observers.add(observer);
};

Subject.prototype.removeObserver = function(observer) {
  this.observers.removeAt(this.observers.index(observer, 0));
};

Subject.prototype.notify = function(context) {
  var observerCount = this.observers.count();
  for (var i = 0; i < observerCount; i++) {
    this.observers.get(i).update(context);
  }
};

// Observer
function Observer() {
  this.update = function() {}
}

function extend(obj, extension) {
  for (var key in extension) {
    obj[key] = extension[key];
  }
}

/* End of design pattern, start using */

var inputSubject = document.getElementById('input-subject');
var btnAddObserver = document.getElementById('add-text');
var textObserverContainer = document.getElementById('text-observer-container');
var labelObserverContainer = document.getElementById('label-observer-container');

// Extend the subject with subject class
extend(inputSubject, new Subject());
inputSubject.addEventListener('input', function() {
  this.notify(inputSubject.value);
}, false)

function addText() {
  var input = document.createElement('input');
  input.type = 'text';

  // Extend the observer with observer class
  extend(input, new Observer());

  // Override with custom update behaviour
  input.update = function(value) {
    this.value = value;
  };

  inputSubject.addObserver(input);
  textObserverContainer.appendChild(input);
}

function addPara() {
  var p = document.createElement('p');

  // Extend the observer with observer class
  extend(p, new Observer());

  // Override with custom update behaviour
  p.update = function(value) {
    this.innerText = value;
  };

  inputSubject.addObserver(p);
  labelObserverContainer.appendChild(p);
}
