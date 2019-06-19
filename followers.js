const baseMessage = {id:'',followers:[]}
const maxFollowers = 5;

//function

var getFollowers = function (res, request, id) {

  var options = {
    url: 'https://api.github.com/users/'+id+'/followers',
    headers: {
      'User-Agent': 'jonhoaglin-apichallenge'
    }
  };

  request.get(options, (error, response, body) => {
    if(error) {
      res.status(400).send({message: 'must supply a valid github id'});
    }

    var message = baseMessage;
    message.id=id;
    var flist = JSON.parse(body);
    for(var i=0; i<maxFollowers && i<flist.length; i++){
      message.followers.push(flist[i].login);
    }
    res.status(200).send(message);
  });
}

module.exports = getFollowers;
