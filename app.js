var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var request = require('request')
var followers = require('./followers.js')

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

  followers(res, request, id);
/*
  var options = {
    url: "https://api.github.com/users/"+id,
    headers: {
      'User-Agent': 'jonhoaglin-apichallenge'
    }
  };
  request.get(options, (error, response, body) => {
    if(error) {
      res.status(400).send({message: 'must supply a valid github id'});
    }
    res.status(200).send({message: body});
  });
*/
});

var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});
