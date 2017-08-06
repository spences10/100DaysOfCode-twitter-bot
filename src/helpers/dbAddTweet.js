const { request } = require('graphql-request')
const config = require('../config')

const endpoint = config.graphqlConfig.endpoint

// use varibles to avoid breaking text being added
// https://github.com/graphcool/graphql-request#using-variables
const addEncourage = (event) => {
  // create mutation passing username and encouraged variables
  const mutation = `mutation ($userName: String!, $encouraged: Boolean!) {
    createSentiment(userName: $userName, encouraged: $encouraged) {
      id
    }
  }`

  // define variables for use in mutation
  const variables = {
    userName: event.user.screen_name,
    encouraged: true // default to true
  }

  // bang it in there!
  request(endpoint, mutation, variables)
    // .then((data) => data) // .then((data) => console.log(data))
    .then((data) => console.log(data))
    .catch((err) => console.log('Error: ', err, 'Tweet Text: ', event.text, 'Mutation: ', mutation))
}

module.exports = addEncourage
