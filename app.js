var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var request = require('request')

const maxFollowers = 1;
const maxDepth = 3;

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
      var followers = [];
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
