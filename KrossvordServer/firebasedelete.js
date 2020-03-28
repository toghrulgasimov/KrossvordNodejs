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
            await db.collection("devices").updateOne({imei:imei}, {$set:{token:token}}, {upsert:true});
            res.send("1");
        });
        app.post("/uploadIcon", async function (req, res) {
            console.log("upload Icon cagrildi");
            let o = JSON.parse(req.body.PostData);
            console.log(o);
            let icon = o.icon;
            let name = o.name;
            try {
                let path = "./icons/"+name;
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
        app.post("/blockApp", async function (req, res) {
            res.send("1");
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
        app.post("/ussagestat", async function (req, res) {

            res.send("1");
        });


    }
}

f();