var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var request = require('sync-request')

const maxFollowers = 5;
const maxDepth = 3;

var getFollowers = function(res, id, level){
  //console.log('called getFollowers('+id+', '+level+')');

  var response = request('GET', 'https://api.github.com/users/'+id+'/followers', {
    headers: {
      'User-Agent': 'jonhoaglin-apichallenge',
      'Authorization': 'token 119857506b3220fb051bbd218a72b6d148aa9da0'
    },
  });

  var flist = JSON.parse(response.getBody());
  var followers = [];

  for(var i=0; i<maxFollowers && i<flist.length; i++){
    if(level < maxDepth){
      followers.push(getFollowers(res, flist[i].login, level+1));
    }else{
      followers.push(flist[i].login);
    }
  }

  var message = {id:id, followers:followers}
  //console.log('message: '+JSON.stringify(message, null, 4));
  return message;
};

var factorial = function(number) {
  if (number <= 0) { // terminal case
    return 1;
  } else { // block to execute
    return (number * factorial(number - 1));
  }
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.status(200).sendFile(path.resolve('./index.html'));
});

app.get("/followers", function(req, res){
  res.status(400).send({message: 'must supply a valid github id'});
});

app.get("/followers/:id", function(req, res){
  var id = req.params.id;

  var endMessage = getFollowers(res, id, 0);
  console.log('endMessage: '+JSON.stringify(endMessage));
  res.status(200).send({message:endMessage});
});

app.get("/test", function(req, res){
  var result = factorial(6);
  console.log(result);
  res.status(200).send({message:result});
});

var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});
