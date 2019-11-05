function replace(s, a, b) {
  let ans = "";
  for(let i = 0 ; i < s.length; i++) {
    if(s[i] == a) {
      ans += b;
    }else {
      ans += s[i];
    }
  }
  return ans;
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toGPS() {
    let lon = -180 + (this.x * 360 / 1000);
    let lat = 90 - (this.y * 180 / 1000);
    return new GEOPoint(lon, lat);
  }
  toVector() {
    return new Vector([this.x, this.y]);
  }
  static dist(p1, p2) {
    return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y));
  }

}


 class Line {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.a = p2.y - p1.y;
    this.b = p1.x - p2.x;
    this.c = p1.y*p2.x-p1.x*p2.y;
    // y = kx + m from ax + by + c = 0 y = (-ax-c) / b;
    this.k = -this.a / this.b;
    this.m = -this.c / this.b;
  }
  static constrpoint(x1, y1, x2, y2) {
    let p1 = new Point(x1, y1);
    let p2 = new Point(x2, y2);
    return new Line(p1, p2);
  }
  static areParalel(l1, l2) {
    return Math.abs(l1.k - l2.k) < Number.EPSILON;
  }
  static areSame(l1, l2) {
    return areParalel(l1, l2) && Math.abs(l1.m - l2.m) < Number.EPSILON;
  }
  len() {
    return Math.sqrt((this.p1.x - this.p2.x) * (this.p1.x - this.p2.x) + (this.p1.y - this.p2.y) * (this.p1.y - this.p2.y));
  }
  static distp(l,p) {
    let d = (l.a * l.a + l.b * l.b);
    if(d == 0) d += 1e-6;
    let x = (l.b * (l.b * p.x - l.a * p.y) - l.a * l.c) / d;
    let y = (l.a * (-l.b * p.x - l.a * p.y) - l.b * l.c) / d;
    let c = new Point(x, y);
    // bug
    if (this.between(l.p1.x, l.p2.x, c.x) && this.between(l.p1.y, l.p2.y, c.y)) {
      return {
        ans: true,
        p: c,
        len: new Line(c, p).len()
      }
    } else {
      return {
        ans: false,
        p: c,
        len: Math.min(new Line(l.p1, p).len(), new Line(l.p2, p).len())
      }
    }
  }
  setX(x) {
    //this = new Point(x,this.y);
  }
  setY(y) {
    //this = new Point(this.x,y);
  }
  distl(l) {
    let ans = Number.MAX_VALUE;
  }

  static intersect(l1, l2) {
    if (this.areParalel(l1, l2)) return null;

    //p.x = (l2.m - l1.m) / (l1.k - l2.k);
    //p.y = l1.k * p.x + l1.m;
    let d = l1.a*l2.b-l1.b*l2.a;
    if(Math.abs(d)<= Number.EPSILON) {
      return null;
    }
    let dx = -l1.c*l2.b+l1.b*l2.c;
    let dy = -l2.c*l1.a+l2.a*l1.c;
    let p = new Point(dx/d, dy/d);
    if (this.between(l1.p1.x, l1.p2.x, p.x) && this.between(l1.p1.y, l1.p2.y, p.y)&&
      this.between(l2.p1.x, l2.p2.x, p.x) && this.between(l2.p1.y, l2.p2.y, p.y)) {
      return p;
    }
    return null;
  }
  static between(a, b, c) {
    return Math.min(a, b) <= c + Number.EPSILON && c <= Math.max(a, b) + Number.EPSILON;
  }
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});





//let l1 = Line.constrpoint(0,4,4,4), l2 = Line.constrpoint(4,3,9,3);
//console.log(Line.intersect(l1,l2));





