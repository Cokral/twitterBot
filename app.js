'use-strict';

//console.log("Hello World!");

//Similar to import in C for example
var TwitterPackage = require('twitter');

//Should be removed if i put this on github
var secret = {
	consumer_key: 'f8SyLId1nj0tavxZMZp3fwETH',
	consumer_secret: 's10OOVFfY2X47Wh4yfNGlxCLmuMrV9bYm186QLQR2aFFSJjl9t',
	access_token_key: '776409978793897984-5qrykaQ75I9tNLX0DdZPovQqTlBS3Z8',
	access_token_secret: 'YSdVdiLXmju7UafGP9ALj3IpPwGmnlYRZDPfEqIvCUpD4'
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
  	if (tweet.user.name != "Joso le minou") {
  		if (checkIfRetweetNeeded(tweet.text)){

  			retweet(tweet.id_str, tweet.user.name);

  			//favorite(tweet.id_str);

  			follow(tweet.user.id_str);

  			console.log("...");
  		}
  	}
  	
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});


//Retweet function, takes tweet.id_str + tweet.name 
function retweet(tweetId, name) {
	Twitter.post('statuses/retweet/' + tweetId, function(error, tweet, response){
		if (error){
			console.log("\n----RETWEET----");
			console.log("name: " + name);
			console.log(error);
		}
	});	
}

//Follow function, takes tweet.user.id
function follow(userId){
	Twitter.post('friendships/create/',{id: userId}, function(error){
		if(error){
			console.log("\n----FOLLOW----");
			console.log(userId);
			console.log(error);
		}
	})
}

function favorite(tweetId) {
	Twitter.post('favorites/create/'+{id: tweetId}, function(error, tweet, response){
		if (error){
			console.log("\n----FAVORITE----");
			console.log(error);
		}
	})
}

function checkIfRetweetNeeded(tweet) {

	var arrayRT = ["RT", "RETWEET","LIKE", "FAVORITE"];
	tweet = tweet.toUpperCase();

	return arrayRT.filter((e) => tweet.includes(e)).length > 0;
}
