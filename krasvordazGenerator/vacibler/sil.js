let fs = require('fs')

let s = fs.readFileSync('missialar.txt') + "";

let a = s.split('\n');
let ans = "80 80\n"
for(let i = 1; i < a.length-1; i++) {
	let ar = a[i].split('{');
	let x = parseInt(ar[0]), y = parseInt([ar[1]])
	x += 20;
	y += 20;
	ans += (x + "{"+y + "{"+ar[2]+ "{"+ar[3]+ "{"+ar[4]+ "{"+ar[5])+'\n';
}
fs.writeFileSync('sil', ans)
console.log(ans)