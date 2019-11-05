
var fs = require('fs')
var parser = require('fast-xml-parser');
var he = require('he');

function replaceAll(s, search, replacement) {

    return s.split(search).join(replacement);
}
let MIS = "65az";
let xmlData = fs.readFileSync('trprocess/'+MIS+'.xml') + "";
xmlData = replaceAll(xmlData, "rectangular-puzzle", "rectangularpuzzle")
var options = {
    attrNodeName: "a", //default is 'false'
    textNodeName : "#text",
    ignoreAttributes : false,
    ignoreNameSpace : false,
    allowBooleanAttributes : true,
    parseNodeValue : true,
    parseAttributeValue : true,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    localeRange: "", //To support non english character in tag/attribute values.
    parseTrueNumberOnly: false,
    attrValueProcessor: a => he.decode(a, {isAttributeValue: true}),//default is a=>a
    tagValueProcessor : a => he.decode(a) //default is a=>a
};

if( parser.validate(xmlData) === true) { //optional (it'll return an object in case it's not valid)
    var jsonObj = parser.parse(xmlData,options);
}

// Intermediate obj
var tObj = parser.getTraversalObj(xmlData,options);
var jsonObj = parser.convertToJson(tObj,options);

let s = JSON.stringify(jsonObj);
let w = jsonObj['crossword-compiler'].rectangularpuzzle.crossword.word;
let M = parseInt(jsonObj['crossword-compiler'].rectangularpuzzle.crossword.grid.a['@_width'])
let N = parseInt(jsonObj['crossword-compiler'].rectangularpuzzle.crossword.grid.a['@_height'])
let C = [];
for(let i = 0; i < N; i++) {
    C.push([]);
    for(let j = 0; j < M; j++) {
        C[i].push(' ');
    }

}
let len = jsonObj['crossword-compiler'].rectangularpuzzle.crossword.grid.cell.length;

for(let i = 0; i < len; i++) {
    let a = jsonObj['crossword-compiler'].rectangularpuzzle.crossword.grid.cell[i].a;
    let x = parseInt(a['@_x'])-1;
    let y = parseInt(a['@_y'])-1;
    let s = a['@_solution'];
    if(s != undefined) {
        C[y][x] = s;
    }
}
let ans = ""
for(let i = 0; i < N; i++) {
    for(let j = 0; j < M; j++) {
        ans += C[i][j];
    }
    ans += "\n";
}
console.log(ans);
let CVB = fs.readFileSync('trprocess/azalll.csv') + "";
CVB = CVB.split('\n');
let CVBD = {};
for(let i = 0; i < CVB.length; i++) {
    let t = CVB[i].split(',');
    console.log(t);
    if(t[0].length < 2) continue;
    CVBD[t[0]] = t[1].substring(0, t[1].length-1);
}
let Crossword  = (N+2) + " " + (M+2) + "\n";
for(let i = 0; i < w.length; i++) {
    let a = w[i].a;
    let x = a['@_x'] + "";
    let y = a['@_y'] + "";
    let s = "";
    if(x.indexOf('-') != -1) {
        let xx = x.split('-');
        let x1 = parseInt(xx[0]) - 1, x2 = parseInt(xx[1]) - 1;
        let yx = parseInt(y)-1;
        let soz = "";
        for(let j = x1; j <= x2; j++) {
            soz += C[yx][j];
        }
        y = parseInt(y) - 1;
        s =  y + "{" + x1 +"{1" + "{"  + soz + "{"+CVBD[soz];
    }else {
        let yy = y.split('-');
        let y1 = parseInt(yy[0]) - 1, y2 = parseInt(yy[1]) - 1;
        let xy = parseInt(x)-1;
        let soz = "";
        for(let j = y1; j <= y2; j++) {
            soz += C[j][xy];
        }
        //console.log(soz);
        x = parseInt(x) - 1;
        s =  y1 + "{" + x +"{0" + "{"  + soz + "{"+CVBD[soz];
    }
    Crossword += s + "{\n";
}

Crossword = replaceAll(Crossword, ";", ",");

console.log(Crossword);
fs.appendFile("trprocess/"+MIS, Crossword, function () {

});
//console.log(N)
