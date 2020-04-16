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
            if(DateHelper.isToday(new Date(gunluk[i].start))) {
                if(this.Mday[gunluk[i].package] == undefined) {
                    this.Mday[gunluk[i].package] = gunluk[i].duration;
                }else {
                    this.Mday[gunluk[i].package] += gunluk[i].duration;
                }
            }
        }
        for(let i in this.Mday) {
            this.todaySum += this.Mday[i];
            this.day.push({pn:i, name:this.Mname[i],sum: this.Mday[i]} );
        }
        console.log("Day----");
        console.log(this.day);

    }
    calcGun(d) {

    }
}