let c = require('./elo.js')

let E = new c.ELOMatch()

E.addPlayer("asd", 1, 3400);
E.addPlayer("asd1", 2, 344);
for(let i = 0; i < 2000; i++) {
	E.addPlayer("asd", i + 12, 140*i);
}

E.calculateELOs();

function compare(a,b) {
	  if(a.score> b.score) {
		  return -1;
	  }else if(a.score < b.score) {
		  return 1;
	  }else if(a.lasttime < b.lasttime) {
		  return -1;
	  }else {
		  return 1;
	  }
	}
let A = [];
A.push({score:12, lasttime:123});
A.push({score:10, lasttime:123});
A.push({score:11, lasttime:123});
A.push({score:14, lasttime:123});

A.push({score:11, lasttime:12});
A.sort(compare);
console.log(A);