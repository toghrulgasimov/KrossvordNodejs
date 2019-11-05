let s = "(1+2)*3&1&2&3&4&a$(1+3)*3&1&2&3&4&b$(1+4)*3&1&2&3&4&c!40!";
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
let fs = require('fs');
function f() {
	// suallar $ ayrilir
	//elave informasiyalr ! ile ayrilir
	//test informasiyasi & ayrilir
	let ans = "";
	let sual = "";
	let len = 20;
	for(let i = 0; i < len; i++) {
		// generate question and calc answer
		let t = getRandom(0, 3);
		let cvb;
		if(t == 0) {//toplama
			let x = getRandom(1, 50), y = getRandom(1, 50);
			cvb = x + y;
			ans = x + " + " + y +" = ?";
		}else if(t == 1){//cixma
			let x = getRandom(1, 50), y = getRandom(1, 50);
			cvb = x - y;
			ans = x + " - " + y +" = ?";
			if(cvb < 0) {
				i--;
				continue;
			}
		}else if(t == 2){//vurma
			let x = getRandom(1, 20), y = getRandom(1, 20);
			cvb = x * y;
			ans = x + " x " + y +" = ?";
		}else {//bolme
			let x = getRandom(1, 13);
			cvb = getRandom(1, 13);
			let y = cvb * x;
			ans = y + " / " + x +" = ?";
		}
		let S = new Set();
		S.add(cvb);
		while(true) {
			let a = Math.ceil(cvb * Math.random())
			S.add(a);
			if(S.size>= 4) break; 
			let b = Math.ceil(cvb + 4 * Math.random());
			S.add(b);
			if(S.size>= 4) break;
			let c = Math.ceil(cvb - 4 * Math.random());
			S.add(c);
			if(S.size>= 4) break;
		}
		let array = Array.from(S);
		array = shuffle(array);
		let st = ['a','b','c', 'd'];
		let variant;
		for(let j = 0; j < 4; j++) {
			if(cvb == array[j]) {
				variant = st[j];
				break;
			}
		}
		//console.log(ans)
		//console.log(array);
		//console.log(variant);
		sual += ans;
		for(let j = 0;j < 4; j++) {
			sual += "&" + array[j];
		}
		sual += "&" + variant;
		if(i != len-1) sual += "$";
	}
	sual += "!"+"40!";
	return sual;
}
f();
for(let i = 0; i < 1000; i++) {
	fs.appendFile('mathgames',f()+"\n", function (err) {
        //if (err){ if(db != null)db.close(); return;}
      });
}
exports.f = f;