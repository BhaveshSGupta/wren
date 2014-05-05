'use strict';

var app = app || {}; // namespace for instance
var App = App || {}; // namespace for application classes
App.Views = App.Views || {};

$(document).ready(function () {
  app = new App.Views.AppView();
});
