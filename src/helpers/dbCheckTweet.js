const { request } = require('graphql-request')
const config = require('../config')

const endpoint = config.graphqlConfig.endpoint

// use varibles to avoid breaking text being added
// https://github.com/graphcool/graphql-request#using-variables
const checkTweet = (event) => {
  const query = `query ($tweetText: String!) {
    allTweets(filter: {tweetText: $tweetText}) {
      id
    }
  }`

  const variables = {
    tweetText: event.text
  }

  return request(endpoint, query, variables)
    .then((data) => {
      // console.log('returning data: ', data.allTweets.length)
      console.log(data.allTweets)
      return data.allTweets
    })
    .catch((err) => console.log('Error: ', err, 'Tweet Text: ', event.text, 'Mutation: ', mutation))
}

module.exports = checkTweet
