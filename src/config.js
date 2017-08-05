/*
 * TWITTER APP CONFIGURATION
 * consumer_key
 * consumer_secret
 * access_token
 * access_token_secret
 */
require('dotenv').config()

module.exports = {
  twitterKeys: {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  },
  twitterConfig: {
    queryString: process.env.QUERY_STRING,
    resultType: process.env.RESULT_TYPE,
    language: process.env.LANGUAGE,
    username: process.env.TWITTER_USERNAME,
    retweet: process.env.TWITTER_RETWEET_RATE * 1000 * 60,
    favorite: process.env.TWITTER_FAVORITE_RATE * 1000 * 60,
    follow: process.env.TWITTER_FOLLOW_RATE * 1000 * 60,
    searchCount: process.env.TWITTER_SEARCH_COUNT,
    randomReply: process.env.RANDOM_REPLY,
    randomEmoji: process.env.RANDOM_EMOJI,
    blacklist: process.env.TWITTER_USERNAME_BLACKLIST
  },
  graphqlConfig: {
    endpoint: process.env.ENDPOINT,
    project: process.env.ACCESS_TOKEN
  },
  sentimentKey: process.env.SENTIMENT_KEY
}
