
let fs = require('fs'), readline = require('readline');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";


let tt = 0;


let D = {};
let q = 0;


async function ff() {
    let db = await MongoClient.connect(url);
    let dbo = await db.db("mydb");

    let ar = await dbo.collection("mycolyarish").find().toArray();
    ar.sort((a, b)=>{
        if(a.score < b.score) {
            return 1;
        }else if(b.score < a.score) {
            return -1;
        }else if(a.time < b.time) {
            return -1;
        }else return 1;
    })
    console.log(ar);
    let ans = ""
    for(let i = 0; i < ar.length; i++) {
        let u = undefined;
        try {
            u = await dbo.collection('mycol').findOne({name:ar[i].name});
        }catch (e) {

        }
        if(u == undefined || u == null) {
          u = {};
          u.reg = "undefined";
        }
        console.log(u)
        ans += "' "+(i-10)+"."+ar[i].name+"("+u.reg+")" + " " + ar[i].score + " Xal"+"\\n"+"'+"+"\n"
    }
    console.log(ans);
    fs.writeFileSync("ans", ans);
    db.close();
}
ff()
