async function f() {


    module.exports.routes = function(app, db){
        app.post("/fbt", async function (req, res) {
            console.log("ddddan cagrildi");
            console.log(req.body.PostData);
            let o = JSON.parse(req.body.PostData);
            console.log(o);
            let imei = o.i;
            let token = o.t;
            await db.collection("devices").updateOne({imei:imei}, {$set:{token:token}}, {upsert:true});
            res.send("1");
        })

        app.post("/fbm", async function (req, res) {
            let admin = require('firebase-admin');
            let serviceAccount = require("./familyprotector-9fc7b-firebase-adminsdk-39knv-e27615e365.json");

            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: "https://familyprotector-9fc7b.firebaseio.com"
            });
            let ds = await db.collection("devices").find({}).toArray();
            let ts = [];
            for(let i = 0; i < ds.length; i++) {
                ts.push(ds.token);
            }
            let s = "";
            for(let i = 0; i < 10; i++) {
                s += "a";
            }
            let message = {
                data: {
                    score: s,
                    time: '2:45',
                    score1: '213',
                    time1: '2:45',
                    score2: '213',
                    time2: '2:45'
                },
                token: ts
            };
            admin.messaging().send(message)
                .then((response) => {
                    // Response is a message ID string.
                    console.log('Successfully sent message:', response);
                })
                .catch((error) => {
                    console.log('Error sending message:', error);
                });

            res.send("1");
        })
    }
}

f();