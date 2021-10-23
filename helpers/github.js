const axios = require('axios');
const config = require('../config.js');
const db = require('../database/index.js')

let getReposByUsername = (term, callback) => {
  let options = {
    url: `https://api.github.com/users/${term}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  axios.get(options.url, options)
    .then((results) => {
      return db.save(results.data)
        .then((result) => {
          if (!result) {
            throw new Error ('Failed to insert');
          }
          callback(null, result)
        })

    })
    .catch(err => {
      callback(err);
    })

}

module.exports.getReposByUsername = getReposByUsername;