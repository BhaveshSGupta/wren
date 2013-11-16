WREN - An Overview of Bitcoin Exchange Performance vs Twitter Sentiment
==============

**Description:**
--------------

WREN is a tool to compare Twitter sentiment against buy prices from the top three largest BitCoin exchanges.
Can you spot a trend?

URL: http://default-environment-qnmrx6f75m.elasticbeanstalk.com/

![Alt text](/screenshots/screenshot.png "MtGox performance over past 7 days vs Twitter Sentiment")
![Alt text](/screenshots/tweets.png "Twitter Sentiment")

**Challenges:**
--------------
  - HighStocks flexibility
  - Database slowdown due to a lack of indexes
  - UTC Timestamps (early timestamp inconsistencies due to a previous lack of UTC timestamps)
  - Sentiment Analysis (started with Stanford's Deeply Moving but was too CPU intensive -- 15 secs for 10 tweets)
  - Retrieving past Twitter data (I have no Twitter data before early November)

**Tech Stack:**
--------------
  - Server   -- Node.js (Amazon Elastic Beanstalk), Sentimental, Moment.js
  - Database -- MySQL (Amazon RDS)
  - Client   -- jQuery, Moment.js