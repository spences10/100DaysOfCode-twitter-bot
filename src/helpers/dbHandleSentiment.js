const dbAddSentiment = require('./dbAddSentiment')
const checkTweet = require('./dbCheckTweet')
const sentiment = require('../api/sentiment')

const config = require('../config')

const handleSentiment = (event) => {
  const blacklist = config.twitterConfig.blacklist.split(',')
  // all teh debugs!!
  console.log('====================')
  console.log('BLACKLIST USERS: ', blacklist)
  console.log('EVENT USER NAME: ', event.user.screen_name)
  console.log('INDEX OF NAME IN BLACKLIST: ', blacklist.indexOf(event.user.screen_name))
  console.log('====================')
  console.log('====================')
  console.log('First check: ', event.lang.toString().trim() === config.twitterConfig.language.toString().trim())
  console.log('First check: event lang=', event.lang.toString().trim())
  console.log('First check: config lang=', config.twitterConfig.language.toString().trim())
  console.log('Second check: ', !event.in_reply_to_status_id)
  console.log('Third check: ', blacklist.indexOf(event.screen_name) < 0)
  console.log('====================')
  if (
    event.lang.toString().trim() === config.twitterConfig.language.toString().trim() ||
    !event.in_reply_to_status_id ||
    blacklist.indexOf(event.screen_name) < 0
  ) {
    // do the thing
    sentiment(event)
  } else {
    console.log('====================')
    console.log('HERE return')
    console.log('====================')
    return
    // console.log(JSON.stringify(event.lang))
    // console.log(JSON.stringify(event))
    // dbAddSentiment()
    // checkTweet(event).then((data) => {
    //   let count = data.length
    //   if (!count >= 0) {
    //     addTweet(event)
    //     // retweet
    //     retweet(event)
    //   }
    // })
  }
}

module.exports = handleSentiment
