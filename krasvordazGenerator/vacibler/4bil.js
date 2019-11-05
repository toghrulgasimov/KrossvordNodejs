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
let fs = require('fs');
const cheerio = require('cheerio')
const download = require('image-downloader')

let s = fs.readFileSync("4bild.txt") + "";
let ste = fs.readFileSync("4bildtercume") + "";
const $ = cheerio.load(s)

let list2 = ste.split("\n");

let list = [];
$('.lazy').each(function(i, elem) {
  list.push({url:$(this).attr('data-src'), name:$(this).attr('alt')})

});

let ans = "";

for(let i = 0; i < list.length; i++) {
  ans +="0" +"^^^^" + list2[i].substring(0, list2[i].length-1).toUpperCase() +"^^^^" + list[i].url + "^^^^";
  console.log(list2[i].toUpperCase());
}
ans = replace(ans, "\n", "-");
//console.log(ans)
fs.writeFileSync("doneinternetbild", ans, "UTF-8");
