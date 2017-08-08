'use strict'

const sentiment = require('../helpers/sentiment')
const config = require('../config')
const twit = require('twit')
const bot = new twit(config.twitterKeys)
const dbAddSentiment = require('../helpers/dbAddSentiment')

const sentimentBot = (event) => {
  console.log('====================')
  console.log('HERE', event.text)
  console.log('====================')
  // hashtagStream2.on('tweet', (event) => {
  console.log(`Sentiment Bot Running`)

  //  Setup the http call
  const httpCall = sentiment.init()
  let sentim

  httpCall.send('txt=' + event.text).end((result) => {
    sentim = result.body.result.sentiment
    let confidence = parseFloat(result.body.result.confidence)
    console.log('====================')
    console.log('SENTIMENT: ', sentim)
    console.log('CONFIDENCE: ', confidence)
    console.log('====================')
    // if sentiment is Negative and the confidence is above 75%
    if (sentim == 'Negative' && confidence >= 75) {
      console.log('====================')
      console.log('SENTIMENT', sentim)
      console.log('====================')
      // get a random quote
      let phrase = sentiment.randomQuote()
      let screen_name = event.user.screen_name
      // Check key isn't in db already, key being the screen_name
      // dbAddSentiment(event)
      // db.get(screen_name, (err, value) => {

      // if (typeof value !== 'undefined') {
      //   console.log('ALREADY IN DB USER ', screen_name)
      // } else {
      // Put a user name and that they have been encouraged

      // some kind of I/O error
      // if (err) return console.log('Ooops!', err)

      // console.log('LOGGED USER: ', screen_name)

      // tweet a random encouragement phrase
      // tweetNow('@' + screen_name + ' ' + phrase)
      // })
      // }
      // })
    }
  })
  return sentim
  // })
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
