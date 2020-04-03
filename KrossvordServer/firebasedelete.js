async function f() {


    const fs = require('fs');
    module.exports.routes = function(app, db){
        let admin = require('firebase-admin');
        let serviceAccount = require("./familyprotector-9fc7b-firebase-adminsdk-39knv-e27615e365.json");

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://familyprotector-9fc7b.firebaseio.com"
        });


        let multer = require('multer');

        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'icons')
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname)
            }
        })

        var upload = multer({ storage: storage })

        app.post("/image",upload.single('aa'), (req, res) => {
            const file = req.file;
            if (!file) {
                const error = new Error('Please upload a file')
                error.httpStatusCode = 400;

            }else {
                console.log(file);
            }
            res.send("1")
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
                await db.collection("devices").updateOne({imei:imei}, {$set:{token:token, apps:[]}}, {upsert:true});
            }else {
                await db.collection("devices").updateOne({imei:imei}, {$set:{token:token}}, {upsert:true});
            }


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
                    let path = "icons/"+a[i].package+".png";
                    anew.push({name:a[i].name,package:a[i].package, blocked:false});
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

            res.send(JSON.stringify(O));
        });




        app.get("/getDevice", async function (req, res) {
            let imei = req.query.imei;
            let d = await db.collection("devices").findOne({imei:imei});
            let ar = d.apps;
            for(let i = 0; i < ar.length; i++) {
                let path = "icons/"+ar[i].package + ".png";
                console.log(path);
                if(fs.existsSync(path)) {
                    console.log(path + " " + "exist");
                    let s = await fs.readFileSync(path);
                }else {
                }
            }
            res.send(JSON.stringify(d));
        });




        let CommandResults = {};
        app.post("/sendActivity", async function (req, res) {
            console.log("in sendActivity");
            //also push notification to user
            let data = req.body.PostData;
            data = JSON.parse(data);
            let imei = data.imei;
            CommandResults[imei] = data;
            console.log(data);
            console.log("in sendActivity");
            await db.collection("devices").updateOne({imei:imei}, {$set:{activity:data}}, {upsert:true});
            let d = await db.collection("devices").findOne({imei:imei});
            console.log(d);
            res.send("1");
        });
        app.post("/sendYoutube", async function (req, res) {
            console.log("----------in sendYoutube");
            //also push notification to user
            let data = req.body;
            console.log(data);
            //data = JSON.parse(data);
            let imei = data.imei;
            CommandResults[imei] = data;
            console.log(data);
            console.log("-------in sendYoutube");
            res.send("1");
        });
        app.post("/sendWebSites", async function (req, res) {
            console.log("----------in sendWebSites");
            //also push notification to user
            let data = req.body;
            console.log(data);
            //data = JSON.parse(data);
            let imei = data.imei;
            CommandResults[imei] = data;
            console.log(data);
            console.log("-------in sendWebSites");
            res.send("1");
        });
        app.post("/sendLocation", async function (req, res) {
            console.log("----------in sendLocation");
            //also push notification to user
            let data = req.body;
            console.log(data);
            //data = JSON.parse(data);
            let imei = data.imei;
            CommandResults[imei] = data;
            console.log(data);
            console.log("-------in sendLocation");
            res.send("1");
        });
        app.get("/sendCommand", async function (req, res) {
            //also push notification to user
            let imei = req.query.imei;

            let d = await db.collection("devices").findOne({imei:imei});

            let t = 0;
            let f = setInterval(function () {
                t++;
                //console.log(t + " in sendCommand");
                //console.log(CommandResults);
                if(CommandResults[imei] != undefined) {
                    res.send(CommandResults[imei]);
                    clearInterval(f);
                    CommandResults[imei] = undefined;
                }
                if(t == 10) {
                    clearInterval(f);
                    res.send("0");
                }
            }, 1000);

            console.log(imei + "---" + d.token);

            let cmd;
            if(req.query.youtube != undefined) {
               cmd = 'sendYoutube'
            }else if(req.query.sendWebsites){
                cmd = 'sendWebsites';
            }else if(req.query.sendLocation){
                cmd = 'sendLocation';
            }else {
                cmd = 'sendActivity';
            }

            let message = {
                data: {
                    command: cmd

                },
                token: d.token
            };
            admin.messaging().send(message)
                .then((response) => {
                    // Response is a message ID string.
                    console.log('Successfully sent message:', response);
                })
                .catch((error) => {
                    console.log('Error sending message:', error);
                });




            console.log(req.query + " in sendCommand");
            //res.send(JSON.stringify(d));
        });
        app.get("/blockApp", async function (req, res) {
            //also push notification to user
            let imei = req.query.imei;
            let package = req.query.package;
            let d = await db.collection("devices").findOne({imei:imei});
            if(d == null) {
                res.sendStatus(500);
                return;
            }
            let cur = false;
            for(let i = 0; i < d.apps.length; i++) {
                if(d.apps[i].package == package) {
                    cur = d.apps[i].blocked;
                    console.log("Tapildi");
                    break;
                }
            }
            cur = cur ^ true;
            console.log(cur);

            let message = {
                data: {
                    package: package,block:req.query.block

                },
                token: d.token
            };
            admin.messaging().send(message)
                .then((response) => {
                    // Response is a message ID string.
                    console.log('Successfully sent message:', response);
                })
                .catch((error) => {
                    console.log('Error sending message:', error);
                });



            await db.collection("devices").updateOne({imei:imei,"apps.package": package },
            {$set:{"apps.$.blocked":cur}});
            console.log(req.query);
            res.send(JSON.stringify(d));
        });





    }
}

f();