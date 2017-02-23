'use strict';
var requestPromise = require('request-promise');
var ENDPOINT = 'http://api.yomomma.info';

function YoMommaDataHelper() {
}

YoMommaDataHelper.prototype.getJoke = function() {
  var options = {
    method: 'GET',
    uri: ENDPOINT,
    json: true
  };
  return requestPromise(options);
}

module.exports = YoMommaDataHelper;
