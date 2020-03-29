async function f() {


    const fs = require('fs');
    module.exports.routes = function(app, db){
        let admin = require('firebase-admin');
        let serviceAccount = require("./familyprotector-9fc7b-firebase-adminsdk-39knv-e27615e365.json");

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://familyprotector-9fc7b.firebaseio.com"
        });


        app.post("/updateFirebaseToken", async function (req, res) {
            console.log("ddddan cagrildi");
            console.log(req.body.PostData);
            let o = JSON.parse(req.body.PostData);
            console.log(o);
            let imei = o.i;
            let token = o.t;
             d = await db.collection("devices").findOne({imei:imei});
            if(d == null) {
                await db.collection("devices").updateOne({imei:imei}, {$set:{token:token, apps:[{"name":"com.whatsapp", blocked:0},
                            {"name":"com.android.chrome", blocked:0}]}}, {upsert:true});
            }else {
                await db.collection("devices").updateOne({imei:imei}, {$set:{token:token}}, {upsert:true});
            }


            res.send("1");
        });
        app.post("/uploadIcon", async function (req, res) {
            console.log("upload Icon cagrildi");
            console.log(req.body.PostData);
            if(!req.body.PostData.endsWith("\"}")) {
                req.body.PostData += "\"}"
            }
            let o = JSON.parse(req.body.PostData);
            console.log(o);
            let icon = o.icon;
            let name = o.name;
            try {
                let path = "icons/"+name;
                if (!fs.existsSync(path)) {
                    await fs.writeFileSync(path, icon);
                }
            } catch(err) {
                console.error(err)
            }
            res.send("1");
        });
        app.post("/removeApp", async function (req, res) {
            res.send("1");
        });
        app.post("/initApp", async function (req, res) {
            // let imei = req.query.imei;
            // let appName = req.query.name;
            // let d = db.collection("devices").findOne();
            console.log(req.body);
            let data = JSON.parse(req.body.PostData);
            let a = data.apps;
            let anew = [];
            let O = {apps:[]}
            for(let i = 0; i < a.length; i++) {
                try {
                    let path = "icons/"+a[i].package;
                    anew.push({name:a[i].name,package:a[i].package, blocked:0});
                    if (!fs.existsSync(path)) {
                        //await fs.writeFileSync(path, icon);
                        console.log(path + " not exist");
                        O.apps.push(a[i]);
                    }else {

                        console.log(path + " exist");
                    }
                } catch(err) {
                    console.error(err)
                }
            }
            let imei = data.imei;

            d = await db.collection("devices").findOne({imei:imei});
            await db.collection("devices").updateOne({imei:imei}, {$set:{apps:anew}}, {upsert:true});
            console.log(JSON.stringify(O));
            res.send(JSON.stringify(O));
        });

        app.get("/sendCommand", async function (req, res) {
            let ds = await db.collection("devices").find().toArray();
            console.log(ds);
            let ts = [];
            for(let i = 0; i < ds.length; i++) {
                ts.push(ds[i].token);
                console.log(ds[i].token);
            }
            let s = "";
            for(let i = 0; i < 10; i++) {
                s += "a";
            }
            let message = {
                data: {
                    blockApp: "asdasd"
                },
                token: ds[0].token
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

        app.post("/uploadIcon", async function (req, res) {
            res.send("1");
        });
        app.get("/getApps", async function (req, res) {
            let imei = req.query.imei;
            let d = await db.collection("devices").findOne({imei:imei});
            let ar = d.apps;
            for(let i = 0; i < ar.length; i++) {
                let path = "icons/"+ar[i].package;
                console.log(path);
                if(fs.existsSync(path)) {
                    console.log(path + " " + "exist");
                    let s = await fs.readFileSync(path);
                    ar[i].img = s;
                }else {
                    ar[i].img = "uncnow";
                }
                d.apps = ar;
            }
            console.log(d.apps);

            res.send(JSON.stringify(d));
        });
        app.post("/updateApp", async function (req, res) {
            //also push notification to user
            let imei = req.body.imei;
            let token = req.body.token;
            let name = req.body.name;
            let d = await db.collection("devices").findOne({imei:imei});
            db.collection("devices").updateOne({imei:imei},);
            res.send(JSON.stringify(d));
        });



    }
}

f();