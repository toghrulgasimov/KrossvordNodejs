async function f() {


    module.exports.routes = function(app, db){
        app.post("/fbt", async function (req, res) {
            console.log("ddddan cagrildi");
            console.log(req.body.PostData);
            let o = JSON.parse(req.body.PostData);
            console.log(o);
            let imei = o.i;
            let token = o.t;
            await db.updateOne({imei:imei}, {$set:{token:token}}, {upsert:true});
            res.send("1");
        })
    }
}

f();