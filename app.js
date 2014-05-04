var http           = require('http'),
    express        = require('express'),
    path           = require('path'),
    bodyParser     = require('body-parser'),
    Sequelize      = require('sequelize'),
    db             = require('./server/models'),
    routes         = require('./server/routes'),
    tweet          = require('./server/routes/tweet'),
    buyTicker      = require('./server/routes/buyTicker'),
    app            = express();

app.set('port', process.env.PORT || 5000);
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, './client')));
app.use(bodyParser());

// Routes
app.get('/', routes.index);
app.get('/tweets', tweet.getAll);
app.get('/buy-ticker', buyTicker.getTicker);

// Handle 404
app.use(function(req, res) {
  res.send(404, '404: Not Found');
});

// Handle 500
app.use(function(error, req, res, next) {
  console.error(error.stack);
  res.send(500, '500: Internal Server Error', {error: error});
});

db
  .sequelize
  .sync()
  .complete(function(err) {
    if (err) {
      throw err[0];
    } else {
      http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
      });
    }
  });

module.exports = app;

// Using setInterval() for scraping since cronJob cannot schedule by the second
// setInterval(function() {
//   apis.Tweets();      // Twitter API Rate Limit is 180 requests per 15 min
//   // BITCOINS
//   apis.Bitstamp();    // Bitstamp rate limit is 600 per 10 minutes
//   apis.MtGox();       // MtGox API Rate Limit is once per 30s
//   apis.BTCChina();    // No API Rate Limit is listed
//   // LITECOINS
//   apis.BTCe();        // No listed API Rate Limit
// }, 60000);

