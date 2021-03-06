var express = require("express");
var path = require("path");
var mongo = require("mongodb").MongoClient
var ObjectId = require('mongodb').ObjectID
var validUrl = require("valid-url");
var app = express();
require('dotenv').load();

app.use(require('stylus').middleware('/public/css/style.css'));
app.use(express.static(path.join(__dirname + '/public')));

app.get('/', function(req, res){
    res.render("index.html");
});

var baseUrl = 'https://fcc-url-shortener-ms-liy.herokuapp.com/';

var mongoUrl = process.env.MONGO_URI;

app.get('/:id', function(req, res){
    if(/^[0-9a-f]{24}$/.test(req.params.id)) {
        var doc = {_id: ObjectId(req.params.id)};
        mongo.connect(mongoUrl, function(err, db) {
            if(err) throw err;
            db.collection("sites").findOne(doc, function(err, result) {
                if (err) throw err;
                if(result) {
                    res.redirect(result.url);
                } else {
                    res.json({"error":"No short url found for given input"});
                }
                db.close();
            });
        });
    } else {
        res.json({"error":"No short url found for given input"});
    }
});
    
app.get('/new/:url*', function(req, res){
    if(validUrl.isUri(req.url.slice(5))) {
        var url = req.url.slice(5);
        var doc = {url: url};
        mongo.connect(mongoUrl, function(err, db) {
            if(err) throw err;
            db.collection("sites").findOne(doc, function(err, result) {
                if (err) throw err;
                if(result) {
                    res.json({
                        "original_url": result.url,
                        "short_url": baseUrl + result._id
                    });
                    db.close();
                } else {
                    db.collection("sites").insertOne(doc, function(err, result) {
                        if (err) throw err;
                        res.json({
                            "original_url": url,
                            "short_url": baseUrl + result.insertedId
                        });
                        db.close();
                    });
                }
            });
        });
    } else {
        res.json({"error":"URL invalid"});
    }
});

var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Node.js listening on port ' + port + '...');
});