'use strict';

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
  $scope.additionProblems = shuffle(createAdditionArray());
  $scope.subtractionProblems = shuffle(createSubtractionArray()).slice(0, 40);
});

function createAdditionArray() {
  var addition = [];
  for (var i = 1; i < 9; i++) {
    for (var j = 1; i + j < 10; j++) {
      for (var k = 1; i + j + k < 11; k++) {
        addition.push({a: i, b: j, c: k, result: i + j + k});
      }
    }
  }

  return addition;
}

function createSubtractionArray() {
  var subtraction = [];
  for (var i = 2; i < 11; i++) {
    for (var j = 1; j < i; j++) {
      for (var k = 1; j + k < i; k++) {
        subtraction.push({a: i, b: j, c: k, result: i - j - k});
      }
    }
  }

  return subtraction;
}

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
