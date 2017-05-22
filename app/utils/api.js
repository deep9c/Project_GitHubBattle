var axios = require('axios');

var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var params = "?client_id=" + id + "&client_secret=" + sec;

function getProfile(username){
	return axios.get('https://api.github.com/users/' + username + params)
		.then(function(user){
			return user.data;
		});
}

//axios returns Promise which has a .then function which is called after the API responds
/*getProfile('deep9c')
	.then(function(data){

	})*/

function getRepos(username){
	return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100')
}

function getStarCount(repos){
	return repos.data.reduce(function(count, repo){
		return count + repo.stargazers_count;
	},0)
}
//In .reduce, count initially 0. At each iteration count will be the result of addition. Iteration will run for each element in array repo

function calculateScore(profile,repos){
	var followers = profile.followers;
	var totalStars = getStarCount(repos);
	return (followers*3) + totalStars;
}

function handleError(error){
	console.warn(error);
	return null;
}

function getUserData(player){
	return axios.all([
		getProfile(player),
		getRepos(player)
	]).then(function(data){
		var profile = data[0];
		var repos = data[1];
		return{
			profile : profile,
			score : calculateScore(profile, repos)
		}
	})
}
//axios.all --> call all and get all Promises, after all the responses have been received (asynchronous) then do the thing written in .then

function sortPlayers(players){
	return players.sort(function(a,b){
		return b.score - a.score;
	});
}

//.map returns a new array. getUserData will take each element in players array and do the necessary operation to each element.
module.exports = {
	battle : function(players){
		return axios.all(players.map(getUserData))
			.then(sortPlayers)
			.catch(handleError)
	},

	fetchPopularRepos: function(language){
		var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');
		//console.log(encodedURI);
		return axios.get(encodedURI)
			.then(function(response){
				return response.data.items;
			});
	}
}

/*
api.battle(['deep9c', 'chakrabortysaptarshi'])
	.then(function(players){
		players[0]	//player[0] will be the player who won, and player[1] will be the one who lost, since we are sorting like that in sortPlayers() function
	})
*/