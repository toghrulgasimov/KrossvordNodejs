const  fs = require('fs');
function unicodeToChar(text) {
    return text.replace(/\\u[\dA-F]{4}/gi,
        function (match) {
            return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
        });
}
let s = fs.readFileSync('html2/test.txt') + "";
s = unicodeToChar(s);
//console.log(s);
s = s.split("\n");
let ans = "";
for(let i= 0; i < s.length; i++) {
    if(s[i].charAt(s[i].length-1) == ',') {
        //console.log("Asdasdasd")
        s[i] = s[i].substring(0, s[i].length-1);
    }
    let t = '{' + s[i] + '}';
    if(i != s.length-1) t = t + ",";
    ans += t;
}
ans = '{"d":[' +ans+ ']}'



//s = '[' + s[0] + ']'
// /console.log(s)
//s = '{"data":[{"data":[1,2,3,4]}]}'
s = JSON.parse(ans)

console.log(s)
s = s.d;
let ANS = "";

let D = {};
let ss = new Set();
let ANScsv = "";
for(let i = 0; i < s.length; i++) {
    if(s[i].data == undefined)continue;
    for(let j = 0; j < s[i].data.length; j++) {
        let a = s[i].data[j].answer.length;
        if(a == 2 || a == 3) continue;
        if(D[a] != undefined) D[a] = D[a] + 1;
        else D[a] = 1;
        let answ = s[i].data[j].answer;
        let clue = s[i].data[j].clue;
        if(!ss.has(answ+clue)) {
            ss.add(answ+clue);
            ANScsv += (answ+"|"+clue + "\n");
        }
    }
}
fs.appendFileSync('ans.csv', ANScsv);
console.log(D)
console.log(ss.size)

// hamisini yigdim bir csv ya sadece duzeldib atiram servere
