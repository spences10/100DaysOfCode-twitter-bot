'use strict'

const sentiment = require('../helpers/sentiment')
const config = require('../config')
const twit = require('twit')
const bot = new twit(config.twitterKeys)
const dbAddSentiment = require('../helpers/dbAddSentiment')

const hashtagStream2 = bot.stream('statuses/filter', {
  track: config.twitterConfig.queryString
})

const sentimentBot = () => {
  hashtagStream2.on('tweet', (tweet) => {
    console.log(`Sentiment Bot Running`)

    //  Setup the http call
    const httpCall = sentiment.init()

    // Don't do anything if bot is in blacklist
    // TODO add to handle tweet function
    const blacklist = config.twitterConfig.blacklist.split(',')
    if (blacklist.indexOf(tweet.user.screen_name) > -1) {
      console.log('====================')
      console.log('USER IN BLACKLIST: ', tweet.user.screen_name)
      console.log('====================')
      return
    }

    httpCall.send('txt=' + tweet.text).end((result) => {
      let sentim = result.body.result.sentiment
      let confidence = parseFloat(result.body.result.confidence)
      // if sentiment is Negative and the confidence is above 75%
      if (sentim == 'Negative' && confidence >= 75) {
        console.log('====================')
        console.log('SENTIMENT', sentim)
        console.log('====================')
        // get a random quote
        let phrase = sentiment.randomQuote()
        let screen_name = tweet.user.screen_name

        // Check key isn't in db already, key being the screen_name
        dbAddSentiment(tweet)
        // db.get(screen_name, (err, value) => {

        // if (typeof value !== 'undefined') {
        //   console.log('ALREADY IN DB USER ', screen_name)
        // } else {
        // Put a user name and that they have been encouraged

        // some kind of I/O error
        // if (err) return console.log('Ooops!', err)

        // console.log('LOGGED USER: ', screen_name)

        // tweet a random encouragement phrase
        tweetNow('@' + screen_name + ' ' + phrase)
        // })
        // }
        // })
      }
    })
  })
}

function tweetNow(text) {
  let tweet = { status: text }

  bot.post('statuses/update', tweet, (err, data, response) => {
    if (err) {
      console.log('ERROR: ', err)
    }
    console.log('SUCCESS: Replied to Follower')
  })

  // // use the in_reply_to_status_id param for this

  // bot.post(
  //   'statuses/update',
  //   {
  //     status: '@ScottDevTweets I reply to you yes!',
  //     in_reply_to_status_id: '860900406381211649'
  //   },
  //   (err, data, response) => {
  //     if (err) {
  //       console.log(err)
  //     } else {
  //       console.log(`${data.text} tweeted!`)
  //     }
  //   }
  // )
}

module.exports = sentimentBot
