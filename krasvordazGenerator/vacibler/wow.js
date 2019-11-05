let fs = require('fs')
let s = fs.readFileSync("doneinternet2") + "";
let ar = s.split("^^^^");
let T = [];
for(let i = 0; i < ar.length; i += 4){
  if(ar[i + 3] == undefined)break;
  if(ar[i+2].indexOf("f.is.") ==-1 && ar[i+1].indexOf("-") == -1)
  T.push([ar[i], ar[i+1],ar[i+2],ar[i+3]]);
}
console.log(T.length);
let S = new Set();
for(let i = 0; i < T.length;i++) {
	S.add(T[i][1]);
}


let w = fs.readFileSync("wowaze25den.txt") + "";
let wow = w.split('\n');
for(let i = 0; i < wow.length; i++) {
	wow[i] = wow[i].substring(0,wow[i].length-1);
}

console.log(T[0][1].length);

function p(string) {
	  let results = [];

	  if (string.length === 1) {
	    results.push(string);
	    return results;
	  }

	  for (let i = 0; i < string.length; i++) {
	    let firstChar = string[i];
	    let charsLeft = string.substring(0, i) + string.substring(i + 1);
	    let innerPermutations = p(charsLeft);
	    for (let j = 0; j < innerPermutations.length; j++) {
	      results.push(firstChar + innerPermutations[j]);
	    }
	  }
	  return results;
	}

function all(s) {
	let n = s.length;
	let SSS = new Set();
	for(let i = 1; i < (1<<n); i++) {
		let ans = "";
		for(let j = 0; j < n; j++) {
			if((i&(1<<j)) != 0) ans += s[j];
			//console.log(ans)
		}
		if(ans.length>2)
			SSS.add(ans);
	}
	let aa = Array.from(SSS);
	return aa;
}

for(let k = 0; k < wow.length; k++) {
	let aa = p(wow[k]);
	//let aa = p("SABAHI");
	let SS = new Set(aa);
	aa = Array.from(SS);
	let ANS = new Set();
	for(let i = 0; i < aa.length; i++) {
		let b = all(aa[i]);
		for(let j = 0; j < b.length; j++) {
			ANS.add(b[j])
		}
	}
	let cavab = wow[k];
	for(let x of ANS) {
		if(S.has(x)) {
			cavab += "|"+x;
		}
	}
	cavab +='\n';
	if(cavab.length<3)continue;
	fs.appendFile('wowcavab', cavab, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
}
