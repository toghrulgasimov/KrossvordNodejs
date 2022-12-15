
let fs = require('fs')

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://0.0.0.0:27017/";

let se = fs.readFileSync('seherler')+"";
let ar = se.split('\n');

async function ff() {
    let cnt = 0;
    let db = await MongoClient.connect(url);
    var dbo = await db.db("mydb");
    let a = await dbo.collection("mycol").find().toArray();
    for(let i = 0 ; i < a.length; i++) {
        let t = await dbo.collection("mycol").find({name:a[i].name}).count();
        if(t > 1) {
            console.log(a[i]);
            // if(a[i].score == 0) {
            //     let kk = await dbo.collection("mycol").remove({_id : a[i]._id});
            //     cnt++;
            //     console.log(cnt);
            // }

        }
    }
    db.close()
}

ff()


