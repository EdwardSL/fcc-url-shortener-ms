var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGO_URI;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("sites").deleteMany({ }, function(err, obj) {
    if (err) throw err;
    console.log(obj.result.n + " document(s) deleted");
    db.close();
  });
});