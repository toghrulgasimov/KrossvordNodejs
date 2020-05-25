async  function f() {
    let fs = require('fs');

    let mongoUtil = require( './mongoUtil' );
    let cilentM = await mongoUtil.connectToServer();
    let db = await mongoUtil.getDb();


    let s = fs.readFileSync("./ans.csv") + "";

    let a = s.split('\n');
    let ans = [];
    let p = a[0].split(",");
    console.log(p);
    for(let i = 1; i < 10; i++) {
        let t = a[i].split(",");
        let  o = {};
        for(let j = 1; j < p.length; j++) {
            o[p[j]] = t[j];
        }
        console.log(o);
        await db.collection("adlar").insertOne(o);
    }
    console.log(a.length);
}

f();