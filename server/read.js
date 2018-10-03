var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var defer = require('node-defer');

exports.readProducts = function (product_id, updateData) {
  var deferred = new defer();

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("week9");
    dbo.collection("products").find({}).toArray(function(err, products) {
      if (err) {
        deferred.reject(err);
      }
      console.log(products);
      deferred.resolve(products);
      db.close();
    });
  });

  return deferred.promise();
};
