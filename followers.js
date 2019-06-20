var getFollowers = function(request, token, id, level, maxFollowers, maxDepth){
  //console.log('called getFollowers('+id+', '+level+')');

  var response = request('GET', 'https://api.github.com/users/'+id+'/followers', {
    headers: {
      'User-Agent': 'jonhoaglin-apichallenge',
      'Authorization': 'token '+token
    },
  });

  var flist = JSON.parse(response.getBody());
  var followers = [];

  for(var i=0; i<maxFollowers && i<flist.length; i++){
    if(level < maxDepth-1){
      followers.push(getFollowers(request, token, flist[i].login, level+1, maxFollowers, maxDepth));
    }else{
      followers.push(flist[i].login);
    }
  }

  var message = {id:id, followers:followers}
  //console.log('message: '+JSON.stringify(message, null, 4));
  return message;
};

module.exports = getFollowers;
