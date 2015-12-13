function calc(){
    var a = document.getElementById('a').value;
    var b = document.getElementById('b').value;
    var sum = parseInt(a) + parseInt(b);
    var c = document.getElementById('c');
    c.innerHTML = 'a + b = ' + sum;
}
