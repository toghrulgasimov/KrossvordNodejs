const express = require('express')
const app = express()
var http = require('http')
var https = require('https')
var bodyParser = require('body-parser');
let fs = require('fs')
var mongo = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        //if(a[i].length != a[j].length) continue;
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

let tt = 0;


let D = {};
let q = 0;


/*
0-teze
1-kecdi
2-atkaz
3-islet
4-isletme
5-
 */
async function ff() {
    let db = await MongoClient.connect(url);
    let dbo = await db.db("mydb");
    //<a href="https://www.w3schools.com">Visit W3Schools.com!</a> <a href="https://www.w3schools.com">NO</a>

    app.get('/teklifler', async (req, res) =>  {

        let a = await dbo.collection("teklifler").find({status:0}).toArray();
        let ans = "";
        a = shuffle(a);
        for(let i = 0; i < a.length; i++) {
            if(a[i].teklifcavab == "" || a[i].teklifcavab == undefined || a[i].teklifsual == "" || a[i].teklifsual == undefined) {
              continue;
            }
            //34.125.242.46
            ans += '<a href="http://34.125.242.46:3060/qebul?_id='+a[i]._id+'">'+a[i].teklifcavab.toUpperCase()+'----'+(a[i].teklifsual)+'&#160&#160&#160&#160['+a[i].ad+' '+a[i].soyad+'('+a[i].reg+')]--'+'</a>'
            ans += '<a href="http://34.125.242.46:3060/qebul?reject=1&_id='+a[i]._id+'">__________________________NO</a>';
            ans += '<br>';
        }
        //res.send('Hello World!');
        res.send(ans);
    });
    app.get('/qebul', async (req, res) =>  {
        if(req.query.reject == undefined) {
            await dbo.collection('teklifler').updateOne({_id:new mongo.ObjectID(req.query._id)}, { $set: {status : 1}});
            let t = await dbo.collection('teklifler').findOne({_id:new mongo.ObjectID(req.query._id)});
            let u = await dbo.collection('mycol').findOne({device:t.device});
            let psoz = 1, pxal = 2, up = 1;
            if(u.psoz != undefined)
                psoz = u.psoz+1;
            if(u.pxal != undefined)
                pxal = u.pxal+4;
            if(u.up != undefined)
                up = u.up+4;
            await dbo.collection('mycol').updateOne({device:t.device},{$set:{pxal:pxal, psoz:psoz, up:up}});

            t = await dbo.collection('teklifler').findOne({_id:new mongo.ObjectID(req.query._id)});
            u = await dbo.collection('mycol').findOne({device:t.device});
            console.log(t);
            console.log(u);
            res.redirect('http://34.125.242.46:3060/teklifler');
        }else {
            let t = await dbo.collection('mycol').findOne({_id:new mongo.ObjectID(req.query._id)});
            console.log(t);
            await dbo.collection('teklifler').updateOne({_id:new mongo.ObjectID(req.query._id)}, {$set:{status:2}});
            res.redirect('http://34.125.242.46:3060/teklifler');
        }

    });


    app.get('/teklifler2', async (req, res) =>  {

        let a = await dbo.collection("teklifler").find({status:1}).limit(50).toArray();
        let ans = "";
        a = shuffle(a);
        for(let i = 0; i < a.length; i++) {

              if(a[i].teklifcavab == "" || a[i].teklifcavab == undefined || a[i].teklifsual == "" || a[i].teklifsual == undefined) {
                continue;
              }
            ans += '<a href="http://34.125.242.46:3060/islet?_id='+a[i]._id+'">'+a[i].teklifcavab.toUpperCase()+'----'+(a[i].teklifsual)+'&#160&#160&#160&#160['+a[i].ad+' '+a[i].soyad+'('+a[i].reg+')]--'+'</a>'
            ans += '<a href="http://34.125.242.46:3060/islet?reject=1&_id='+a[i]._id+'">&&&&&&&&&&&&&&&&NO</a>';
            ans += '<br>';
        }
        //res.send('Hello World!');
        res.send(ans);
    });
    app.get('/islet', async (req, res) =>  {
        if(req.query.reject == undefined) {
            await dbo.collection('teklifler').updateOne({_id:new mongo.ObjectID(req.query._id)}, { $set: {status : 3}});
            let t = await dbo.collection('teklifler').findOne({_id:new mongo.ObjectID(req.query._id)});
            let u = await dbo.collection('mycol').findOne({device:t.device});
            let psoz = 1, pxal = 2, up = 1;
            if(u.psoz != undefined)
                psoz = u.psoz+1;
            if(u.pxal != undefined)
                pxal = u.pxal+4;
            if(u.up != undefined)
                up = u.up+4;
            await dbo.collection('mycol').updateOne({device:t.device},{$set:{pxal:pxal, psoz:psoz, up:up}});

            t = await dbo.collection('teklifler').findOne({_id:new mongo.ObjectID(req.query._id)});
            u = await dbo.collection('mycol').findOne({device:t.device});
            console.log(t);
            console.log(u);
            res.redirect('http://34.125.242.46:3060/teklifler2');
        }else {
            let t = await dbo.collection('mycol').findOne({_id:new mongo.ObjectID(req.query._id)});
            console.log(t);
            await dbo.collection('teklifler').updateOne({_id:new mongo.ObjectID(req.query._id)}, {$set:{status:4}});
            res.redirect('http://34.125.242.46:3060/teklifler2');
        }

    });

    app.listen(3060, () => console.log('Example app listening on port 80!'))

}
ff()
