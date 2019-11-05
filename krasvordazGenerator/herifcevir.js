function replace(data, c, a) {
	let ans = "";
	for(let i = 0; i < data.length; i++) {
		if(data.charAt(i) == c) {
		  ans += a;
		}else ans += data.charAt(i);
	}
	return ans;
}

var fs = require('fs');

fs.readFile('l', 'utf8', function(err, l) {
  let h = l.split("\n");
	let d = {};
  for(let i = 0; i < h.length; i++) {
    let s1 = h[i], s2 = h[i].toUpperCase();
		//d[s1.charAt(0)] = s1.charAt(1);
		d[s1.charAt(1)] = s1.charAt(0);
		d[s2.charAt(1)] = s2.charAt(0);
  }
	d['ß'] = 'Ə';
  fs.readFile('azdilininizahlilugeti.txt', 'utf8', function(err, data) {
		let ans = "";
		for(let i = 0; i < data.length; i++) {
			if(d[data.charAt(i)] != undefined) ans += d[data.charAt(i)];
			else ans += data.charAt(i);
		}
		fs.writeFile("azdilininizahlilugeticevir.txt", ans, function(err) {
		    if(err) {
		        return console.log(err);
		    }

		    console.log("The file was saved!");
		});
  });
});