let N = 20, M = 20;
let D = [], I = [], Z=[], Y =[];
function check(x, y) {return !(x<0) && !(x>=N) && !(y<0) && !(y>=M)}
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
function Random(l, r) {
  let f = Math.floor(l + ((r-l) * Math.random()))
  return f;
}
function randompos(x, y) {
  a = Random(0,x)
  b = Random(0,y)
  return {a,b}
}
function qonsusuaxir(x,y) {
  if(check(x-1,y) && Z[x-1][y]=='a')return true;
  if(check(x+1,y) && Z[x+1][y]=='a')return true;
  if(check(x,y-1) && Z[x][y-1]=='a')return true;
  if(check(x,y+1) && Z[x][y+1]=='a')return true;
}
function qonsuevvel(x,y) {
  if(check(x-1,y) && Z[x-1][y]=='e')return true;
  if(check(x+1,y) && Z[x+1][y]=='e')return true;
  if(check(x,y-1) && Z[x][y-1]=='e')return true;
  if(check(x,y+1) && Z[x][y+1]=='e')return true;
}

function qonsusaga(x,y) {
  if(check(x-1,y) && I[x-1][y]=='s')return true;
  if(check(x+1,y) && I[x+1][y]=='s')return true;
  if(check(x,y-1) && I[x][y-1]=='s')return true;
  if(check(x,y+1) && I[x][y+1]=='s')return true;
}
function qonsuasagi(x,y) {
  if(check(x-1,y) && I[x-1][y]=='a')return true;
  if(check(x+1,y) && I[x+1][y]=='a')return true;
  if(check(x,y-1) && I[x][y-1]=='a')return true;
  if(check(x,y+1) && I[x][y+1]=='a')return true;
}

function qonsudolu(x,y) {
  if(check(x-1,y) && D[x-1][y]!='-')return true;
  if(check(x+1,y) && D[x+1][y]!='-')return true;
  if(check(x,y-1) && D[x][y-1]!='-')return true;
  if(check(x,y+1) && D[x][y+1]!='-')return true;
}

function qonsuistiqamet(x,y, dx) {
  let o;
  if(dx == 1) o = 'a';
  else o = 's';
  if(check(x-1,y) && I[x-1][y]==o)return true;
  if(check(x+1,y) && I[x+1][y]==o)return true;
  if(check(x,y-1) && I[x][y-1]==o)return true;
  if(check(x,y+1) && I[x][y+1]==o)return true;
}

function qonsukesismir(x,y, a, b, c, d) {
  let l1 = Line.constrpoint(a,b,c,d);
  if(check(x-1,y) && D[x-1][y]!='-') {
    let l2 = Line.constrpoint(Yaddas[x-1][y].x,Yaddas[x-1][y].y,Yaddas[x-1][y].X,Yaddas[x-1][y].Y);
    if(Line.intersect(l1,l2) == null || Line.areParalel(l1,l2)) return true;
  }
  if(check(x+1,y) && D[x+1][y]!='-') {
    let l2 = Line.constrpoint(Yaddas[x+1][y].x,Yaddas[x+1][y].y,Yaddas[x+1][y].X,Yaddas[x+1][y].Y);
    if(Line.intersect(l1,l2) == null||Line.areParalel(l1,l2)) return true;
  }
  if(check(x,y-1) && D[x][y-1]!='-') {
    let l2 = Line.constrpoint(Yaddas[x][y-1].x,Yaddas[x][y-1].y,Yaddas[x][y-1].X,Yaddas[x][y-1].Y);
    if(Line.intersect(l1,l2) == null||Line.areParalel(l1,l2)) return true;
  }
  if(check(x,y+1) && D[x][y+1]!='-') {
    let l2 = Line.constrpoint(Yaddas[x][y+1].x,Yaddas[x][y+1].y,Yaddas[x][y+1].X,Yaddas[x][y+1].Y);
    if(Line.intersect(l1,l2) == null||Line.areParalel(l1,l2)) return true;
  }
}
function qonsusuvarf(x,y) {
  if(check(x-1,y) && D[x-1][y]!='-')return true;
  if(check(x+1,y) && D[x+1][y]!='-')return true;
  if(check(x,y-1) && D[x][y-1]!='-')return true;
  if(check(x,y+1) && D[x][y+1]!='-')return true;
}

