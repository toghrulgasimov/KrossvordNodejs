
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
            if(d == 0) d = 1;
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
        let n = d;
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate()-1);
        console.log('--------- isYesterday Begin');
        console.log(yesterday);
        console.log(n);
        console.log('--------- isYesterday End');
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
        if(this.isYesterday(t)) {
            return "Dünən " + h + ":" + m;
        }
        return stringUtil.toTime(d);
    },
    toMonth: function (d) {
        if(this.isToday(d)) {
            return "Bugün";
        }
        if(this.isYesterday(d)) {
            return "Dünən";
        }
        let day = d.getDate()+"";
        let month = d.getMonth()+"";
        let year = d.getFullYear()+"";
        if(day.length == 1) day = '0' + day;
        if(month.length == 1) month = '0' + month;
        return day + "." + month + "." + year;
    },
    toUTC : function (d) {
        let s = d.getTime();
        let m = d.getTimezoneOffset();
        return s - (m * 60 * 1000);
    }
};