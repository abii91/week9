var app = require('express')();
var MongoClient = require('mongodb').MongoClient;
var productReader = require('./server/read.js');
var productCreator = require('./server/add.js');
var productRemover = require('./server/remove.js');
var productUpdater = require('./server/update.js');

require('./server/create.js').createDatabase();
require('./server/create.js').createCollection();

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200/");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});


app.get('/', function (req, res) {

});

app.get('/products', function (req, res) {
  productReader.readProducts()
  .then(function(products){
    res.json(products);
  })
  .catch(function(err){
    res.json({err: "Error readding products."});
  })
});

app.post('/products', function (req, res) {
  var product = {
    name: req.query.name,
    type: req.query.type,
    price: req.query.price,
    description: req.query.description
  };
  productCreator.addProduct(product)
  .then(function(created_product){
    res.json(created_product);
  })
  .catch(function(err){
    res.json({err: "Error adding product."});
  })
});

app.post('/products/:id/remove', function (req, res) {
  var id = req.params.id;

  productRemover.removeProduct(id)
  .then(function(){
    res.json({ok: "Product deleted."});
  })
  .catch(function(err){
    res.json({err: "Error adding product."});
  })
});

app.post('/products/:id/update', function (req, res) {
  var id = req.params.id;
  var product = {};

  if(req.query.hasOwnProperty("name")){
    product.name = req.query.name;
  }
  if(req.query.hasOwnProperty("type")){
    product.type = req.query.type;
  }
  if(req.query.hasOwnProperty("price")){
    product.price = req.query.price;
  }
  if(req.query.hasOwnProperty("description")){
    product.description = req.query.description;
  }

  productUpdater.updateProduct(id, product)
  .then(function(product){
    res.json({ok: "Product updated."});
  })
  .catch(function(err){
    res.json({err: "Error updating product."});
  })
});

var server = app.listen(1337);
