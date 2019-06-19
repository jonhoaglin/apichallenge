var path = require('path');

var appRouter = function (app) {
  app.get("/", function(req, res) {
    res.status(200).sendFile(path.resolve('./index.html'));
  });

  app.get("/followers/:id", function(req, res){
    var id = req.params.id;

    if(typeof id !== 'undefined' && id !== null){
      res.status(200).send({message: id});
    }else{
      res.status(400).send({message: 'must supply a valid github id'});
    }
  });
}

module.exports = appRouter;
