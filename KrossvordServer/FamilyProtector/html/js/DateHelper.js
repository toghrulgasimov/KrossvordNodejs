
let DateHelper = {

    isToday: function(someDate){
        //console.log("is time cagrildi");
        const today = new Date();
        return someDate.getDate() == today.getDate() &&
            someDate.getMonth() == today.getMonth() &&
            someDate.getFullYear() == today.getFullYear()
    },
    toDuration : function(d) {
        if(d < 60) {
            return d + " San";
        }else {
            d = IntegerUtil.divide(d, 60);
            let s = IntegerUtil.divide(d,60);
            d = d % 60;
            let ans = "";
            if(s > 0) ans = s + " Saat ";
            if(d > 0) ans += (d + " Dəq");
            return ans;
        }
    },
    isYesterday : function (d) {
        d = parseInt(d);
        let n = new Date(d);
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate()-1);

        return n.getDate() == yesterday.getDate() &&
            n.getMonth() == yesterday.getMonth() &&
            n.getFullYear() == yesterday.getFullYear();
    },
    toTime: function (d) {
        d = parseInt(d);
        let t = new Date(d);
        let h = t.getHours() + "";
        let m = t.getMinutes() + "";
        if(h.length == 1) h = '0' + h;
        if(m.length == 1) m = '0' + m;
        if(this.isToday(t)) {
            return "Bugün " + h + ":" + m;
        }
        if(this.isYesterday()) {
            return "Dünən" + h + ":" + m;
        }
        return stringUtil.toTime(d);
    }
};