'use strict';

angular.module('experticingApp.auth', [
  'experticingApp.constants',
  'experticingApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
