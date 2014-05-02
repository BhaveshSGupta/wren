var mysql = require('mysql');

// establish database connection
exports.connection = mysql.createConnection({
  host     : process.env.AMAZON_RDS_HOST,
  port     : process.env.AMAZON_RDS_PORT,
  user     : process.env.AMAZON_RDS_USER,
  password : process.env.AMAZON_RDS_PWD,
  database : process.env.AMAZON_RDS_DBNAME,
  charset  : 'utf-8',
  multipleStatements: true
});