console.log('File name: ', __filename);
console.log('Dir name: ', __dirname);

console.log('Wait for me to be ready... ');
setTimeout(function () {
  console.log('I\'m ready !!! Now do the interval');
  interval();
}, 1000)

var interval = function () {
   var i = 0;
   var t = setInterval(function () {
      console.log(i);
      i++;
      if (i === 6) {
        console.log('Stop counting');
        clearInterval(t);
      }
   }, 1000); 
}
