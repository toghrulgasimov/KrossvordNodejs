let fs = require('fs');
let AlphabetsU = "QWERTZUIOPÜASDFGHJKLÖÄYXCVBNMß"
let AlphabetsL = AlphabetsU.toLowerCase();
function replace(s, a, b) {
  let ans = "";
  for(let i = 0; i < s.length; i++) {
    if(s.charAt(i) == a) ans += b;
    else ans += s.charAt(i);
  }
  return ans;
}
function begin(str) {
  for(let i = 0; i < str.length; i++) {
    let j = AlphabetsU.indexOf(str[i]);
    if(j != -1) {
      return str.substring(i);
    }
    j = AlphabetsL.indexOf(str[i]);
    if(j != -1) {
      return str.substring(i);
    }
  }
}
function count(s, a) {
  let ans = 0;
  for(let i = 0; i < s.length - a.length + 1; i++) {
    let p = true;
    let k = 0;
    while (k < a.length && s[i+k]== a[k]) {
      k++;
      //console.log(k)
    }
    if(k == a.length)ans++;
  }
  return ans;
}
let s = fs.readFileSync('w1.txt', "latin1") + "";
let s2 = fs.readFileSync('w2.txt', "latin1") + "";
let ar = s.split("(c) 2003 Langenscheidt KG Berlin und München");

let S = new Set();
//let ans = "";
let c = 0;
let KITAB = replace(s,"·","").toLowerCase();
console.log(ar.length);
let QQ = [];
for(let i = 0; i < ar.length; i++) {

  let ari  = begin(ar[i]);
  //console.log(ar[i])
  let w = ari;
  if(w == undefined) continue;
  w = replace(w,"·","");
  w = replace(w,",","");
  w = replace(w,";","");
  w = replace(w,"1","");w = replace(w,"2","");w = replace(w,"3","");w = replace(w,"4","");w = replace(w,"5","");

  //console.log(w);
  if(AlphabetsU.indexOf(w[0]) == -1) continue;
  let space = w.indexOf(" ");
  w = w.substring(0, space)
  w = w.toUpperCase();
  if(w.length < 3 || S.has(w)) continue;
  S.add(w);
  QQ.push({w:w, cavab:ar[i]})
  //let cnt = count(KITAB, w.toLowerCase());
  //console.log(w + " " + cnt);
  //console.log(S.size)

  //ans = ans + c + "^^^^" + w + "^^^^" + "SALAM" + "^^^^" + "12" + "^^^^";

  //console.log(w);
}
//fs.writeFileSync("doneinternet2", ans, "UTF-8");

let TEXT = [];
let B = 300;
let D = {};
for(let i = 0; i < B; i++) {
  let x = KITAB.substring(i*(KITAB.length / B), i*(KITAB.length / B) + (KITAB.length / B));
  //TEXT.push(x);
  let TT = require('./suffixtree');
  let T = new TT.SuffixTree();
  console.log("begin add");
  T.addString(x);
  T.build()
  console.log("end add")

  for(let j = 0; j < QQ.length; j++) {
    let x = QQ[j].w;
    let cavab = QQ[j].cavab;

    let cnt = T.count(x.toLowerCase());
    if(D[x] == undefined) {
      D[x] = 0;
    }
    D[x] += cnt;
  }
}



let list = [];
for(let i = 0; i < QQ.length; i++) {
  //console.log(x + ": " + D[x]);
  let x = QQ[i].w;
  let cavab = QQ[i].cavab;
  list.push({w : x, cavab:cavab, cnt : D[x]});
}
//list.sort(function(a, b){let x = parseInt(a.cnt);let y = parseInt(b.cnt);return y - x;});
let ans = "";
for(let i = 0; i < list.length; i++) {
  //console.log(list[i].w + " " + list[i].cnt);
  ans = ans + c + "^^^^" + list[i].w + "^^^^" + list[i].cavab + "^^^^" + list[i].cnt + "^^^^";
}
fs.appendFileSync("doneinternet2", ans, "UTF-8");
















////////////////////
ar = s2.split("(c) 2003 Langenscheidt KG Berlin und München");

//let ans = "";
c = 0;
KITAB = replace(s2,"·","").toLowerCase();
console.log(ar.length);
QQ = [];
for(let i = 0; i < ar.length; i++) {

  let ari  = begin(ar[i]);
  //console.log(ar[i])
  let w = ari;
  if(w == undefined) continue;
  w = replace(w,"·","");
  w = replace(w,",","");
  w = replace(w,";","");
  w = replace(w,"1","");w = replace(w,"2","");w = replace(w,"3","");w = replace(w,"4","");w = replace(w,"5","");

  //console.log(w);
  if(AlphabetsU.indexOf(w[0]) == -1) continue;
  let space = w.indexOf(" ");
  w = w.substring(0, space)
  w = w.toUpperCase();
  if(w.length < 3 || S.has(w)) continue;
  S.add(w);
  QQ.push({w:w, cavab:ar[i]})
  //let cnt = count(KITAB, w.toLowerCase());
  //console.log(w + " " + cnt);
  //console.log(S.size)

  //ans = ans + c + "^^^^" + w + "^^^^" + "SALAM" + "^^^^" + "12" + "^^^^";

  //console.log(w);
}
//fs.writeFileSync("doneinternet2", ans, "UTF-8");

B = 300;
D = {};
for(let i = 0; i < B; i++) {
  let x = KITAB.substring(i*(KITAB.length / B), i*(KITAB.length / B) + (KITAB.length / B));
  //TEXT.push(x);
  let TT = require('./suffixtree');
  let T = new TT.SuffixTree();
  console.log("begin add");
  T.addString(x);
  T.build()
  console.log("end add")

  for(let j = 0; j < QQ.length; j++) {
    let x = QQ[j].w;
    let cavab = QQ[j].cavab;

    let cnt = T.count(x.toLowerCase());
    if(D[x] == undefined) {
      D[x] = 0;
    }
    D[x] += cnt;
  }
}



list = [];
for(let i = 0; i < QQ.length; i++) {
  //console.log(x + ": " + D[x]);
  let x = QQ[i].w;
  let cavab = QQ[i].cavab;
  list.push({w : x, cavab:cavab, cnt : D[x]});
}
//list.sort(function(a, b){let x = parseInt(a.cnt);let y = parseInt(b.cnt);return y - x;});
ans = "";
for(let i = 0; i < list.length; i++) {
  //console.log(list[i].w + " " + list[i].cnt);
  ans = ans + c + "^^^^" + list[i].w + "^^^^" + list[i].cavab + "^^^^" + list[i].cnt + "^^^^";
}
fs.appendFileSync("doneinternet2", ans, "UTF-8");
