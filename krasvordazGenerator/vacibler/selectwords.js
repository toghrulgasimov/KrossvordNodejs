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

var fs = require('fs');

const readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//
// function lineiterator() {
//     var currLine = 0;
//     var lines = [];
//     return new Promise(function(resolve, reject) {
//
//         rl.on('line', function (line){
//             lines.push(line)
//         })
//         rl.on('close', function () {
//             resolve({
//                 next: function() {
//                     return currLine < lines.length ? lines[currLine++]: null;
//                 }
//             });
//         })
//     })
// }
function Random(l, r) {
    let f = Math.floor(l + ((r-l) * Math.random()))
    return f;
}
// const getLine = (function () {
//     const getLineGen = (async function* () {
//         for await (const line of rl) {
//             yield line;
//         }
//     })();
//     return async () => ((await getLineGen.next()).value);
// })();

async function ff() {
    let data =  fs.readFileSync('doneinternet2') + "";

    let ar = data.split("^^^^");
    let T = [];
    let S = new Set();
    for(let i = 0; i < ar.length; i += 4){
        if(ar[i + 3] == undefined)break;
        if(!S.has(ar[i+1]) && ar[i+2].indexOf("f.is.") ==-1 && ar[i+1].indexOf("-") == -1) {
            T.push([ar[i], ar[i+1],ar[i+2],ar[i+3]]);
            S.add(ar[i+1]);
        }

    }
    let kitab = "";
    for(let i = 1; i <= 208; i++) {
        let s = (fs.readFileSync('az2cisni/page'+i+'.xhtml')+"");
        s = replace(s, "İ", "I");
        kitab += s.toUpperCase();
    }

    console.log(kitab.length);
    let STT = require('./suffixtree');
    let ST = new STT.SuffixTree();

    T.sort(function(a, b){
            let x = parseInt(a[3]);let y = parseInt(b[3]);
            //return b[1].length-a[1].length;
            return y - x;
        }
    );
    let D = {};
    for(let i = 0; i < T.length; i++) {
        let l = T[i][1].length;
        if(D[l] == undefined) D[l] = [];
        else D[l].push(T[i]);
    }






    let H = "7";
    for(let i = 0; i < 1000; i++) {

        let s = fs.readFileSync('cetinlik.json') + "";
        s = JSON.parse(s);
        let cur = s[H];
        console.log(D[H][s[H]][1] + " " + D[H][s[H]][3]);

        const promise = new Promise((resolve, reject) => {
            rl.question('\n', (answer) => {
                // TODO: Log the answer in a database


                if(answer.startsWith('1')) {
                    fs.appendFileSync('sozmanual.txt', D[H][s[H]][1]+"\n");
                    //console.log(D[H][s[H]]);
                }else {

                }


                resolve();
            })
        })

        await promise;
        s[H] = s[H] + 1;
        s = JSON.stringify(s) + "";
        fs.writeFileSync('cetinlik.json', s);
    }

}



ff();

