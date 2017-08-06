const { request } = require('graphql-request')
const config = require('../config')

const endpoint = config.graphqlConfig.endpoint

// use varibles to avoid breaking text being added
// https://github.com/graphcool/graphql-request#using-variables
const checkUser = (event) => {
  const query = `query ($userName: String!) {
    allTweets(filter: {userName: $userName}) {
      id
    }
  }`

  const variables = {
    userName: event.user_name
  }

  return request(endpoint, query, variables)
    .then((data) => {
      // console.log('returning data: ', data.allTweets.length)
      console.log(data.allTweets)
      return data.allTweets
    })
    .catch((err) => console.log('Error: ', err, 'Tweet Text: ', event.text, 'Mutation: ', mutation))
}

module.exports = checkUser
