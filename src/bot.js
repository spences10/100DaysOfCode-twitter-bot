'use strict' // c9 use

console.log('Welcome #100DaysOfCode Twitter Bot')

// listen on port so now.sh likes it
const { createServer } = require('http')

// Dependencies
const schedule = require('node-schedule')
const twit = require('twit')
const config = require('./config')
const bot = new twit(config.twitterKeys)

// Import API functions
const retweet = require('./api/retweet')
const favorite = require('./api/favorite')
const reply = require('./api/reply')
const projectOfTheDay = require('./api/project-of-day')
const handleSentiment = require('./helpers/dbHandleSentiment')

// Frequency in minutes
const retweetFrequency = config.twitterConfig.retweet
const favoriteFrequency = config.twitterConfig.favorite

const firstOrLastDayFrequency = 40

// // Retweet
// setInterval(retweet, retweetFrequency)

// // Favorite
// setInterval(favorite, favoriteFrequency)

// Reply
const userStream = bot.stream('user')
userStream.on('follow', reply)

// get .env query string
const param = config.twitterConfig
const trackWords = param.queryString.split(',')

// use stream to track keywords
const trackStream = bot.stream('statuses/filter', {
  track: trackWords
})
trackStream.on('tweet', handleSentiment)

// Use cron-job to schedule Project of the day
const rule = new schedule.RecurrenceRule()
rule.dayOfWeek = [ 0, new schedule.Range(1, 6) ]
rule.hour = 11
rule.minute = 59

var job = schedule.scheduleJob(rule, () => {
  console.log('Cron Job runs successfully')
  projectOfTheDay()
})

// This will cause the bot/server to run on now.sh
const server = createServer((req, res) => {
  res.writeHead(302, {
    Location: `https://twitter.com/${config.twitterConfig.username}`
  })
  res.end()
})

server.listen(3000)

// ABANDONED API(s)

// Congratulation Messages for Day 1 & Day 100 ========
// const hashtagStream = T.stream('statuses/filter', {
//   track: ['#100DaysOfCode']
// })
//
// // Function that checks if day 1 or day 100
// var checkIfFirstOrLastDay = function() {
//   hashtagStream.on('tweet', (tweet) => {
//     if (checkIfLastDay(tweet)) {
//       console.log(`Sending a congrats to @${tweet.user.screen_name}`)
//       tweetNow(`WOOT! You did it @${tweet.user.screen_name}! Party Time!`)
//     }
//     else if (checkIfFirstDay(tweet)) {
//       console.log('Sending a congrats to @${tweet.user.screen_name}')
//       tweetNow(`Congrats on your first day @${tweet.user.screen_name}! Keep it up!`)
//     }
//   })
// }
// checkIfFirstOrLastDay()
// setImmediate(checkIfFirstOrLastDay, 1000 * 60 * firstOrLastDayFrequency)
//
// // NOTE: String elements in firstDay & lastDay are case insensitive
//
// function checkIfFirstDay(tweet) {
//   const firstDay = ['first day', 'day one', 'day 1/100']
//   const firstdayRegex = /\bday\s?0?1\b/i
//   console.log(`Checking if first day`)
//   for (let i = 0; i < firstDay.length; i++) {
//     if (checkTweetForText(tweet.text, firstDay[i]) || tweet.text.match(firstdayRegex) != null) {
//       return true
//     }
//   }
// }
//
// function checkIfLastDay(tweet) {
//   const lastDay = ['#day100', 'final day', 'day 100', 'one hundred', '100/100']
//   const lastdayRegex = /\bday\s?100\b/i
//   console.log(`Checking if Last day`)
//   for (let i = 0; i < lastDay.length; i++) {
//     if (checkTweetForText(tweet.text, lastDay[i]) || tweet.text.match(lastdayRegex) != null) {
//       return true
//     }
//   }
// }
//
// function checkTweetForText(tweetText, value) {
//   return tweetText.toLowerCase().indexOf(value) > -1 && tweetText.toLowerCase().indexOf('100daysofcode') > -1
// }
