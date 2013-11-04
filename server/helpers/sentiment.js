var mysql = require('mysql');
var fs = require("fs");
var sys = require('sys');
var analyze = require('sentimental').analyze;
var exec = require('child_process').exec;

// establish database connection
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'little_bird',
  database : 'little_bird',
  charset  : 'utf-8',
  multipleStatements: true
});

exports.recalcSentiment = function () {
  connection.query("SELECT * FROM tweets",
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        return;
      }
      var closureFunc = function (i) {
        var scrubbedText = rows[i].text.replace(/(\bhtt)\S+\b/g, '');  // strip out sites for analysis (they return neutral)
        var tweet_sentiment = analyze(scrubbedText).score;
        connection.query("UPDATE tweets SET sentiment=? WHERE id=?",
          [tweet_sentiment, rows[i].id],
          function (err, rows, fields) {
            if (err) {
              console.log(err);
              return;
            }
          });
      };
      for (var i = 0; i < rows.length; i++) {
        closureFunc(i);
      }
      console.log('DONE CALCULATING SENTIMENT FOR ALL TWEETS!!!');
    });
};

/*********************************************
 * EXPLANATION TO FUTURE SELF & OTHERS....
 *
 * DEEPLY MOVING SENTIMENT ANALYSIS:::::::::::
 * Using Stanford's Deeply Moving library 
 * which has almost no documentation at the
 * time of this writing. 
 * Steps:
 *   1)  Query all tweets with no sentiment
 *   2)   Save each tweet message to a file
 *       (remove http:// link because
 *        biases sentiment towards neutral)
 *   3) Perform sentiment analysis in 
 *        batches of 10. Scraping sentiment
 *        from the console output
 *        which is called asynchronously.
 *        Chunking in groups of 10, with
 *        a 15 second setTimeout to give my 
 *        computer enough time to process
 *        the sentiment, otherwise it
 *        attemps to process all the files at
 *        once and crashes my computer.
 *   4)  Update sentiment in the DB &
 *        delete file. 
 ********************************************/

function getSentiment(error, stdout, stderr) {
  var output = stderr.split('\n');
  var sentimentArray = [];
  for (var i = 0; i < output.length; i++) {
    switch (output[i]) {
    case "  Predicted sentiment: Very positive":
      sentimentArray.push(4);
      break;
    case "  Predicted sentiment: Positive":
      sentimentArray.push(3);
      break;
    case "  Predicted sentiment: Neutral":
      sentimentArray.push(2);
      break;
    case "  Predicted sentiment: Negative":
      sentimentArray.push(1);
      break;
    case "  Predicted sentiment: Very negative":
      sentimentArray.push(0);
      break;
    default:
      break;
    }
  }

  var totSentiment = 0;
  for (i = 0; i < sentimentArray.length; i++) {
    totSentiment += sentimentArray[i];
  }
  return Math.round(totSentiment / sentimentArray.length);
}

var runDeeplyMoving = function (filepath, callback) {
  exec('java -cp "deeply_moving/*" -mx5g edu.stanford.nlp.sentiment.SentimentPipeline -file ' + filepath, callback);
};

exports.calcSentiment = function (tweet_id, text) {
  var sentiment = 0;
  var scrubbedText = text.replace(/(\bhtt)\S+\b/g, '');  // strip out sites for analysis (they return neutral)
  var filepath = "db/data/sentiment/" + tweet_id + ".snt";
  fs.writeFileSync(filepath, scrubbedText + '\n');
  runDeeplyMoving(filepath, function (err, stdout, stderr) {
    sentiment = getSentiment(err, stdout, stderr);
    // delete the file
    fs.unlink(filepath, function (err) {
      if (err) {
        console.log(err);
        return;
      }
    });
  });

  return sentiment;
};

exports.storeSentiment = function (tweet_id) {
  connection.query("SELECT * FROM tweets WHERE sentiment IS NULL",
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        return;
      }
      var closureFunc = function (i, filepath) {
        var text = rows[i].text.replace(/(\bhtt)\S+\b/g, '');  // strip out sites for analysis (they return neutral)
        fs.writeFileSync(filepath, text + '\n');
        runDeeplyMoving(filepath, function (err, stdout, stderr) {
          var sentiment = getSentiment(err, stdout, stderr);
          // insert sentiment into tweets_copy
          connection.query("UPDATE tweets SET sentiment=? WHERE id=?",
            [sentiment, rows[i].id],
            function (err, rows, fields) {
              if (err) {
                console.log(err);
                return;
              }
            });
          // delete the file
          fs.unlink(filepath, function (err) {
            if (err) {
              console.log(err);
              return;
            }
          });
        });
      };

      var processChunk = function (i) {
        var end = Math.min(i + 10, rows.length);
        for (;i < end; i++) {
          var filepath = "db/data/sentiment/" + rows[i].tweet_id + ".snt";
          closureFunc(i, filepath);
        }
        i++;
        if(end != rows.length) {
          setTimeout(function(){
            processChunk.call(this, i);
          }, 15000); // delay so have time to process asynchronous calls. Total bullshit hack.
        }
      };

      processChunk(0);

    }
  );
};