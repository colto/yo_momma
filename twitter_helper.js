'use strict';
module.change_code = 1;
var _ = require('lodash');
var Twitter = require('twit');
var CONSUMER_KEY = 'hUZe6A9PRrYUxVL3F7LmmaGQO';
var CONSUMER_SECRET = '0lAiOYcOb0w1DjYs3WmuIwjcxoZs6IBq4vMBT7QaJDDab2D9jz';
function TwitterHelper(accessToken) {
  this.accessToken = accessToken.split(',');
  this.client = new Twitter({
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET,
    access_token: this.accessToken[0],
    access_token_secret: this.accessToken[1]
  });
}

TwitterHelper.prototype.postTweet = function(message) {
  return this.client.post('statuses/update', {
    status: message
  }).catch(function(err) {
      console.log('caught error', err.stack);
    });
};

module.exports = TwitterHelper;
