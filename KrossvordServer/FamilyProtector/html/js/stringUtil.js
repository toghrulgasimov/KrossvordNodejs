let stringUtil = {
    toTime: function(d) {
        d = parseInt(d);
        //console.log("TOTIME cagrildi --------------");
        let ans = new Date(d).toLocaleString();

        let t = ans.substring(0,ans.length-4);
        ans = t;
        if(ans.split(":").length == 2) {
            //ans = ans.substring(0, ans.length-3);
        }
        return ans;
    },
    isToday: function(someDate){
        //console.log("is time cagrildi");
        const today = new Date();
        return someDate.getDate() == today.getDate() &&
            someDate.getMonth() == today.getMonth() &&
            someDate.getFullYear() == today.getFullYear()
    }
}