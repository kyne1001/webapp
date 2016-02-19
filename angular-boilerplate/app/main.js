'use strict';

var angular = require('angular');
var WelcomeCtrl = require('./shared/welcome');
var app = angular.module('myApp', []);

app.controller('WelcomeCtrl', ['$scope', WelcomeCtrl]);
