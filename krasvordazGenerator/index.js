
let fs = require('fs');
let HERIFLER = "qüertyuiopöğasdfghjklıəzxcvbnmçş"
let SET = {};
for(let i = 0; i < HERIFLER.length; i++) {
	SET[HERIFLER.charAt(i)] = 1;
}
function replace(data, c, a) {
	let ans = "";
	for(let i = 0; i < data.length; i++) {
		if(data.charAt(i) == c) {
		  ans += a;
		}else ans += data.charAt(i);
	}
	return ans;
}
function count(text, data) {
	data = data.toLowerCase();
	let ans = 0;
	for(let i = 1; i < text.length - data.length-1; i++) {
		if(SET[text.charAt(i-1)] != undefined) continue;
		for(let j = 0; j < data.length; j++) {
			if(text.charAt(i+j) != data.charAt(j)) break;
			if(j == data.length-1)ans++;
		}
	}
	return ans;
}

function dirnaq(data) {
	let ans = "";
	for(let i = 0; i < data.length; i++) {
		if(data.charCodeAt(i)!=769 && data.charCodeAt(i)!=9 && data.charAt(i) != '₁'&& data.charAt(i) != '₂'&& data.charAt(i) != '₃'&&
		 data.charAt(i) != '₄'&&data.charAt(i) != '₀'&&
		data.charAt(i) != '₅'&& data.charAt(i) != '₆'&& data.charAt(i) != '₇'&& data.charAt(i) != '₈'&& data.charAt(i) != '₉') ans += data.charAt(i);
	}
	return ans;
}
function moterizenisil(data) {
	let ans = "";
	let p = false;
	for(let i = 0; i < data.length; i++) {
		if(data.charAt(i) == '(') {
			p = true;
		}else if(data.charAt(i) == ')') {
			p = false;
		}else {
			if(!p) ans += data.charAt(i);
		}
	}
	let t = ans.indexOf(',');
	if(t != -1) ans = ans.substring(0,t);
	return ans;
}

fs.readFile('sozler', 'utf8', function(err, data) {
//^^^^
	data = dirnaq(data);
	//console.log(data);
	 let ar = data.split("^^^^");
	 let baza = data.toLowerCase();
	 let cavab = "";
	 let cc = 0;
	 for(let i = 0; i < ar.length-1; i += 2) {
		 ar[i] = moterizenisil(ar[i]);
		 let cnt = count(baza, ar[i]);
		 console.log(i + " " + ar[i] + " " + cnt)
		 cavab += cc + "^^^^" + ar[i] + "^^^^" + ar[i+1] + "^^^^" + cnt + "^^^^";
		 cc++;
	  }
		fs.writeFile("doneinternet2", cavab, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
	});

});
