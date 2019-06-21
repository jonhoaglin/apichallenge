var express = require('express');
var app = express();
var path = require('path');
var request = require('sync-request');
var auth = require('./token.js');

const maxDepth = 3;
const maxFollowers = 5;
const maxRepos = 3


var getFollowers = require('./followers.js');
var getRepos = require('./repos.js');

app.get("/", function(req, res) {
  res.status(200).sendFile(path.resolve('./index.html'));
});

app.get("/followers", function(req, res){
  res.status(400).send({message: 'must supply a valid github id'});
});

app.get("/followers/:id", function(req, res){
  var id = req.params.id;
  console.log('request recieved for /followers/'+id);

  var endMessage = getFollowers(request, auth.token, id, 0, maxFollowers, maxDepth);
  //console.log('endMessage: '+JSON.stringify(endMessage, null, 4));
  res.status(200).send({message:endMessage});
});

app.get("/repos", function(req, res){
  res.status(400).send({message: 'must supply a valid github id'});
});

app.get("/repos/:id", function(req, res){
  var id = req.params.id;
  console.log('request recieved for /repos/'+id);

  var endMessage = getRepos(request, auth.token, id, 0, maxRepos, maxDepth);
  //console.log('endMessage: '+JSON.stringify(endMessage, null, 4));
  res.status(200).send({message:endMessage});
});

var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});
