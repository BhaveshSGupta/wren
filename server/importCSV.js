var csv = require("csv");

// import data from mtGox CSV
exports.importCSV = function(filepath) {
  csv()
  .from.path(path.resolve(__dirname,filepath), { delimiter: ',', escape: '"' })
  .transform( function(row){
    row.unshift(row.pop());
    return row;
  })
  .on('record', function(row,index){
    var volume = row[0];
    var timestamp = row[1];
    var value = row[2];
    console.log('row: ', timestamp, volume, value);
  })
  .on('close', function(count){
    // when writing to a file, use the 'close' event
    // the 'end' event may fire before the file has been written
    console.log('Number of lines: '+count);
  })
  .on('error', function(error){
    console.log(error.message);
  });
};