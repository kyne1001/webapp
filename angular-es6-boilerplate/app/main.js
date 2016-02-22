'use strict';

import angular from 'angular';
import WelcomeCtrl from './shared/welcome';

angular.module('myApp', [])
.controller('WelcomeCtrl', ['$scope', WelcomeCtrl]);
