'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var skill = new Alexa.app('yo_momma');
var YoMommaDataHelper = require('./yo_momma_data_helper');
var TwitterHelper = require('./twitter_helper');

skill.launch(function(request, response) {
  var prompt = 'For Yo Momma Jokes, ask me to tell you a fact about your mother.';
  response.say(prompt).reprompt(prompt).shouldEndSession(false);
});

skill.intent('tweetJoke', {
  'slots': {},
  'utterances': ['tweet {|joke|fact} {|about} {|yo} {|momma|mother|mom}']
},
function(request, response) {
  console.log('session details', request.sessionDetails);
  console.log('accessToken: ', request.sessionDetails.accessToken);
  var accessToken = request.sessionDetails.accessToken;
  if (accessToken === null) {
    //no token, show link account card
    response.linkAccount().shouldEndSession(true).say('Your twitter account is not linked');
    return true;
  } else {
    //i've got a token! make the tweet
    var twitterHelper = new TwitterHelper(request.sessionDetails.accessToken);
    var yoMommaHelper = new YoMommaDataHelper();
    var joke = yoMommaHelper.getJoke()
    twitterHelper.postTweet(joke).then(function(result) {
        console.log(result);
        response.say('I\'ve posted the status to your timeline').send();
      }
    );
    return false
  }
});

skill.intent('tellJoke', {
  'slots': {},
  'utterances': ['tell {|joke|fact} {|about} {|my|your|yo} {|momma|mother|mom}']
},
  function(request, response) {
    var reprompt = 'Ask me about a fact about your mother.';
    var yoMommaHelper = new YoMommaDataHelper();
    var joke = yoMommaHelper.getJoke()
    response.say('Here is a fact about your mother: ' + joke).send();
  }
);

skill.intent('AMAZON.HelpIntent', function (request, response) {
  var speechOutput = "You can say tell me a yo momma joke, tweet a yo momma joke, or, you can say exit... What can I help you with?";
  var reprompt = "What can I help you with?";
  response.ask(speechOutput).reprompt(reprompt).shouldendsession(false).send();
});

skill.intent('AMAZON.CancelIntent', function (request, response) {
  response.say('Goodbye!').send();
});

skill.intent('AMAZON.StopIntent', function (request, response) {
  response.say('Goodbye!').send();
});

module.exports = skill;
