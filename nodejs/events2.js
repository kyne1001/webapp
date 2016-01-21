var events = require('events');

var eventEmitter = new events.EventEmitter();

eventEmitter.addListener("gogogo", listener1);
eventEmitter.on("gogogo", listener2);
eventEmitter.addListener("gogogo", listener1);
eventEmitter.once("gogogo", listenerOnce);

eventEmitter.emit('gogogo');
eventEmitter.emit('gogogo');

function listener1() {
  console.log(1);
}

function listener2() {
  console.log(2);
}

function listenerOnce() {
  console.log("Once");
}
