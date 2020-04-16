
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
            return d + " Dəq";
        }
    }
};