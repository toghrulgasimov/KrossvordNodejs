
let fs = require('fs'), readline = require('readline');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://0.0.0.0:27017/";


let tt = 0;


let D = {};
let q = 0;




var lineReader = require('line-reader');

lineReader.eachLine('log', function(line, last) {
    try {
        let s = line;
        //console.log(s)
        let r =  s.indexOf(": ");
        if(r != -1) {
            let j = s.indexOf("&&") + 2;

            let S = s.substr(j, r);

            let A = S.split(":");


            A[1] = A[1].substr(1);
            A[1] = A[1].split(" ")[0];

            A[1] = parseInt(A[1])
            //console.log(A)
            //console.log(s)
            if(A[1] > 0) {
                if(D[A[0]] == undefined || D[A[0]] < A[1])
                    D[A[0]] = A[1]
            }



            q++;
        }

        if(last){
            let cnt = 0;
            // let AR = [];
            // for(let x in D) {
            //     AR.push({ad:x, score:D[x]})
            // }
            // AR.sort((a, b)=>{
            //     if(a.score < b.score) {
            //         return 1;
            //     }else {
            //         return -1;
            //     }
            // })
            //console.log(D);

            async function ff() {
                let db = await MongoClient.connect(url);
                let dbo = await db.db("mydb");

                for(let name in D) {
                    console.log(name);
                    await dbo.collection("mycol").updateOne({name:name}, {$set:{score:D[name]}},{upsert:true})

                }
                console.log("DONE!!")
                db.close();
            }
            ff()
        }
    }catch (e) {
        
    }

});






