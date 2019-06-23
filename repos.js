var getRepos = function(request, token, id, level, maxRepos, maxDepth){
  //console.log('called getFollowers('+id+', '+level+')');

  //Build GET request with custom header, and use sync-request to retrieve response
  var response = request('GET', 'https://api.github.com/users/'+id+'/repos', {
    headers: {
      'User-Agent': 'jonhoaglin-apichallenge',
      'Authorization': 'token '+token
    },
  });

  //Parse response from JSON string to object
  var rlist = JSON.parse(response.getBody());
  //Initialize array
  var repos = [];

  //Loop through follower list, up to maxRepos
  for(var i=0; i<maxRepos && i<flist.length; i++){
    //Determine if current level is at maxDepth requested
    if(level < maxDepth-1){
      //Recurse and get the next level deep
      repos.push(getRepos(request, token, rlist[i].name, level+1, maxRepos, maxDepth));
    }else{
      //Break recursion and just list repo names
      repos.push(rlist[i].name);
    }
  }

  //Build return message, before return so console.log can be used to debug
  var message = {id:id, repos:repos}
  //console.log('message: '+JSON.stringify(message, null, 4));
  return message;
};

var getRepos = function(request, token, id, level, maxRepos, maxDepth){
  //console.log('called getFollowers('+id+', '+level+')');

  //Build GET request with custom header, and use sync-request to retrieve response
  var response = request('GET', 'https://api.github.com/users/'+id+'/repos', {
    headers: {
      'User-Agent': 'jonhoaglin-apichallenge',
      'Authorization': 'token '+token
    },
  });

  //Parse response from JSON string to object
  var rlist = JSON.parse(response.getBody());
  //Initialize array
  var repos = [];

  //Loop through follower list, up to maxRepos
  for(var i=0; i<maxRepos && i<flist.length; i++){
    //Determine if current level is at maxDepth requested
    if(level < maxDepth-1){
      //Recurse and get the next level deep
      repos.push(getRepos(request, token, rlist[i].name, level+1, maxRepos, maxDepth));
    }else{
      //Break recursion and just list repo names
      repos.push(rlist[i].name);
    }
  }

  //Build return message, before return so console.log can be used to debug
  var message = {id:id, repos:repos}
  //console.log('message: '+JSON.stringify(message, null, 4));
  return message;
};

module.exports = getRepos;
