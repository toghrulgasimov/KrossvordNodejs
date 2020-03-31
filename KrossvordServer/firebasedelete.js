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
            res.send(file)
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
                    let path = "icons/"+a[i].package+".png";
                    anew.push({name:a[i].name,package:a[i].package, blocked:false});
                    if (!fs.existsSync(path) || true) {
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



        app.post("/uploadIcon", async function (req, res) {
            res.send("1");
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
                d.apps = ar;
            }
            res.send(JSON.stringify(d));
        });




        let CommandResults = {};
        app.post("/sendActivity", async function (req, res) {
            //also push notification to user
            let imei = req.body.imei;
            let data = req.body.data;
            CommandResults[imei] = req.query;
            console.log(req.query);
            res.send("1");
        });
        app.get("/sendCommand", async function (req, res) {
            //also push notification to user
            let imei = req.query.imei;
            let d = await db.collection("devices").findOne({imei:imei});

            let t = 0;
            let f = setInterval(function () {
                t++;
                console.log(t + " in sendCommand");
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

            let message = {
                data: {
                    command: "sendActivity"

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




            console.log(req.query);
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


        function rawBody(req, res, next) {

            console.log("Raw bady called-----");

            req.socket.on('data', function(chunk) {
                chunks.push(chunk);
                console.log("chunk" + chunk);
            });

            req.socket.on('end', function() {
                var buffer = Buffer.concat(chunks);

                req.bodyLength = buffer.length;
                req.rawBody = buffer;
                next();
            });

            req.socket.on('error', function (err) {
                console.log(err);
                res.status(500);
            });
        }

        let data = []
        app.post('/abramm', function (req, res) {

            console.log("----------------------Abraham called");
            console.log(req.body);

            req.socket.on(data, function (ch) {
                console.log(ch);
            })
            res.send("123");

        });



    }
}

f();