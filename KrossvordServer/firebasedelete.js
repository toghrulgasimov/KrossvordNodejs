module.exports = function(app){
    app.get("/ddt", function (req, res) {
        console.log("ddddan cagrildi");
        res.send("salamlar");
    })
}