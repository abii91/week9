var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
var defer = require('node-defer');
var ObjectID = require('mongodb').ObjectID;

exports.removeProduct = function (product_id) {
  var deferred = new defer();

  MongoClient.connect(url, function(err, db) {
    if (err) {
      deferred.reject(err);
    }
    var dbo = db.db("week9");
    var query = { _id: ObjectID(product_id) };
    console.log(query);
    dbo.collection("products").deleteOne(query, function(err, res) {
      if (err) {
        deferred.reject(err);
      }
      console.log("1 product removed");
      deferred.resolve();
      db.close();
    });
  });

  return deferred.promise();
};
