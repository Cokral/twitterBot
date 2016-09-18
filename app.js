'use-strict';

//console.log("Hello World!");

//Similar to import in C for example
var TwitterPackage = require('twitter');

//Should be removed if i put this on github
var secret = {
	consumer_key: '',
	consumer_secret: '',
	access_token_key: '',
	access_token_secret: ''
}

var Twitter = new TwitterPackage(secret);


//Post a tweet
/*Twitter.post('statuses/update', {status: 'Miaou miaou ~'}, function(error, tweet, response){
	if(error):
		console.log(error);
	console.log(tweet);
	console.log(response);
});
*/
//Listen to a certain #
Twitter.stream('statuses/filter', {track: '#giveaway'}, function(stream) {
  stream.on('data', function(tweet) {
  	if (tweet.name != "Joso le minou") {
  		if (checkIfRetweetNeeded(tweet.text)){
  			console.log("Je retweet.");
  			retweet(tweet.id_str, tweet.user.name);
  		}
  	}
  	
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});


//Retweet function, takes tweet.id_str + tweet.name 
function retweet(tweetId, name) {
	console.log("Retweet de : " + name +'\n');
	Twitter.post('statuses/favorite/' + tweetId, function(error, tweet, response){
		if (error){
			console.log(error);
		}
	});	
}

function checkIfRetweetNeeded(tweet) {

	console.log("Je check en ce moment.");
	var arrayRT = ["RT", "RETWEET","LIKE", "FAVORITE"];
	tweet = tweet.toUpperCase();

	return arrayRT.filter((e) => tweet.includes(e)).length > 0;
}
