const addTweet = require('./dbAddTweet')
const checkTweet = require('./dbCheckTweet')

const retweet = require('../api/retweet')
const config = require('../config')

const handleRetweet = (event) => {
  const blacklist = config.twitterConfig.blacklist.split(',')
  // all teh debugs!!
  console.log('====================')
  console.log('BLACKLIST USERS: ', blacklist)
  console.log('EVENT USER NAME: ', event.user.screen_name)
  console.log('INDEX OF NAME IN BLACKLIST: ', blacklist.indexOf(event.user.screen_name))
  console.log('====================')
  if (
    event.lang != config.twitterConfig.language ||
    !event.in_reply_to_status_id ||
    blacklist.indexOf(event.screen_name) > -1
  ) {
    return
  } else {
    // console.log(JSON.stringify(event.lang))
    // console.log(JSON.stringify(event))
    checkTweet(event).then((data) => {
      let count = data.length
      if (!count >= 0) {
        addTweet(event)
        // retweet
        retweet(event)
      }
    })
  }
}

module.exports = handleRetweet
