var getRepos = function(request, token, id, level, maxRepos, maxDepth){
  //console.log('called getFollowers('+id+', '+level+')');

  var response = request('GET', 'https://api.github.com/users/'+id+'/repos', {
    headers: {
      'User-Agent': 'jonhoaglin-apichallenge',
      'Authorization': 'token '+token
    },
  });

  var rlist = JSON.parse(response.getBody());
  var repos = [];

  for(var i=0; i<maxRepos && i<flist.length; i++){
    if(level < maxDepth-1){
      repos.push(getRepos(request, token, rlist[i].name, level+1, maxRepos, maxDepth));
    }else{
      repos.push(rlist[i].name);
    }
  }

  var message = {id:id, repos:repos}
  //console.log('message: '+JSON.stringify(message, null, 4));
  return message;
};

module.exports = getRepos;
