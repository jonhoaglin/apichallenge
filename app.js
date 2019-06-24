//Include main libraries
var express = require('express');
var app = express();
var path = require('path');
var request = require('sync-request');

//Include github basic auth token
//(this file will need to be created, see readme)
var auth = require('./token.js');

//Set main variables for limiting calls
//Should not be set much higher, as response will slow down exponentially
const maxDepth = 3;
const maxFollowers = 5;
const maxRepos = 3;
const maxGazers = 3;

//Include main methods
var getFollowers = require('./followers.js');
var getRepos = require('./repos.js');

//Home page response, html version of readme
app.get('/', function(req, res) {
  res.status(200).sendFile(path.resolve('./index.html'));
});

//Catch instance of no github id and return error
app.get('/followers', function(req, res){
  res.status(400).send({message: 'must supply a valid github id'});
});

//Main follower method response
app.get('/followers/:id', function(req, res){
  //get github id from url
  var id = req.params.id;
  console.log('request recieved for /followers/'+id);

  //Build response message
  var endMessage = getFollowers(request, auth.token, id, 0, maxFollowers, maxDepth);
  //console.log('endMessage: '+JSON.stringify(endMessage, null, 4));

  res.status(200).send({message:endMessage});
});

//Catch instance of no github id and return error
app.get('/repos', function(req, res){
  res.status(400).send({message: 'must supply a valid github id'});
});

//Main repository method response
app.get('/repos/:id', function(req, res){
  //get github id from url
  var id = req.params.id;
  console.log('request recieved for /repos/'+id);

  //Build response message
  var endMessage = getRepos(request, auth.token, id, 0, maxRepos, maxGazers, maxDepth);
  //console.log('endMessage: '+JSON.stringify(endMessage, null, 4));

  res.status(200).send({message:endMessage});
});

//START SERVER, visit http://localhost:3000
var server = app.listen(3000, function () {
    console.log('app running on port: '+server.address().port);
});
