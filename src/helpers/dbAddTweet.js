const { request } = require('graphql-request')
const config = require('../config')

const endpoint = config.graphqlConfig.endpoint

// use varibles to avoid breaking text being added
// https://github.com/graphcool/graphql-request#using-variables
const addTweet = (event) => {
  const mutation = `mutation ($tweetText: String!, $userName: String!) {
    createTweet(tweetText: $tweetText, userName: $userName) {
      id
    }
  }`

  const variables = {
    tweetText: event.text,
    userName: event.user.screen_name
  }

  request(endpoint, mutation, variables)
    // .then((data) => data) // .then((data) => console.log(data))
    .then((data) => console.log(data))
    .catch((err) => console.log('Error: ', err, 'Tweet Text: ', event.text, 'Mutation: ', mutation))
}

module.exports = addTweet
