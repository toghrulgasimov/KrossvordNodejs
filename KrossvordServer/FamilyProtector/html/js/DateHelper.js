
var DateHelper = {

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
            return d + " "+Translation.get("second");
        }else {
            d = IntegerUtil.divide(d, 60);
            var s = IntegerUtil.divide(d,60);
            d = d % 60;
            var ans = "";
            if(s > 0) ans = s  +" " + Translation.get("hour") + " ";
            if(d > 0) ans += (d + " " + Translation.get("minute"));
            return ans;
        }
    },
    isYesterday : function (d) {
        var n = d;
        var yesterday = new Date();
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
        var t = new Date(d);
        var h = t.getHours() + "";
        var m = t.getMinutes() + "";
        if(h.length == 1) h = '0' + h;
        if(m.length == 1) m = '0' + m;
        if(this.isToday(t)) {
            return Translation.get("today")+" " + h + ":" + m;
        }
        if(this.isYesterday(t)) {
            return Translation.get("yesterday")+" " + h + ":" + m;
        }
        return stringUtil.toTime(d);
    },
    toMonth: function (d) {
        if(this.isToday(d)) {
            return Translation.get("today");
        }
        if(this.isYesterday(d)) {
            return Translation.get("yesterday");
        }
        var day = d.getDate()+"";
        var month = d.getMonth()+"";
        var year = d.getFullYear()+"";
        if(day.length == 1) day = '0' + day;
        if(month.length == 1) month = '0' + month;
        return day + "." + month + "." + year;
    },
    toUTC : function (d) {
        var s = d.getTime();
        var m = d.getTimezoneOffset();
        return s - (m * 60 * 1000);
    }
};