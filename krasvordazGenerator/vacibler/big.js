const fs = require('fs');

function replace(s, a, b) {
    let ans = "";
    for(let i = 0 ; i < s.length; i++) {
        if(s[i] == a) {
            ans += b;
        }else {
            ans += s[i];
        }
    }
    return ans;
}
async function f() {
    for(let i = 45; i <= 48; i++) {
        if(i == 43)continue;
        let s = fs.readFileSync(''+i) +"";
        s = replace(s, ',', ";");

        let t = s.split('\n');
        for(let j = 0; j < t.length; j++) {
            let f = t[j].split('{');
            if(f.length > 3) {
                //console.log(f[3]);
                let ap = f[3] + ',' + f[4] + "\n";

                await fs.appendFile('big.csv', ap, function () {
                    console.log(ap)
                })
            }
        }
    }
}
f()
