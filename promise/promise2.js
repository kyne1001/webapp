var promise = new Promise( function (resolve, reject) {
  console.log(reject());
  var client = new XMLHttpRequest();
  client.open('GET', 'http://jsonplaceholder.typicode.com/posts');
  client.send();

  client.onload = function () {
    if (this.status >= 200 && this.status < 300) {
      // Performs the function "resolve" when this.status is equal to 2xx
      resolve(this.response);
    } else {
      // Performs the function "reject" when this.status is different than 2xx
      reject(this.statusText);
    }
  };
  client.onerror = function () {
    reject(this.statusText);
  };
  console.log('Last line');
});

var callback = {
  success : function(data){
    console.log('OK');
  },
  error : function(data){
    console.log('Error');
  }
};

promise.then(callback.success, callback.error);
