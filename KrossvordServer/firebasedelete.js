async function f() {


    module.exports.routes = function(app, db){
        app.get("/fbt", async function (req, res) {
            console.log("ddddan cagrildi");
            console.log(req.query.PostData);
            let imei = req.query.imei;
            let token = req.query.t;
            let d = await db.collection("devices").find({imei:imei}).toArray();
            console.log(d);
            res.send("1");
        })
    }
}

f();