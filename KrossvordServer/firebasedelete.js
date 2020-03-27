async function f() {


    module.exports.routes = function(app, db){
        app.post("/fbt", async function (req, res) {
            console.log("ddddan cagrildi");
            console.log(req.body.PostData);
            let o = JSON(req.body.PostData);
            console.log(o);
            //let imei = req.query.imei;
            //let token = req.query.t;
            //let d = await db.collection("devices").find({imei:imei}).toArray();
            //console.log(d);
            res.send("1");
        })
    }
}

f();