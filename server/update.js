var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
var defer = require('node-defer');
var ObjectID = require('mongodb').ObjectID;

exports.updateProduct = function (product_id, updateData) {
  var deferred = new defer();

  MongoClient.connect(url, function(err, db) {
    if (err) {
      deferred.reject(err);
    }
    var dbo = db.db("week9");
    var myquery = { _id: ObjectID(product_id) };
    var newvalues = { $set: updateData };
    console.log(myquery);
    console.log(newvalues);

    dbo.collection("products").updateOne(myquery, newvalues, function(err, res) {
      if (err) {
        deferred.reject(err);
      }
      console.log("1 product updated");
      db.close();
      deferred.resolve();
    });
  });
  return deferred.promise();
};