var fs = require('fs');
  fs.readFile('doneinternet2', function(err, data) {
    data = data + "";
    let ar = data.split("^^^^");
    let T = [];
    for(let i = 0; i < ar.length; i += 4){
      if(ar[i + 3] == undefined)break;
      if(ar[i+2].indexOf("f.is.") ==-1 && ar[i+1].indexOf("-") == -1)
      T.push([ar[i], ar[i+1],ar[i+2],ar[i+3]]);
    }
    //read from book
    let kitab = "";
    for(let i = 1; i <= 208; i++) {
    	let s = (fs.readFileSync('az2cisni/page'+i+'.xhtml')+"");
    	s = replace(s, "İ", "I");
        kitab += s.toUpperCase();
        //console.log(kitab.length);
    }
    //kitab = (fs.readFileSync("dinikitab") + "").toUpperCase();
    
    console.log(kitab.length);
    let STT = require('./suffixtree');
    let ST = new STT.SuffixTree();
    console.log("begin add");
    //ST.addString(kitab);
//    ST.build()
//    console.log("end add" + "---" + ST.count("İ"));
//    for(let i = 0; i < T.length; i++) {
//    	let s = replace(T[i][1], "İ", "I");
//    	//console.log(T[i][1]);
//    	T[i][3] += ST.count(s);
//    	if(s.endsWith("MAQ") || s.endsWith("MƏK")){
//    		s = s.substring(0, s.length-3);
//    		T[i][3] += ST.count(s);
//        	
//    	}
//    	if(s.endsWith("Q")) {
//    		s = s.substring(0, s.length-1)+"Ğ";
//    		T[i][3] += ST.count(s);
//    	}else if(s.endsWith("K")) {
//    		s = s.substring(0, s.length-1)+"Y";
//    		T[i][3] += ST.count(s);
//    	}
//    	
//    }
    //read book end.
     T.sort(function(a, b){
       let x = parseInt(a[3]);let y = parseInt(b[3]);
       //return b[1].length-a[1].length;
       return y - x;
     }
   );

    let Coxluq = new Set();
    D = [];  I = [], Z=[], Yaddas = [];
    for(let i = 0; i < N; i++)
    for(let j=0; j < M; j++){
      Z.push([]);
      I.push([]);
      D.push([]);
      Yaddas.push([]);
      Yaddas[i].push(1);
      D[i].push('-');
      Z[i].push('h');// h, a, e, 2, 3
      I[i].push('b'); // s, a
    }
    let BList = ["FARS","TƏRƏ","QEYR","HALA","HƏVƏ","HƏRƏKƏ","TƏSƏRRÜF","ZƏRF","REFORMASİYA","","","","","","","","","","","","","","","","","","","","","","",""];
    let old = ""
    for(let i = 1; i <= 0; i++) {
    	//console.log(i + ' yadda qaldi');
    	old = (fs.readFileSync(i + "")) + "";
    	let ar = old.split('\n');
    	for(let j = 0; j < ar.length; j++) {
    		let arr = ar[j].split('{');
    		if(arr.length > 1) {
    			//console.log(arr[3]);
    			BList.push(arr[3]);
    		}
    	}
    }
    for(let prob = 0; prob < 5; prob++) {
      //Balcklist
      let BlackSet = {};
      let CAVABLAR = [];
      for(let i = 0; i < BList.length; i++)BlackSet[(BList[i])]=1;
      let SAYLI = [[],[],[],[],[],[],[],[],[],[],[],[]];
      let SAY = [[],[],[],[0],[0],[301],[300],[500],[301],[0],[0],[0]]//300e qaldirdim ela
      for(let i = 4; i <= 11; i++) {
        let say = 0;
        for(let j = 0; j < T.length && say<=SAY[i][0]; j++) {
          if(T[j][1].length == i && BlackSet[(T[j][1])] == undefined) {
            say++;
            SAYLI[i].push(T[j]);
          }
        }
      }
      T = [];
      for(let i = 4; i <= 11; i++) {
        let say = 0;
        for(let j = 0; j < SAYLI[i].length; j++) {
          T.push(SAYLI[i][j]);
        }
      }
      shuffle(T);
      for(let i = 0; i < T.length; i++) {
        //console.log(T[i][1]);
      }

      for(let index = 0; index < T.length; index++) {
          let soz = T[index][1];

          let len = soz.length;
          //if(len < 7  )continue;
          // yer ele
          for(let k = 0; k < N; k++) {
            for(let r = 0; r < M; r++) {
              let x = k, y = r;
              let rand = Random(0,2);
              let dx = rand, dy = rand^1;
              let X = x + dx*len-1, Y = y + dy*len-1;
              if(!check(X,Y))continue;
              let p = true;
              let qonsuvar = false;
              for(let i = 0; i < len; i++) {
                let nx = x + i*dx, ny = y + i*dy;
                if(!(D[nx][ny]=='-'||D[nx][ny]==soz[i])){
                  p = false;
                }if(qonsukesismir(nx,ny,x,y,X,Y)) {
                  p = false;
                  break;
                }else if(qonsuistiqamet(nx,ny,dx)) {
                  p = false;
                  break;
                }
                if(!qonsuvar &&  qonsusuvarf(nx,ny)) {
                  qonsuvar = true;
                }
              }
              if(Coxluq.size > 0)
                p = p && qonsuvar;
              if(p) {
                if(Coxluq.has(soz) ) {
                  continue;
                }
                
                Coxluq.add(soz);
                console.log(soz + "----" + T[index][3]);
                let CAVAB = {};
                CAVAB["soz"] = soz; CAVAB["x"] = x; CAVAB["y"] = y;CAVAB["sual"] = T[index][2]; if(dx == 1)CAVAB["saga"]=0;else CAVAB["saga"]=1;
                CAVABLAR.push(CAVAB);
                for(let i = 0; i < len; i++) {
                  let nx = x + i*dx, ny = y + i*dy;
                  D[nx][ny]=soz[i];
                  Yaddas[nx][ny] = {x:x,y:y,X:X,Y:Y};
                  if(dx==1)I[nx][ny]='a';
                  else I[nx][ny]='s'
                }

              }
              //obrisini yoxla
              if(p)continue;
               dx = dx^1; dy = dy^1;
               X = x + dx*len-1; Y = y + dy*len-1;
              if(!check(X,Y))continue;
               p = true;
               qonsuvar = false;
              for(let i = 0; i < len; i++) {
                let nx = x + i*dx, ny = y + i*dy;
                if(!(D[nx][ny]=='-'||D[nx][ny]==soz[i])){
                  p = false;
                }if(qonsukesismir(nx,ny,x,y,X,Y)) {
                  p = false;
                  break;
                }else if(qonsuistiqamet(nx,ny,dx)) {
                  p = false;
                  break;
                }
                if(!qonsuvar &&  qonsusuvarf(nx,ny)) {
                  qonsuvar = true;
                }
              }
              if(Coxluq.size > 0)
                p = p && qonsuvar;
              if(p) {
                if(Coxluq.has(soz)) {
                  continue;
                }
                Coxluq.add(soz);
                console.log(soz + "----" + T[index][3]);
                let CAVAB = {};
                CAVAB["soz"] = soz; CAVAB["x"] = x; CAVAB["y"] = y;CAVAB["sual"] = T[index][2]; if(dx == 1)CAVAB["saga"]=0;else CAVAB["saga"]=1;
                CAVABLAR.push(CAVAB);

                for(let i = 0; i < len; i++) {
                  let nx = x + i*dx, ny = y + i*dy;
                  D[nx][ny]=soz[i];
                  Yaddas[nx][ny] = {x:x,y:y,X:X,Y:Y};
                  if(dx==1)I[nx][ny]='a';
                  else I[nx][ny]='s'
                }

              }


            }
          }
      }
      rl.question('What do you think of Node.js? \n', (answer) => {
        // TODO: Log the answer in a database
        if(answer=="y") {
          console.log(CAVABLAR.length);
          answer = "@\n";
          for(let uz = 0; uz < CAVABLAR.length; uz++) {
            answer += CAVABLAR[uz]["x"]+"{"+CAVABLAR[uz]["y"]+"{"+CAVABLAR[uz]["saga"]+"{"+CAVABLAR[uz]["soz"]+"{"+CAVABLAR[uz]["sual"]+"{\n"
          }
          answer += "";
          fs.appendFile('missialar.txt', answer, function (err) {
            if (err) throw err;
            console.log('Saved!');
          });
        }

        rl.close();
      });
    }
    for(let i = 0; i < N; i++) {
      let ans = "";
      for(let j = 0; j < M; j++) {
        ans += D[i][j] + " ";
      }
      console.log(ans);
    }
    console.log(Coxluq)

  });
