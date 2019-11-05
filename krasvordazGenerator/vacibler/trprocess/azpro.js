var fs = require('fs');
//6-ci qalib
let ANS = "";
let S = fs.readFileSync('65az') + "";
let ans = "";
S = S.split('\n');
for(let i = 0; i < S.length; i++) {
    let t = S[i].split('{');
    ans += t[3] + "----" + t[4] + ".\n";
}
fs.writeFileSync("sil", ans);
