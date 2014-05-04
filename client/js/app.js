'use strict';

var app = app || {}; // namespace for instance
var App = App || {}; // namespace for application classes
App.Views = App.Views || {};

$(document).ready(function () {
  app = new App.Views.AppView();

  // getBuyValue();  // update market ticker
  // setInterval(getBuyValue, 60000); // update buy value every minute
  // loadData();
  // loadSidebarOptions();

  // Apply the Chart theme
  // Highcharts.setOptions(Highcharts.theme);
});
