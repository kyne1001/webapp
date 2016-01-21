var fs = require("fs");
var data = fs.readFileSync("tut.txt");
console.log(data.toString());
console.log("Program ends");
