var request = require('sync-request');
var fs = require('fs')






for(let i = 1; i <= 12; i++) {
    for(let j = 1; j <= 31; j++) {
        let x = (i<10) ? ("0"+i) : (""+i);
        let y = (j<10) ? ("0"+j) : (""+j);

        //x = "12";
        //y = "02";
        try {
            var res = request('GET', 'https://www.haberturk.com/bulmaca/gunluk/2019/'+x+'/'+y);
            res = res.getBody()+"";
            let ind = res.indexOf('data: [{"clue"');
            if(ind != -1) {
                let end = res.indexOf("\n", ind);
                res = res.substring(ind, end);
                res = '"data": ' + res.substring(5);
                fs.appendFileSync('html2/test.txt', res + "\n");
            }
        }catch (e) {
            console.log("c " + x + " " + y);
        }

    }
}
console.log();
