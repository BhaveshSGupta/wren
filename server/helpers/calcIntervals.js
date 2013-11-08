var mysql = require('mysql');

// establish database connection
var connection = mysql.createConnection({
  host     : 'littlebird.c0eactkzzr6c.us-west-2.rds.amazonaws.com',
  port     : '3306',
  user     : process.env.AMAZON_RDS_USER,
  password : process.env.AMAZON_RDS_PWD,
  database : 'wren',
  // host        : 'localhost',
  // user        : 'root',
  // database    : 'little_bird',
  charset  : 'utf-8',
  multipleStatements: true
});

exports.calcIntervals = function (startPoint, interval) {
  connection.query("SELECT AVG(value) FROM marketmovement WHERE (site=1 AND timestamp BETWEEN ? AND ?)", [startPoint, startPoint + interval], 
    function(err, rows, fields) {
      // Insert data into Intervals table
      
      

    }
  );
};
