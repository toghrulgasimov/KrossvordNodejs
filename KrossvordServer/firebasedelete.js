async function f() {


    module.exports.routes = function(app){
        app.get("/fbaset", function (req, res) {
            console.log("ddddan cagrildi");
            //res.send("salamlar" + I.mongoc);
            res.send("asdasd");
        })
    }


module.exports.interval = function (db) {
    setInterval(async function () {
        let c = await db.collection("mycol").find().count()
        console.log(c);
    }, 1000);
}

}

f();