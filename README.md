Description:

WREN is a tool to compare Twitter sentiment against buy prices from the top three largest BitCoin exchanges.
Can you spot a trend?

URL: http://default-environment-qnmrx6f75m.elasticbeanstalk.com/

![Alt text](/screenshots/screenshot.png "MtGox performance over past 7 days vs Twitter Sentiment")
![Alt text](/screenshots/tweets.png "Twitter Sentiment")

Challenges:
  -- Getting old Twitter data
  -- Database slowdown due to a lack of indexes
  -- HighStocks flexibility
  -- UTC Timestamps
  -- Sentiment Analysis

Tech Stack:
  Server   -- Node.js (Amazon Elastic Beanstalk), Sentimental, Moment.js
  Database -- MySQL (Amazon RDS)
  Client   -- jQuery, Moment.js

Map of Code-base: