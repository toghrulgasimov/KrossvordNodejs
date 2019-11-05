
var fs = require('fs');
  fs.readFile('doneinternet2', function(err, data) {
    data = data + "";
    let ar = data.split("^^^^");
    let T = [];for(let i = 0; i < ar.length; i += 4) {if(ar[i + 3] == undefined)break;T.push([ar[i], ar[i+1],ar[i+2],ar[i+3]]);}T.sort(function(a, b){let x = parseInt(a[3]);let y = parseInt(b[3]);return y - x;});


    for(let i = 0; i < 10000; i++) {
      if(T[i][1].length== 4)
        console.log(T[i][1] + " -- " + T[i][3] + "   " + T[i][2]);
    }

  });
