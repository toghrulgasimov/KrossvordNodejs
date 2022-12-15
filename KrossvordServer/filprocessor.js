const express = require('express')
const app = express()
var http = require('http')
var https = require('https')
var bodyParser = require('body-parser');
let fs = require('fs')
var mongo = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://0.0.0.0:27017/";


let tt = 0;


let D = {};
let q = 0;


async function ff() {
    let db = await MongoClient.connect(url);
    let dbo = await db.db("mydb");
    //<a href="https://www.w3schools.com">Visit W3Schools.com!</a> <a href="https://www.w3schools.com">NO</a>

    let S = fs.readFileSync('teklifler') + "";
    S = S.split('\n');
    for(let i = 0; i < S.length; i++) {
        let t = S[i].split('----');
        let k = t[0].split('---');
        if(k.length == 2) {
            console.log(k[0] + "--" + k[1] + "---" + t[1]);

            let u = await dbo.collection("mycol").findOne({device:k[0]});
            if(u != null) {
                u.teklifsual = k[1];
                u.teklifcavab = t[1];
                u.status = 0;
                delete u._id;
                console.log(u);
                await dbo.collection("teklifler").insertOne(u);
            }
        }
    }

}
ff()
