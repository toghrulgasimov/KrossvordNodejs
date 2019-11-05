var fs = require('fs');
function Random(l, r) {
  let f = Math.ceil((r-l) * Math.random())
  return f;
}
function randompos(x, y) {
  a = Random(0,x)
  b = Random(0,y)
  return {a,b}
}
function replace(s, a, b) {
  let ans = "";
  for(let i = 0; i < s.length; i++) {
    if(s.charAt(i) == a) ans += b;
    else ans += s.charAt(i);
  }
  return ans;
}





fs.readFile('sozlerinmesqlisti', 'utf8', function(err, data) {
    a = (data+"").split("\n");

    for(let RR = 0; RR < 10000; RR++) {
      let coxluq = new Set()
      let n = 10, m = 9, KK=3;

      let D = [], I = [], AXIR = [];
      for(let i = 0; i < n; i++)
      for(let j=0; j < m; j++){
        D.push([])
        I.push([])
        AXIR.push([])

        AXIR[i][j] ='0';
        D[i][j] ='1';
        I[i][j] = '1'
      }




      for(let i = 0;  i < 1000000; i++) {
        let S = a[Random(0,a.length-1)];
        replace(S,'')
        let tapdi = false;
        let x = Random(0,n), y = Random(0,m);
        if(x < 0 || x >= n || y < 0 || y >= m)continue;
        if((x-1>=0 && D[x-1][y] == '1')&&(x+1<n && D[x+1][y] == '1')&&(y-1>0 && D[x][y-1] == '1')&&(y+1<m && D[x][y+1]=='1')) {

        }else {
          continue;
        }


        // check right down
        let pr = true, pd = true, kr=false,kd=false;
        let len = S.length;
        pr = y + len - 1 < m ? true:false;
        pd = x + len-1 < n? true:false;
        //axrincinin qonsusu yoxdu
        let X = x + len-1, Y = y;
        if(pd) {
          if(X - 1 >= 0 && D[X-1][Y] != '1')pd = false;
          if(X + 1 < n && D[X+1][Y] != '1')pd = false;
          if(Y - 1 >= 0 && D[X][Y-1] != '1')pd = false;
          if(Y + 1 < m && D[X][Y+1] != '1')pd = false;
        }
        X = x ; Y = y+ len-1;
        if(pr) {
          if(X - 1 >= 0 && D[X-1][Y] != '1')pr = false;
          if(X + 1 < n && D[X+1][Y] != '1')pr = false;
          if(Y - 1 >= 0 && D[X][Y-1] != '1')pr = false;
          if(Y + 1 < m && D[X][Y+1] != '1')pr = false;
        }
        if(pr){
          for(let index = 0; index < S.length && y+index<m; index++) {
            if(D[x][y+index]==S[index])kr=true;
            if(D[x][y+index]!='1' && D[x][y+index]!=S[index]) pr = false;

            if(x-1 >=0&&AXIR[x-1][y+index] == '1')pr = false;
            if(x+1< n && AXIR[x+1][y+index] == '1')pr = false;
            if(y+index+1<m && AXIR[x][y+index+1] == '1')pr = false;
            if(y+index-1 >=0 &&AXIR[x][y+index-1] == '1')pr = false;
            if(x - 1 >= 0 && I[x-1][y+index]=='2') pr = false;
            if(x + 1 < n && I[x+1][y+index]=='2') pr = false;
          }
        }

        if(pd) {
          for(let index = 0; index < S.length&&x+index<n; index++) {
            if(D[x+index][y]!='1' && D[x+index][y]!=S[index]) pd = false;
            if(D[x+index][y]==S[index])kd=true;

            if(x-1 >=0&&AXIR[x-1][y+index] == '1')pd = false;
            if(x+1< n && AXIR[x+1][y+index] == '1')pd = false;
            if(y+index+1<m && AXIR[x][y+index+1] == '1')pd = false;
            if(y+index-1 >=0 &&AXIR[x][y+index-1] == '1')pd = false;

            if(y - 1 >= 0 && I[x+index][y-1]=='0') pd = false;
            if(y + 1 < m && I[x+index][y+1]=='0') pd = false;
          }
        }

        if(pr == true && (kr==true||coxluq.size==0)) {
          for(let index = 0; index < S.length; index++) {
            D[x][y+index] = S[index];
            I[x][y+index] = '2';

          }
          AXIR[x][y+S.length-1] = '1'
          AXIR[x][y] = '1'
        }else if(pd == true && (kd==true||coxluq.size==0)) {
            for(let index = 0; index < S.length; index++) {
              D[x+index][y] = S[index];
              I[x+index][y] = '0';
            }
            AXIR[x+S.length-1][y] = '1'
            AXIR[x][y] = '1'
        }
        if(pr == true && (kr==true||coxluq.size==0) || (pd == true && (kd==true||coxluq.size==0))) {
          //console.log(S);
          coxluq.add(S);

        }
      }
      if(coxluq.size > KK){
        console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
        for(let i = 0; i < n; i++) {
          let ans = ""
          for(let j = 0; j < m; j++) {
            ans += D[i][j]+"";
          }
          console.log(replace(ans,'1','-'));
        }
        console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
      }

    }


});
