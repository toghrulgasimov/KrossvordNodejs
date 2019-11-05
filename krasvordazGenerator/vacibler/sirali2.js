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








let N = 30, M = 30;
let D = [], I = [], Z=[], Y =[];
function check(x, y) {return !(x<0) && !(x>=N) && !(y<0) && !(y>=M)}
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        //if(a[i].length != a[j].length) continue;
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
    if(check(x-1,y) && I[x-1][y].indexOf(o) != -1)return true;
    if(check(x+1,y) && I[x+1][y].indexOf(o) != -1)return true;
    if(check(x,y-1) && I[x][y-1].indexOf(o) != -1)return true;
    if(check(x,y+1) && I[x][y+1].indexOf(o) != -1)return true;
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
    return false;
}

let CAVABLAR = [];
let Coxluq;
function yoxla(soz, cvb, x, y, dx, dy) {
    let len = soz.length;
    let X = x + dx*len-1, Y = y + dy*len-1;
    // ne sonuncunun nede evvelincinin yanindan kecmek olmaz
    if(!check(X,Y)) return false;
    let p = true;
    let qonsuvar = true;
    let kesisen = 0;
    for(let i = 0; i < len; i++) {
        let nx = x + i*dx, ny = y + i*dy;
        if(!(D[nx][ny]=='-'||D[nx][ny]==soz[i])){
            if(soz == "TESERRÜFAT") {
                //console.log("dang--------------------------")
            }
            p = false;
            break;
        }
        if(D[nx][ny]!='-') kesisen++;
        if(qonsukesismir(nx,ny,x,y,X,Y) && qonsuistiqamet(nx,ny,dy)) {
            p = false;
            break;
        }
        if(qonsuistiqamet(nx,ny,dx)) {
            p = false;
            break;
        }
    }

    if(Coxluq.size > 0) {
        if(kesisen == 0 && Math.random() <= 2) return false;
        p = p && qonsuvar;
    }
    if(p) {
        //console.log(soz + " " + dx + " " + dy)
        if(Coxluq.has(soz) ) {
            return false
        }

        Coxluq.add(soz);
        //console.log(soz);
        let CAVAB = {};
        CAVAB["soz"] = soz; CAVAB["x"] = x; CAVAB["y"] = y;CAVAB["sual"] = cvb; if(dx == 1)CAVAB["saga"]=0;else CAVAB["saga"]=1;
        CAVABLAR.push(CAVAB);
        for(let i = 0; i < len; i++) {
            let nx = x + i*dx, ny = y + i*dy;
            D[nx][ny]=soz[i];
            Yaddas[nx][ny] = {x:x,y:y,X:X,Y:Y};
            if(dx==1)I[nx][ny]+='a';
            else I[nx][ny]+='s'
        }
        return true;
    }else {

        return false;
    }
}

var fs = require('fs');


let T = [];

let data = fs.readFileSync('sirali2file') + "";
data = data.split('\n');
for(let i = 0; i < data.length; i++) {
    let s = data[i].split('|');
    if(s[0].length < 3) continue;
    T.push(["", s[0], s[1], ""]);
}
T.sort(function(a, b){
    let x = parseInt(a[1].length);let y = parseInt(b[1].length);
    return b[1].length-a[1].length;
    return y - x;
});

for(let TEST = 0; TEST < 100; TEST++) {
    Coxluq = new Set();
    CAVABLAR = [];
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
            I[i].push(''); // s, a
        }

    for(let prob = 0; prob < 10; prob++) {
        //CAVABLAR = [];
        shuffle(T)


        for(let index = 0; index < T.length-1; index++) {
            let soz = T[index][1];
            let cvb = T[index][2];
            let p;
            for(let k = 0; k < N; k++) {
                for(let r = 0; r < M; r++) {
                    let x = k, y = r;
                    let rand = Random(0,2);
                    let dx = rand, dy = rand^1;
                    //dx = 0; dy = 1;
                    //obrisini yoxla
                    p = yoxla(soz, cvb, x, y, dx, dy);

                    if(p)break;

                    dx = dx^1; dy = dy^1;
                    p = yoxla(soz, cvb, x, y, dx, dy);
                    if(p)break;

                }
                if(p)break;
            }

        }


    }
    let FAIZ = Coxluq.size / T.length * 100;


    for(let i = 0; i < N; i++) {
        let ans = "";
        for(let j = 0; j < M; j++) {
            ans += D[i][j] + " ";
        }
        console.log(ans);
    }
    console.log(Coxluq)
    console.log(FAIZ)
    if(FAIZ > 95) {
        answer = N + " " + M + "\n";
        for(let uz = 0; uz < CAVABLAR.length; uz++) {
            answer += CAVABLAR[uz]["x"]+"{"+CAVABLAR[uz]["y"]+"{"+CAVABLAR[uz]["saga"]+"{"+CAVABLAR[uz]["soz"]+"{"+CAVABLAR[uz]["sual"].substring(0, CAVABLAR[uz]["sual"].length-1)+"{\n"
        }
        answer += "";
        fs.writeFileSync('missialar2.txt', answer);
        break;
    }


}
