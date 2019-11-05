let fs = require('fs');
var request = require('sync-request');

let s = fs.readFileSync('logyarish')+"";
let a = s.split('\n');

let D = {};
let lastt = {};
for(let i = 0; i < a.length; i++) {

	let kk = a[i].split("&&");
	let t = new Date(parseInt(kk[0]));
	let timestap = parseInt(kk[0]);
	let m = t.getMonth();
	let d = t.getDate();
	let h = t.getHours();
	let mi = t.getMinutes()
	if(i == a.length-2) {
		console.log(d);
	}
	if(true) {
		let ind = a[i].indexOf(':');
		if(a[i][ind+1] != ':' && a[i].indexOf("Qeydiyyat") == -1 && a[i].indexOf("XXXXXXXXXXX") == -1 && a[i].indexOf("newmissia") == -1) {
			let b = a[i].indexOf("&&") + 2;
			let c = a[i].indexOf(":");
			let ad = a[i].substring(b,c);
			let asd = a[i].substring(ind+2);
			let ind2 = asd.indexOf(' ');
			let ans = asd.substring(0,ind2);
			ans = parseInt(ans);

			if(true) {
				if(D[ad] == undefined) D[ad]=1;
				else {D[ad] = D[ad] + 1;
					lastt[ad] = timestap;
					//console.log(timestap);
				}
			}

		}
	}
}
let ar = [];
for(let x in D) {
	//console.log(x + " " + D[x])
	console.log(x);
	let res = request('GET', 'http://35.231.39.26/region?name='+encodeURI(x));
	let s = res.getBody() + "";
	try {
		let o = JSON.parse(s);
		ar.push({a:x,b:parseInt(D[x]), c : lastt[x], r : o.reg});
	}catch (e) {

	}

}

function compare(a,b) {
	if(a.b==b.b) {
		if (a.c < b.c)
		    return -1;
		  if (a.c > b.c)
		    return 1;
		  return 0;
	}else {
		if (a.b < b.b)
		    return 1;
		  if (a.b > b.b)
		    return -1;
		  return 0;
	}

	}

	ar.sort(compare);

for(let i = 0; i < ar.length; i++) {
	console.log("' "+i+"."+ar[i].a + " " + ar[i].b + " Xal"+"\\n"+"'+");
}

//s = fs.readFileSync('score', "UTF-8")+"";
//ar = s.split("\n");
ans = ""
for(let i = 0; i < ar.length; i++) {
	ans += "' "+(i-10)+"."+ar[i].a+"("+ar[i].r+")" + " " + ar[i].b + " Xal"+"\\n"+"'+"+"\n"
}
fs.writeFileSync("ans", ans);
