var getGazers = function(request, token, id, repoName, level, maxRepos, maxGazers, maxDepth){
  console.log('called getGazers('+id+', '+repoName+', '+level+')');

  //Build GET request with custom header, and use sync-request to retrieve response
  var gresponse = request('GET', 'https://api.github.com/repos/'+id+'/'+repoName+'/stargazers', {
    headers: {
      'User-Agent': 'jonhoaglin-apichallenge',
      'Authorization': 'token '+token
    }
  });

  //Parse response from JSON string to object
  var slist = JSON.parse(gresponse.getBody());
  //Initialize array
  var gazers = [];

  //Loop through stargazer list, up to maxGazers
  for(var i=0; i<maxGazers && i<slist.length; i++){
    //Determine if current level is at maxDepth requested
    if(level < maxDepth-1){
      //Recurse and get the next level deep
      gazers.push(getRepos(request, token, slist[i].login, level+1, maxRepos, maxGazers, maxDepth));
    }else{
      //Break recursion and just list stargazer's names
      gazers.push(slist[i].login);
    }
  }

  //Build return message, before return so console.log can be used to debug
  var message = {repoName:repoName, stargazers:gazers}
  //console.log('message: '+JSON.stringify(message, null, 4));
  return message;
};

//MAIN Function
var getRepos = function(request, token, id, level, maxRepos, maxGazers, maxDepth){
  console.log('called getRepos('+id+', '+level+')');

  //Build GET request with custom header, and use sync-request to retrieve response
  var response = request('GET', 'https://api.github.com/users/'+id+'/repos', {
    headers: {
      'User-Agent': 'jonhoaglin-apichallenge',
      'Authorization': 'token '+token
    }
  });

  //Parse response from JSON string to object
  var rlist = JSON.parse(response.getBody());
  //Initialize array
  var repos = [];

  //Loop through repository list, up to maxRepos
  for(var i=0; i<maxRepos && i<rlist.length; i++){
    //Get stargazers for each repo
    repos.push(getGazers(request, token, id, rlist[i].name, level, maxRepos, maxGazers, maxDepth));
  }

  //Build return message, before return so console.log can be used to debug
  var message = {githubId:id, repositories:repos}
  //console.log('message: '+JSON.stringify(message, null, 4));
  return message;
};

module.exports = getRepos;
