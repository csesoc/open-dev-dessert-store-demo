const fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const store = fs.readFileSync('store.json');

const data = JSON.parse(store);

MongoClient.connect(url, function(err, db) {
    if (err) throw err;

    var dbo = db.db("dessertStorev2");

    dbo.collection("store").insertMany(data, function(err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
    })
});