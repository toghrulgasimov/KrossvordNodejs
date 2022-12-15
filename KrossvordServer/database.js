const express = require('express')
const app = express()
let fs = require('fs')

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

let se = fs.readFileSync('seherler')+"";
let ar = se.split('\n');
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    
    for(let i = 0; i < ar.length-1; i++) {
    	var myobj = { name: ar[i].substring(0,ar[i].length-1), score : 0.0};
        dbo.collection("mycolreg").insertOne(myobj, function(err, res) {
          if (err) return;
          
        });
    }
    
    db.close();
 });
	

	

