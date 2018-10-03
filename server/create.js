var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

exports.createCollection = function () {

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("week9");
    dbo.createCollection("products", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });
};


exports.createDatabase = function () {
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url + "week9", function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
  });
};
