var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://eszx:tfcyhuhb@ds155644.mlab.com:55644/urlshortenerjs";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("sites").deleteMany({ }, function(err, obj) {
    if (err) throw err;
    console.log(obj.result.n + " document(s) deleted");
    db.close();
  });
});