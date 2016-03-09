var pubsub = {};

(function(myObject) {
  var topics = {};
  var subUid = -1;

  // Publish events
  myObject.publish = function(topic, args) {
    if (!topics[topic]) {
      return false;
    }

    var subscribers = topics[topic];
    var len = subscribers.length || 0;

    while (len--) {
      subscribers[len].cb(topic, args);
    }

    return this;
  }

  // Subscribe to an event
  myObject.subscribe = function(topic, cb) {
    if (!topics[topic]) {
      topics[topic] = [];
    }

    var token = ++subUid;
    topics[topic].push({
      token: token.toString(),
      cb: cb
    });
  }

  // Unsubscribe from an event
  myObject.unsubscribe = function(token) {
    for (var m in topics) {
      if (topics.hasOwnProperty(m)) {
        var j = topics[m].length
        for (var i = 0; i < j; i++) {
          topics[m].splice(i, 1);
          return token
        }
      }
    }
    return this;
  };

})(pubsub);

// Using pubsub
var ajaxCall = new XMLHttpRequest();
var ajaxStatus = document.getElementById('ajax-status');
var ajaxResult = document.getElementById('ajax-result');
var subscriptionStatus = document.getElementById('subscription-status');
var jsonPlaceholder;

// Subscribe to ajax call
function subscribeCallback(topic, data) {
  ajaxResult.innerText = data;
}

function subscribeToAjaxCall() {
  jsonPlaceholder = pubsub.subscribe('ajax-call-success', subscribeCallback);
  subscriptionStatus.innerText = 'Subscribe status: Yes';
}

// Unsubscribe from ajax call
function subscribeFromAjaxCall() {
  pubsub.unsubscribe(jsonPlaceholder);
  subscriptionStatus.innerText = 'Subscribe status: No';
}

// Publish a successful ajax call
function doAjaxCall() {
  ajaxCall.onreadystatechange = function() {
    if (ajaxCall.readyState === 4 && ajaxCall.status === 200) {
      ajaxStatus.innerText = 'Ajax status: Resolved';
      pubsub.publish('ajax-call-success', ajaxCall.response);
    }
  };
  ajaxCall.open('GET', 'http://jsonplaceholder.typicode.com/posts/1', true);
  ajaxCall.send();
  ajaxStatus.innerText = 'Ajax status: Waiting for response';
}
