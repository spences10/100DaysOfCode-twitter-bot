'use strict'

const config = require('../config')
var projectsList = require('../helpers/projects-list')
const uniqueRandom = require('unique-random-array')
const twit = require('twit')

const bot = new twit(config.twitterKeys)

const projectOfTheDay = () => {
  let projectOfDay = uniqueRandom(projectsList.projectOfTheDay)
  let tweet = "Today's #100DaysOfCode #301DaysOfCode #ProjectOfTheDay " + projectOfDay()
  bot.post('statuses/update', { status: tweet }, (err, data, response) => {
    console.log('SUCCESS: Project of the Day: ' + tweet)
  })
}

module.exports = projectOfTheDay
