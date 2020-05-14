var stringUtil = {
    toTime: function(d) {
        d = parseInt(d);
        //console.log("TOTIME cagrildi --------------");
        var ans = new Date(d).toLocaleString();

        var t = ans.substring(0,ans.length-3);
        ans = t;
        if(ans.split(":").length == 3) {
            ans = ans.substring(0, ans.length-3);
        }
        return ans;
    },
    isToday: function(someDate){
        //console.log("is time cagrildi");
        var today = new Date();
        return someDate.getDate() == today.getDate() &&
            someDate.getMonth() == today.getMonth() &&
            someDate.getFullYear() == today.getFullYear()
    },
    replaceDot: function(s) {
        return s.split(".").join("");
    }
}