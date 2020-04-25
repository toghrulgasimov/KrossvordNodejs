async function f() {


    var cookieParser = require('cookie-parser');


    // const mailgun = require("mailgun-js");
    // const DOMAIN = "mg.lookin24.com";
    // const mg = mailgun({apiKey: "6d3b67e2434192b5277e46b39e601277-f135b0f1-ae549850", domain: DOMAIN});
    // const data = {
    //     from: "Xeberdarliqlara<admin@mg.lookin24.com>",
    //     to: "zeylikzeylik2@gmail.com",
    //     subject: "Parolu Deyish",
    //     text: "Parolu deyishmek ucun link budur"
    // };
    // mg.messages().send(data, function (error, body) {
    //     console.log(body);
    // });



    const fs = require('fs');
    //sk_live_1F3Ksgi8u1xixMtAkE2at33d006RrwEQCS
    //sk_test_j08lKmmHNZg0EgDDpCKDOF7Q00ZBJHNpgK
    const stripe = require('stripe')('sk_live_1F3Ksgi8u1xixMtAkE2at33d006RrwEQCS');

    let isSameDay = function(a, b) {
        console.log(a, b);
        a = new Date(parseInt(a));
        b = new Date(parseInt(b));
        //console.log(a + " and " + b + "---------------------------- isSameDay function called");
        return a.getDate() == b.getDate() && a.getMonth() == b.getMonth() && a.getFullYear() == b.getFullYear();
    }
    let filter = function(curDay, of) {
        let ans = [];
        //console.log(of);
        for(let i = 0; i < of.length; i++) {
            if(isSameDay(curDay, of[i].start))
                ans.push(of[i]);
        }
        return ans;
    }


    module.exports.routes = function(app, db){
        app.use(cookieParser('secreteee'));
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
            if(imei == "erorrororororroro") {
                res.send("Imei null gelmishdi");
                return;
            }
            console.log(imei + "&&&&&&&&&&&&&&&&&&&&&");
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
            let data = req.body;

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
        app.get("/Whatsapp", async function (req, res) {
            let r = req.query;
            let imei = r.imei;
            console.log("in Whatsapp");
            console.log(req.query);
            let d = await db.collection("devices").findOne({imei:req.query.imei});

            console.log(d);
            let data = {imei: imei, con: d.con}
            res.send(data);
        });

        app.post("/sendWhatsapp", async function (req, res) {
            console.log("----------in sendWhatsapp");
            //also push notification to user
            let data = req.body;
            console.log(data);
            let imei = data.imei;
            //CommandResults[imei] = data;
            //console.log(data);
            //console.log("-------in sendLocation");
            await db.collection("devices").updateOne({imei:imei}, {$set:{con:data.data}}, {upsert:true});
            //let d = await db.collection("devices").findOne({imei:imei});

            res.send("1");
        });

        app.post("/sendActivity", async function (req, res) {
            console.log("in sendActivity");
            //also push notification to user
            let data = req.body;
            let imei = data.imei;

            console.log("in sendActivity");
            let ar = data.data.slice(0);


            let d = await db.collection("devices").findOne({imei:imei});



            if(d == null || d == undefined || d.activity == undefined) {
                await db.collection("devices").updateOne({imei:imei}, {$set:{activity:data}}, {upsert:true});
                CommandResults[imei+'sendActivity'] = data;
            }else {
                data.data = d.activity.data.concat(ar);
                CommandResults[imei+'sendActivity'] = data;
                let le = ar.pop();
                if(le != undefined && le.end != "-1") {
                    ar.push(le);
                }
                console.log(ar);
                await db.collection("devices").updateOne({imei:imei}, {$push:{"activity.data":{$each:ar}}});
            }
            res.send("1");
        });
        app.post("/sendYoutube", async function (req, res) {
            console.log("----------in sendYoutube");
            //also push notification to user
            let data = req.body;
            console.log(data);
            //data = JSON.parse(data);
            let imei = data.imei;
            console.log("-------in sendYoutube");
            let d = await db.collection("devices").findOne({imei:imei});
            if(d == null || d == undefined || d.youtube == undefined) {
                await db.collection("devices").updateOne({imei:imei}, {$set:{youtube:data}}, {upsert:true});
            }else {
                let ans = data.data.slice(0);
                ans.pop();
                await db.collection("devices").updateOne({imei:imei}, {$push:{"youtube.data":{$each:ans}}});
            }
            d.youtube.data = d.youtube.data.concat(data.data);
            CommandResults[imei+'sendYoutube'] = d.youtube;

            res.send("1");
        });
        app.post("/sendWebSites", async function (req, res) {
            console.log("----------in sendWebSites");
            //also push notification to user
            let data = req.body;
            console.log(data);
            //data = JSON.parse(data);
            let imei = data.imei;

            console.log(data);
            console.log("-------in sendWebSites");
            let d = await db.collection("devices").findOne({imei:imei});
            if(d == null || d == undefined || d.website == undefined) {
                await db.collection("devices").updateOne({imei:imei}, {$set:{website:data}}, {upsert:true});
            }else {
                let ans = data.data.slice(0);
                ans.pop();
                await db.collection("devices").updateOne({imei:imei}, {$push:{"website.data":{$each:ans}}});
            }
            d.website.data = d.website.data.concat(data.data);
            CommandResults[imei+'sendWebsites'] = d.website;
            console.log(d);
            res.send("1");
        });
        app.post("/sendLocation", async function (req, res) {
            console.log("----------in sendLocation");
            //also push notification to user
            let data = req.body;
            console.log(data);
            //data = JSON.parse(data);
            let imei = data.imei;
            CommandResults[imei+'sendLocation'] = data;
            console.log(data);
            console.log("-------in sendLocation");
            let d = await db.collection("devices").findOne({imei:imei});
            if(d == null || d == undefined || d.location == undefined) {
                await db.collection("devices").updateOne({imei:imei}, {$set:{location:data}}, {upsert:true});
            }else {
                let ans = data.data.slice(0);
                ans.pop();
                await db.collection("devices").updateOne({imei:imei}, {$push:{"location.data":{$each:ans}}});
            }
            d.location.data = d.location.data.concat(data.data);
            CommandResults[imei+'sendYoutube'] = d.location;

            res.send("1");
        });
        app.get("/sendCommand", async function (req, res) {
            //also push notification to user
            //console.log(req.query);
            let imei = req.query.imei;
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

            let d = await db.collection("devices").findOne({imei:imei});
            if(d == null || d == undefined) {

                return;
            }

            let t = 0;
            let f = setInterval(function () {
                t++;
                //console.log(t + " in sendCommand");
                //console.log(CommandResults);
                if(CommandResults[imei+cmd] != undefined) {
                    let of = CommandResults[imei+cmd];
                    //console.log(of);
                    //console.log("SEND activity bu gelib")

                    of.data = filter(req.query.curDay, of.data);
                    res.send(of);
                    clearInterval(f);
                    CommandResults[imei+cmd] = undefined;
                }
                if(t == 10) {
                    clearInterval(f);
                    let ans;
                    if(cmd == 'sendActivity' && d.activity != undefined) {
                        d.activity.data = filter(req.query.curDay,d.activity.data);
                        res.send(d.activity);
                    }else if(cmd == 'sendLocation' && d.location != undefined){
                        d.location.data = filter(req.query.curDay,d.location.data);
                        res.send(d.location);
                    } else if(cmd == 'sendWensites' && d.website != undefined){
                        d.website.data = filter(req.query.curDay,d.website.data);
                        res.send(d.website);
                    }else if(cmd == 'sendYoutube' && d.youtube != undefined) {
                        d.youtube.data = filter(req.query.curDay,d.youtube.data);
                        res.send(d.youtube);
                    }else {
                        res.send("0");
                    }
                }
            }, 1000);

            console.log(imei + "---" + d.token);



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

        app.get("/gpsIcaze", async function (req, res) {
            //also push notification to user
            let imei = req.query.imei;
            let icaze = req.query.icaze;
            let d = await db.collection("devices").findOne({imei:imei});
            if(d == null) {
                res.sendStatus(500);
                return;
            }

            // let message = {
            //     data: {
            //         package: package,block:req.query.block
            //
            //     },
            //     token: d.token
            // };
            // admin.messaging().send(message)
            //     .then((response) => {
            //         // Response is a message ID string.
            //         console.log('Successfully sent message:', response);
            //     })
            //     .catch((error) => {
            //         console.log('Error sending message:', error);
            //     });



            await db.collection("devices").updateOne({imei:imei},
                {$set:{"gpsIcaze":icaze}});
            res.send(JSON.stringify(d));
        });

        app.get("/silIcaze", async function (req, res) {
            //also push notification to user
            let imei = req.query.imei;
            let icaze = req.query.icaze;
            let d = await db.collection("devices").findOne({imei:imei});
            if(d == null) {
                res.sendStatus(500);
                return;
            }

            // let message = {
            //     data: {
            //         package: package,block:req.query.block
            //
            //     },
            //     token: d.token
            // };
            // admin.messaging().send(message)
            //     .then((response) => {
            //         // Response is a message ID string.
            //         console.log('Successfully sent message:', response);
            //     })
            //     .catch((error) => {
            //         console.log('Error sending message:', error);
            //     });



            await db.collection("devices").updateOne({imei:imei},
                {$set:{"silIcaze":icaze}});
            res.send(JSON.stringify(d));
        });





        app.post("/charge", (req, res) => {
            try {
                stripe.customers
                    .create({
                        name: req.body.name,
                        email: req.body.email,
                        source: req.body.stripeToken
                    })
                    .then(customer =>
                        stripe.charges.create({
                            amount: req.body.amount * 100,
                            currency: "usd",
                            customer: customer.id
                        })
                    )
                    .then(() => res.send("DONE"))
                    .catch(err => console.log(err));
            } catch (err) {
                res.send(err);
            }
        });

        app.post("/checkout", (req, res) => {
            console.log(req.body);
            try {
                stripe.customers
                    .create({
                        email: req.body.stripeEmail,
                        source: req.body.stripeToken
                    })
                    .then(customer =>
                        stripe.charges.create({
                            amount: 199,
                            currency: "eur",
                            customer: customer.id
                        })
                    )
                    .then(() => res.send("DONE"))
                    .catch(err => {
                        console.log(err);
                        res.send("Kartda yeterince pul yoxdur");
                    });
            } catch (err) {
                res.send(err);
            }

        });

        app.get("/login", async function (req, res) {



            console.log(req.signedCookies);
            console.log(req.query);
            if(req.query.email == undefined) {
                req.query.email = req.signedCookies.email;
                req.query.password = req.signedCookies.password;
            }
            if(req.query.password == undefined || req.query.password == undefined) {
                res.send("EMAIL OR PASSWORD ARE NOT DEFINED");
                return;
            }

            let u = await db.collection("devices").findOne({email:req.query.email, password:req.query.password});
            if(u == undefined) {
                res.send("PASWORD YANLISHDIR");
                return;
            }

            let options = {
                maxAge: 253402300000000, // would expire after 15 minutes
                //httpOnly: true, // The cookie only accessible by the web server
                signed: true // Indicates if the cookie should be signed
            }

            // Set cookie
            res.cookie('email', req.query.email, options) // options is optional
            res.cookie('password', req.query.password, options) // options is optional
            res.cookie('date', (new Date()).toLocaleString(), options) // options is optional
            let imei = req.signedCookies.imei;
            if(imei != undefined) {
                await db.collection("devices").updateOne({imei:imei}, {$set:{email:req.query.email, password:req.query.password}}, {upsert:true});
            }
            res.send("1");
        });
        app.get("/registration", async function (req, res) {

            console.log(req.query);

            let u = await db.collection("devices").findOne({email:req.body.email});
            if(u == undefined) {
                let options = {
                    maxAge: 253402300000000, // would expire after 15 minutes
                    //httpOnly: true, // The cookie only accessible by the web server
                    signed: true // Indicates if the cookie should be signed
                }
                res.cookie('email', req.query.email, options) // options is optional
                res.cookie('password', req.query.password, options) // options is optional
                res.cookie('date', (new Date()).toLocaleString(), options) // options is optional


                let imei = req.signedCookies.imei;
                if(imei != undefined) {
                    await db.collection("devices").updateOne({imei:imei}, {$set:{email:req.query.email,password: req.query.password}}, {upsert:true});
                }else {
                    await db.collection("devices").insertOne({email:req.query.email, password: req.query.password});
                }
                res.send("1");
                return;
            }else {
                res.send("BU Email artiq movcuddur");
            }
        });


        app.get("/index3", async function (req, res) {

            let imei = req.query.imei;
            if(imei != undefined) {
                let options = {
                    maxAge: 253402300000000, // would expire after 15 minutes
                    //httpOnly: true, // The cookie only accessible by the web server
                    signed: true // Indicates if the cookie should be signed
                }

                // Set cookie
                res.cookie('imei', imei, options) // options is optional
            }
            let email = req.signedCookies.email;
            let password = req.signedCookies.password;
            let c = await db.collection("devices").find({email:email, password:password}).count();
            if(c == 0 || email == undefined || password == undefined) {
                res.redirect("/login.html");
                return;
            }
            let s = await fs.readFileSync('./FamilyProtector/html/index3.html') + "";
            res.send(s);
        });

        app.get("/parent", async function (req, res) {
            let parent = req.query.parent;

            console.log(req.query);
            if(parent != "0" && parent != "1") {
                res.send("ERROR");
                return;
            }

            let options = {
                maxAge: 253402300000000, // would expire after 15 minutes
                //httpOnly: true, // The cookie only accessible by the web server
                signed: true // Indicates if the cookie should be signed
            }
            res.cookie('parent', parent, options) // options is optional
            let imei = req.signedCookies.imei;
            console.log("in PArent----")
            console.log(req.signedCookies);
            console.log(req.query);
            console.log("in PArent----")

            await db.collection("devices").updateOne({imei:imei}, {$set:{parent:parent}}, {upsert:true});
            res.send("1");

        });
        app.get("/childName", async function (req, res) {
            let name = req.query.name;

            let options = {
                maxAge: 253402300000000, // would expire after 15 minutes
                //httpOnly: true, // The cookie only accessible by the web server
                signed: true // Indicates if the cookie should be signed
            }
            res.cookie('name', name, options) // options is optional
            let imei = req.signedCookies.imei;
            console.log("--------------------------------" + imei);
            console.log("in childName----")
            console.log(req.signedCookies);
            console.log(req.query);
            console.log("in childName----")

            await db.collection("devices").updateOne({imei:imei}, {$set:{name:name}},{upsert:true});
            res.send("1");

        });
        app.post("/fillSelect", async function (req, res) {
            let email = req.signedCookies.email;
            console.log("------------------------------" + email + " Axtarilir");
            console.log(req.signedCookies);
            let d = await db.collection("devices").find({email:email, parent:"0",name: { $exists: true }}).project({imei:1, name:1});
            let ans = await d.toArray();
            let data = {data:ans};
            console.log(ans);
            res.send(data);

        });

    }
}

f();