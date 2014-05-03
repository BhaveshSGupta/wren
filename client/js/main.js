$(document).ready(function(){

  getBuyValue();  // update market ticker
  setInterval(getBuyValue, 60000); // update buy value every minute
  // loadData();
  // loadSidebarOptions();

  // Apply the Chart theme
  Highcharts.setOptions(Highcharts.theme);
});