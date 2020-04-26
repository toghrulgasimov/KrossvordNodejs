class ActivityHelper {
    constructor() {
        this.todaySum = 0;
        this.weekSum = 0;
        this.day = [];
        this.week = [];
        this.month = [];
        this.Mday = {};
        this.Mname = {};
    }
    init(gunluk) {

        for(let i = 0; i < gunluk.length; i++) {
            this.Mname[gunluk[i].package] = gunluk[i].name;
            if(this.Mday[gunluk[i].package] == undefined) {
                this.Mday[gunluk[i].package] = gunluk[i].duration;
            }else {
                this.Mday[gunluk[i].package] += gunluk[i].duration;
            }
        }
        for(let i in this.Mday) {
            this.todaySum += this.Mday[i];
            this.day.push({pn:i, name:this.Mname[i],sum: this.Mday[i]} );
        }
        this.day.sort(function (a, b) {
            return b.sum - a.sum;
        })
        console.log("Day----" + DateHelper.toDuration(this.todaySum));
        for(let i = 0; i < this.day.length; i++) {
            console.log(this.day[i].name + "-" + DateHelper.toDuration(this.day[i].sum));
        }

    }
    calcGun(d) {

    }
}