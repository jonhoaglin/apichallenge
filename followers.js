var getFollowers = function(request, token, id, level, maxFollowers, maxDepth){
  //console.log('called getFollowers('+id+', '+level+')');

  //Build GET request with custom header, and use sync-request to retrieve response
  var response = request('GET', 'https://api.github.com/users/'+id+'/followers', {
    headers: {
      'User-Agent': 'jonhoaglin-apichallenge',
      'Authorization': 'token '+token
    },
  });

  //Parse response from JSON string to object
  var flist = JSON.parse(response.getBody());
  //Initialize array
  var followers = [];

  //Loop through follower list, up to maxFollowers
  for(var i=0; i<maxFollowers && i<flist.length; i++){
    //Determine if current level is at maxDepth requested
    if(level < maxDepth-1){
      //Recurse and get the next level deep
      followers.push(getFollowers(request, token, flist[i].login, level+1, maxFollowers, maxDepth));
    }else{
      //Break recursion and just list follower ids
      followers.push(flist[i].login);
    }
  }

  //Build return message, before return so console.log can be used to debug
  var message = {id:id, followers:followers}
  //console.log('message: '+JSON.stringify(message, null, 4));
  return message;
};

module.exports = getFollowers;
