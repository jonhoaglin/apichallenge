var getFollowers = function(res, id, level){
  console.log('called getFollowers('+id+', '+level+')');

  var options = {
    url: 'https://api.github.com/users/'+id+'/followers',
    headers: {'User-Agent': 'jonhoaglin-apichallenge'}
  };

  if(level < maxDepth){
    request.get(options, (error, response, body) => {
      if(error) {
        console.log('request to github returned an error: '+error);
        res.status(400).send({message: 'must supply a valid github id'});
      }
      console.log('request to github successful.');

      var flist = JSON.parse(body);
      var followers;
      for(var i=0; i<maxFollowers && i<flist.length; i++){
        followers.push(getFollowers(res, flist[i].login, level+1));
      }

      var message = {id:id, followers:followers}
      console.log('message: '+JSON.stringify(message, null, 4));
      return message;
    });
  }else{
    request.get(options, (error, response, body) => {
      if(error) {
        console.log('request to github returned an error: '+error);
        res.status(400).send({message: 'must supply a valid github id'});
      }
      console.log('request to github successful.');

      var flist = JSON.parse(body);
      var followers = [];
      for(var i=0; i<maxFollowers && i<flist.length; i++){
        followers.push(flist[i].login);
      }

      var message = {id:id, followers:followers}
      console.log('message: '+JSON.stringify(message, null, 4));
      return message;
    });
  }
};
