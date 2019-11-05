let fs = require('fs');

let s = fs.readFileSync('aa.xml') + ""
console.log(s)
s = s.split('\n');
let ans = "";
for(let i = 0; i < s.length; i++) {
    let t = s[i].split('{');
    console.log(t[3] + "---" + t[4])
    ans += t[3] + "|" + t[4] + "\n";
}
fs.writeFileSync('dinikitab', ans+"");
console.log('done!');
