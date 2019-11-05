const express = require('express')
const app = express()
var http = require('http')
var https = require('https')

let fs = require('fs')




var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
function replace(s, a, b) {
  let ans = "";
  for(let i = 0; i < s.length; i++) {
    if(s[i] == a) ans += b;
    else ans += s[i];
  }
  return ans;
}
function rat(a) {
	if(a == undefined)  return "";
	a = parseInt(a+"");
	if(a<650) {
		return "⋆";
	}else if(650<=a && a<700) {
		return "⋆⋆";
	}else if(700<=a && a<750) {
		return "⋆⋆⋆";
	}else if(750<=a && a<800) {
		return "≛";
	}else if(800<=a && a<850) {
		return "≛≛";
	}else if(850<=a && a<1000) {
		return "≛≛≛";
	}else if(1000<=a && a<1050) {
		return "✧";
	}else if(1050<=a && a<1100) {
		return "✧✧";
	}else if(1100<=a && a<1200) {
		return "✧✧✧";
	}else if(1200<=a && a<1250) {
		return "✰";
	}else if(1250<=a && a<1300) {
		return "✰✰";
	}else if(1300<=a && a<1400) {
		return "✰✰✰";
	}else if(1400<=a && a<1500) {
		return "✫";
	}else if(1500<=a && a<1600) {
		return "✫✫";
	}else if(1600<=a && a<1700) {
		return "✫✫✫";
	}else if(1800<=a && a<1900) {
		return "✬";
	}else if(2000<=a && a<2100) {
		return "✬✬";
	}
	else if(2100<=a && a<2200) {
		return "✬✬✬";
	}else if(2200<=a && a<2300) {
		return "✪";
	}else if(2300<=a && a<2400) {
		return "✪✪";
	}
	else if(2400<=a && a<2500) {
		return "✪✪✪";
	}else if(2500<=a && a<2600) {
		return "✡";
	}else if(2600<=a && a<2700) {
		return "✡✡";
	}else {
		return "✡✡✡";
}
}
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get('/newmissiatr', (req, res) =>{
	  //res.send('Hello World!');
	  let p = "newmissia " + req.query.l + "::" + req.connection.remoteAddress;
	  console.log(p);

	  //req.connection.remoteAddress
	  //req.connection.remotePort
	//  req.connection.localAddress
	//  req.connection.localPort
	  fs.appendFile('logtr', new Date().getTime()+"&&"+p+"\n", function (err) {
	    if (err){  return;}
	    //console.log('Saved!');
	  });
	  let path = './missionstr/'+req.query.l;
	  if (fs.existsSync(path)) {
	    let s = fs.readFileSync(path)+"";
	    res.send(s);
	  }else {
	    res.send("soon");
	  }
	});
	app.get('/versiatr', (req, res) =>{
	  //res.send('Hello World!');

	  res.send("3.7");
	});
	app.get('/reklamopentr', (req, res) =>{
		  //res.send('Hello World!');
		console.log("reclam open ooooo00000000000000   " + req.query.name);
		  res.send("2.7");
		});
	app.get('/reklamfailtr', (req, res) =>{
		  //res.send('Hello World!');
		//console.log("reclam fail XXXXXXXX " + req.query.name);
		  res.send("2.7");
		});
	app.get('/reklamsuccestr', (req, res) =>{
		  //res.send('Hello World!');
		console.log("reclam succes -------" + req.query.name);
		  res.send("2.7");
		});
	app.get('/reklamloadtr', (req, res) =>{
		  //res.send('Hello World!');
		console.log("reclam load ------" + req.query.name);
		  res.send("2.7");
		});
	app.get('/gggtr', (req, res) =>{
		  //res.send('Hello World!');
		var img = fs.readFileSync('./ggg.gif');
		res.set({
			  'Content-Type': 'image/gif'
			})
		res.send(img);
		console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO" + req.query.name);
		});

	app.get('/variabletr', (req, res) =>{
		  //res.send('Hello World!');
		//console.log("variable" + req.query.name);
		  res.send("4");
		});
	app.get('/logtr', (req, res) =>{
		let str = fs.readFileSync('./logyarish20122018') + "";
		let ar = str.split('\n');
		let ans = "";
		for(let i = 0; i < ar.length; i++) {
			ans += ar[i] + "<br>"
		}
		  res.send(ans);
		});
	let S = new Set();
	let Dic = {};
	app.get('/onlinetr', (req, res) =>{
		let s = req.query.name + "";
		if(Dic[s] == undefined) Dic[s] = 1;
		else Dic[s] = Dic[s] + 1;
		if(Dic[s] == 50||(Dic[s]%200==0 && Dic[s]>3)) {
			res.send("ccom.tmh.toghr.adlarinmenasi");
		}else {
			res.send("0");
		}

		let t = s+"&&&";
		if(!S.has(t)) {
			S.add(s);
		}
		});

	app.get('/getonlinetr', (req, res) =>{
		let ans = S.size + "<br>";
		for(let x of S) {
			ans += x+"::"+req.connection.remoteAddress + "<br>";
		}
		res.send(ans);
		});
	setInterval(() => {
		S.clear();
	}, 60000 * 5);
	app.get('/tr', (req, res) =>{
		console.log("girisd")
	  //res.send('Hello World!');
	  MongoClient.connect(url, function(err, db) {
	    if (err){ if(db != null)db.close(); return;}
	    var dbo = db.db("mydb");
	    var query = { name: req.query.name };
	    if(!S.has(req.query.name)) {
	    	S.add(req.query.name+"&&&");
	    }

	    dbo.collection("mycoltr").find(query).toArray(function(err, result) {
	      if (err){ if(db != null)db.close(); return;}
	      if(result.length > 0) {
	        res.send("Bu ad artiq movcuddur");
	        let p = req.query.name+"::"+req.connection.remoteAddress+" Bu ad artiq movcuddur XXXXXXXXXXX";
	        console.log(p);
	        fs.appendFile('logtr',new Date().getTime()+"&&"+ p+"\n", function (err) {
	          if (err){ if(db != null)db.close(); return;}
	          //console.log('Saved!');
	        });
	      }else {
	        var myobj = { name: req.query.name, score : 0.0, elo:500, wowelo:500};
	        dbo.collection("mycoltr").insertOne(myobj, function(err, res) {
	          if (err){ if(db != null)db.close(); return;}
	          let p = req.query.name+"::"+req.connection.remoteAddress+" Qeydiyyat-----------------------------------------------------";
	          console.log(p);
	          fs.appendFile('logtr',new Date().getTime()+"&&"+ p+"\n", function (err) {
	            if (err){ if(db != null)db.close(); return;}
	            //console.log('Saved!');
	          });
	          if(db != null)db.close();
	        });
	        res.send("1");
	      }
	    });
	  });
	});

	app.get('/updatetr', (req, res) =>{
	  //res.send('Hello World!');
	  let resserver = res;
	  let adi = req.query.name+"";
	  let reg = req.query.reg;
	  //console.log("update");
	  if(!S.has(req.query.name)) {
	  	S.add(req.query.name+"&&&");
	  }
	  MongoClient.connect(url, function(err, db) {
		  if (err){ if(db != null)db.close(); return;}
	  var dbo = db.db("mydb");
	  var myquery = { name: req.query.name};
	  var newvalues;
	  if(reg != undefined) newvalues = { $set: { name: req.query.name, score : parseInt(req.query.score), reg:reg }};
	  else newvalues = { $set: { name: req.query.name, score : parseInt(req.query.score)}}
	  dbo.collection("mycoltr").updateOne(myquery, newvalues,{upsert:true}, function(err, res) {
	    if (err){ if(db != null)db.close(); return;}
	    dbo.collection("mycoltr").count({"score" : parseInt(req.query.score)-1 },function(err, result){
	      if (err){ if(db != null)db.close(); return;}
	      //console.log(req.query.name + ": " + req.query.score + " " + result);
	      fs.appendFile('logtr',new Date().getTime()+"&&"+ req.query.name + ": " + req.query.score + " " + result.toString() + "::"+req.connection.remoteAddress+"\n", function (err) {
	        if (err){ if(db != null)db.close(); return;}
	      });
	      if(parseInt(req.query.score)== 1) result = result / 6;
	      result = Math.ceil(result);
	      if(false) {
		      resserver.send("(Salam Yerli)");
	      }else {

		      resserver.send(result+"");
	      }

	      if(db != null)db.close();
	    })

	  });
	});
	});

	app.get('/updateregtr', (req, res) =>{
		  //res.send('Hello World!');
		  let resserver = res;
		  //console.log("update");
		  if(!S.has(req.query.name)) {
		  	S.add(req.query.name+"&&&");
		  }
		  MongoClient.connect(url, function(err, db) {
		  if (err){ if(db != null)db.close(); return;}
		  var dbo = db.db("mydb");
		  var myquery = { name: req.query.reg};
		  let add = parseInt(req.query.muss);
		  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+ add +"--" + myquery.name+"-"+req.query.name+ "::"+req.connection.remoteAddress);
		  dbo.collection("mycolregtr").updateOne(myquery, { $inc: { score: add} },{upsert:true}, function(err, result) {
		    if (err){ if(db != null)db.close(); return;}
		    dbo.collection("mycoltr").count({"score" : parseInt(req.query.score)-1 },function(err, result){
			      if (err){ if(db != null)db.close(); return;}
			      //console.log(req.query.name + ": " + req.query.score + " " + result);
			      fs.appendFile('logtr',new Date().getTime()+"&&"+ req.query.name + ": " + req.query.score + " " + result.toString() + "::"+req.connection.remoteAddress+"\n", function (err) {
			        if (err){ if(db != null)db.close(); return;}
			      });
			      if(parseInt(req.query.score)== 1) result = result / 6;
			      result = Math.ceil(result);
			      resserver.send(result+"");
			      if(db != null)db.close();
			    })
		  });
		});
		});


	app.get('/counttr', (req, res) =>{
	  let resserver = res;
	  let score = parseInt(req.query.score);

	  console.log("count");
	  MongoClient.connect(url, function(err, db) {
	    if (err){ db.close(); return;}
	    var dbo = db.db("mydb");
	    dbo.collection("mycoltr").count({"score" : { $gt: score} },function(err, result){
	      if (err){ if(db != null)db.close(); return;}
	      console.log(result);
	      resserver.send(result+"");
	      fs.appendFile('logtr', new Date().getTime()+"&&"+result.toString()+"::"+req.connection.remoteAddress+"\n", function (err) {
	        if (err){ if(db != null)db.close(); return;}
	      });
	      if(db != null)db.close();
	    })

	  });
	});
	app.get('/countcollectiontr', (req, res) =>{
		  let resserver = res;
		  let score = parseInt(req.query.score);
		  //console.log("2.6--" + req.query.name);
		  MongoClient.connect(url, function(err, db) {
		    if (err){ if(db != null)db.close(); return;}
		    var dbo = db.db("mydb");
		    dbo.collection("mycoltr").count({},function(err, result){
		      if (err){ if(db != null)db.close(); return;}
		      resserver.send(result+"");
		      fs.appendFile('logtr', new Date().getTime()+"&&"+result.toString()+"::"+req.connection.remoteAddress+"\n", function (err) {
		        if (err){ if(db != null)db.close(); return;}
		      });
		      if(db != null)db.close();
		    })

		  });
		});


	app.get('/countaztr', (req, res) =>{
	  let resserver = res;
	  let score = parseInt(req.query.score);


	  MongoClient.connect(url, function(err, db) {
		    if (err){ if(db != null)db.close(); return;}
		    var dbo = db.db("mydb");

		    var mysort = { score: -1 };


		    dbo.collection("mycoltr").count({"score" : { $gt: score} },function(err, result){
		      if (err){ if(db != null)db.close(); return;}
		      if(score == 0) {
		    	 // result = 400 * Math.random();
		    	 // result = Math.ceil(result);
		      }
		      console.log("menu : count " + result + "::"+req.connection.remoteAddress);
		      fs.appendFile('logtr',new Date().getTime()+"&&"+ result.toString()+"::"+req.connection.remoteAddress+"\n", function (err) {
		        if (err){ if(db != null)db.close(); return;}
		      });
		      let res = result;

		      dbo.collection("mycoltr").find().sort(mysort).limit(130).toArray(function(err, result) {
		        if (err){ if(db != null)db.close(); return;}

		        let ans =res+ "^";
		        for(let i = 0; i < result.length; i++) {
		          let o = result[i];
		          if(o.name == null) continue;
		          let s = replace(o.name, " ", "");
		          let obj = {};
		          if((o.name+"") == ("EMIL.GULMAMEDOV1982@GMAIL.COM")) {
		        	  o.name = "EMIL.GULMAMEDOV1982"
		          }
		          //if(obj[o.name] != undefined) o.name = o.name+ ""+obj[o.name];
		          if(o.reg != undefined) o.name += "("+o.reg+")";
		          ans += o.name + "^" + o.score + "^";
		        }
		        resserver.send(ans+"");
		        if(db != null)db.close();
		      });
		    })

		  });
	});


	app.get('/countregaztr', (req, res) =>{
		  let resserver = res;
		  let score = parseInt(req.query.score);
		  let adi = req.query.name;

		  MongoClient.connect(url, function(err, db) {
			    if (err){ if(db != null)db.close(); return;}
			    var dbo = db.db("mydb");

			    var mysort = { score: -1 };
			      console.log("menu : statistika "  + "::"+req.connection.remoteAddress);
			      fs.appendFile('logtr',new Date().getTime()+"&&"+"::"+req.connection.remoteAddress+"\n", function (err) {
			        if (err){ if(db != null)db.close(); return;}
			      });
			      let res = "";

			      dbo.collection("mycolregtr").find().sort(mysort).limit(130).toArray(function(err, result) {
			        if (err){ if(db != null)db.close(); return;}

			        let ans =res+ "^";
			        for(let i = 0; i < result.length; i++) {
			          let o = result[i];
			          if(o.name == null) continue;
			          let s = replace(o.name, " ", "");
			          let obj = {};

			          if(obj[o.name] != undefined) o.name = o.name+ ""+obj[o.name];
			          if(adi == "5601237") {
			        	  ans += "57";
			          }else {

			        	  ans += o.name + "^" + o.score + "^";
			          }

			        }
			        resserver.send(ans+"");
			        if(db != null)db.close();
			      });

			  });
		});

	app.get('/countreglistaztr', (req, res) =>{
		  let resserver = res;
		  let score = parseInt(req.query.score);
		  let adi = req.query.name;
		  let reg = req.query.reg;
		  MongoClient.connect(url, function(err, db) {
			    if (err){ if(db != null)db.close(); return;}
			    var dbo = db.db("mydb");

			    var mysort = { score: -1 };
			      console.log("menu : statistika list "  + "::"+req.connection.remoteAddress + "-" + reg);
			      fs.appendFile('logtr',new Date().getTime()+"&&"+"::"+req.connection.remoteAddress+"\n", function (err) {
			        if (err){ if(db != null)db.close(); return;}
			      });
			      let res = "";

			      dbo.collection("mycoltr").find({reg:reg}).sort(mysort).limit(130).toArray(function(err, result) {
			        if (err){ if(db != null)db.close(); return;}

			        let ans =res+ "^";
			        for(let i = 0; i < result.length; i++) {
			          let o = result[i];
			          if(o.name == null) continue;
			          let s = replace(o.name, " ", "");
			          let obj = {};

			          if(obj[o.name] != undefined) o.name = o.name+ ""+obj[o.name];
			          if(adi == "5601237") {
			        	  ans += "57";
			          }else {
			        	  if(o.reg != undefined) o.name += "("+o.reg+")";
			        	  ans += o.name + "^" + o.score + "^";
			          }

			        }
			        resserver.send(ans+"");
			        if(db != null)db.close();
			      });

			  });
		});



	//----------------------------------------------------------------------------------------------
	app.get('/updateyarishtr', (req, res) =>{
		  //res.send('Hello World!');
		  let resserver = res;
		  //console.log("update");
		  if(!S.has(req.query.name)) {
		  	S.add(req.query.name+"&&&");
		  }
		  MongoClient.connect(url, function(err, db) {
		  if (err){ if(db != null)db.close(); return;}
		  var dbo = db.db("mydb");
		  var myquery = { name: req.query.name};
		  var newvalues = { $set: { name: req.query.name, score : parseInt(req.query.score) }};
		  dbo.collection("mycolyarishtr").updateOne(myquery, newvalues,{upsert:true}, function(err, res) {
		    if (err){ if(db != null)db.close(); return;}
		    dbo.collection("mycolyarishtr").count({"score" : parseInt(req.query.score)-1 },function(err, result){
		      if (err){ if(db != null)db.close(); return;}
		      console.log(req.query.name + ": " + req.query.score + " " + result);
		      fs.appendFile('logyarishtr',new Date().getTime()+"&&"+ req.query.name + ": " + req.query.score + " " + result.toString() + "::"+req.connection.remoteAddress+"\n", function (err) {
		        if (err){ if(db != null)db.close(); return;}
		      });
		      resserver.send(result+"");
		      if(db != null)db.close();
		    })

		  });
		});
		});


	app.get('/countazyarishtr', (req, res) =>{
		  let resserver = res;
		  let score = parseInt(req.query.score);


		  MongoClient.connect(url, function(err, db) {
		    if (err){ if(db != null)db.close(); return;}
		    var dbo = db.db("mydb");

		    var mysort = { score: -1 };


		    dbo.collection("mycoltr").count({"score" : { $gt: score} },function(err, result){
		      if (err){ if(db != null)db.close(); return;}
		      console.log("menu : count " + result + "::"+req.connection.remoteAddress);
		      fs.appendFile('logyarishtr',new Date().getTime()+"&&"+ result.toString()+"::"+req.connection.remoteAddress+"\n", function (err) {
		        if (err){ if(db != null)db.close(); return;}
		      });
		      let res = result;
		      dbo.collection("mycoltr").find().sort(mysort).limit(8).toArray(function(err, result) {
		        if (err){ if(db != null)db.close(); return;}

		        let ans =res+ "^";
		        for(let i = 0; i < result.length; i++) {
		          let o = result[i];
		          if(o.name == null) continue;
		          let s = replace(o.name, " ", "");
		          ans += o.name + "^" + o.score + "^";
		        }
		        resserver.send(ans+"");
		        if(db != null)db.close();
		      });
		    })

		  });
		});
	app.get('/yarishtr', (req, res) =>{
		  //res.send('Hello World!');
		  let p = "yarish " + req.query.l + "::" + req.connection.remoteAddress;
		  console.log(p);

		  fs.appendFile('logyarishtr', new Date().getTime()+"&&"+p+"\n", function (err) {
		    if (err){  return;}
		    //console.log('Saved!');
		  });
		  let path = './yarishtr';
		  let xx = fs.existsSync(path)
		  let NOMRE = "1\n";
		  if (true) {
		    let s = NOMRE+fs.readFileSync(path)+"";
		    res.send(s);
		  }else {
			  let s =//' Hər hansı bir problemlə üzləkdikdə\n'+
				  ' Növbəti Yarış 3 Mart(21:00)\n'+
				  //' 1,2,3,4,5-ci yerə KROSSVORD KÖYNƏKLƏRİ hədiyyə.\n'+
				  ' \n\n\n\n\n'+

			  			' Keçmiş yarışın nəticələri\n'+
				  ' 41036 İştirakçı\n\n\n'+
				  ' 1.Yaqub müəllim(Bakı) 36 Xal\n'+
				  ' 2.Kifayyet m.(Bakı) 36 Xal\n'+
				  ' 3.Fatya 1993(Moskva) 36 Xal\n'+
				  ' 4.Samirə88(Gəncə) 36 Xal\n'+
				  ' 5.Rahib @ Jojim(Lənkəran) 36 Xal\n'+
				  ' 6.valid(Qobustan) 36 Xal\n'+
				  ' 7.NAR.(Navahi)(Bakı) 36 Xal\n'+
				  ' 8.çakır(Sumqayıt) 36 Xal\n'+
				  ' 9.qalib™(Tovuz) 36 Xal\n'+
				  ' 10.name(Bakı) 36 Xal\n'+
				  ' 11.Maqa M.M.M(Ağstafa) 36 Xal\n'+
				  ' 12.natiq.(Gəncə) 36 Xal\n'+
				  ' 13.yusi611(Samux) 36 Xal\n'+
				  ' 14.Mətanətyusif(Şamaxı) 36 Xal\n'+
				  ' 15.Tovuzlu qaqaş(Tovuz) 36 Xal\n'+
				  ' 16.Krossworder(Qax) 36 Xal\n'+
				  ' 17.vecm(Bakı) 36 Xal\n'+
				  ' 18.Aziz(Şəki) 36 Xal\n'+
				  ' 19.saida20(Xaçmaz) 36 Xal\n'+
				  ' 20.Zehra_Zeyneb(Şəki) 36 Xal\n'+
				  ' 21.исаевхожи(Qazax) 36 Xal\n'+
				  ' 22.cemo(Culfa-Naxçıvan) 36 Xal\n'+
				  ' 23.Anarim(Gədəbəy) 36 Xal\n'+
				  ' 24.Qurbanova Samire♥(Naxçıvan) 36 Xal\n'+
				  ' 25.tomtom(Bakı) 36 Xal\n'+
				  ' 26.vuqar80(Bakı) 36 Xal\n'+
				  ' 27.555 a(Saatlı) 36 Xal\n'+
				  ' 28.ruslan xelil(Masallı) 36 Xal\n'+
				  ' 29.rzaqulu(Şirvan) 36 Xal\n'+
				  ' 30.suleyman$(Quba) 36 Xal\n'+
				  ' 31.atakisi(Sumqayıt) 36 Xal\n'+
				  ' 32.Müşviq(Quba) 36 Xal\n'+
				  ' 33.sahib1234(Bakı) 36 Xal\n'+
				  ' 34.Ayan Quluyeva(Naxçıvan) 36 Xal\n'+
				  ' 35.Celil.Celil(Ağcabədi) 36 Xal\n'+
				  ' 36.hüsran(Kürdəmir) 36 Xal\n'+
				  ' 37.Polad 557(Bakı) 36 Xal\n'+
				  ' 38.zuma(Şəmkir) 36 Xal\n'+
				  ' 39.diqirin(Ağdam) 36 Xal\n'+
				  ' 40.Abc(Bakı) 36 Xal\n'+
				  ' 41.heziyev saatli(Saatlı) 36 Xal\n'+
				  ' 42.NN787(Bakı) 36 Xal\n'+
				  ' 43. фанстайл(Naftalan) 36 Xal\n'+
				  ' 44.Süphan(Bərdə) 36 Xal\n'+
				  ' 45.xatire1234(Bakı) 36 Xal\n'+
				  ' 46.Yunis.e(Ağstafa) 36 Xal\n'+
				  ' 47.aslanlı. Kəmalə(Neftçala) 36 Xal\n'+
				  ' 48.ejder95(Bakı) 36 Xal\n'+
				  ' 49. Ayşən(Sumqayıt) 36 Xal\n'+
				  ' 50.Azər1(Bərdə) 36 Xal\n'+
				  ' 51.EMIL.GULMAMEDOV1982@GMAIL.COM(Cəbrayıl) 36 Xal\n'+
				  ' 52.Vugar 17 Sumgayit(Sumqayıt) 36 Xal\n'+
				  ' 53.Ramil İsmayilov(Saatlı) 36 Xal\n'+
				  ' 54.rufan(Gəncə) 36 Xal\n'+
				  ' 55.mahir11111(Bərdə) 36 Xal\n'+
				  ' 56.əfsun səfərli(Sumqayıt) 36 Xal\n'+
				  ' 57.ibraqim(Abşeron) 36 Xal\n'+
				  ' 58.muxtar abdul(Ordubad-Naxçıvan) 36 Xal\n'+
				  ' 59.rəşad s(Quba) 36 Xal\n'+
				  ' 60.natiq.kerimzade@gmail.com(Bakı) 36 Xal\n'+
				  ' 61.seid murad(Zərdab) 36 Xal\n'+
				  ' 62.elnur555(Ağsu) 36 Xal\n'+
				  ' 63.qocaelik(Goranboy) 36 Xal\n'+
				  ' 64.Sevil16161(Bakı) 36 Xal\n'+
				  ' 65.beylaqanski(Beyləqan) 36 Xal\n'+
				  ' 66.Rauf96(Şəki) 36 Xal\n'+
				  ' 67.ORXAN.ŞAMÍL(Bakı) 35 Xal\n'+
				  ' 68.Elikcem(Bakı) 35 Xal\n'+
				  ' 69.Leyla şəmkirova (Naftalan) 35 Xal\n'+
				  ' 70.ArSər(Naxçıvan) 35 Xal\n'+
				  ' 71.Toma(Bakı) 35 Xal\n'+
				  ' 72.Anarh(Biləsuvar) 35 Xal\n'+
				  ' 73.ehmedova(Bakı) 35 Xal\n'+
				  ' 74.Muro(Şəmkir) 35 Xal\n'+
				  ' 75.goyceli(Gəncə) 34 Xal\n'+
				  ' 76.MATANAT(Bakı) 34 Xal\n'+
				  ' 77.vu087(Bakı) 34 Xal\n'+
				  ' 78.Xıdır(İmişli) 34 Xal\n'+
				  ' 79.azərin(Bakı) 33 Xal\n'+
				  ' 80.cy13(Sumqayıt) 33 Xal\n'+
				  ' 81.elcanelnare(Gəncə) 33 Xal\n'+
				  ' 82.AYNUR(Sumqayıt) 33 Xal\n'+
				  ' 83.eyvaz500(Sumqayıt) 33 Xal\n'+
				  ' 84.Aydin2(Gəncə) 32 Xal\n'+
				  ' 85.müşviq(Quba) 32 Xal\n'+
				  ' 86.Murad36(Qəbələ) 32 Xal\n'+
				  ' 87.pərvanə(Bakı) 31 Xal\n'+
				  ' 88.etibar xedice(Naxçıvan) 31 Xal\n'+
				  ' 89.Orxan M(Xaçmaz) 31 Xal\n'+
				  ' 90.FERDE(Sumqayıt) 30 Xal\n'
				  //s = "     Nəticələr Hazırlanır.";
			 	res.send(s);
		  }
		});





	//var youtubeStream = require('youtube-audio-stream')
	app.get('/audiotr', function(req, res){
	    console.log("send file mp3")
	    res.set('content-type', 'audio/mp3');
	    fs.createReadStream('song.mp3').pipe(res);

//	    var requestUrl = 'http://youtube.com/watch?v=9QTAAgyzGWQ'
//	    try {
//	      youtubeStream(requestUrl).pipe(res)
//	    } catch (exception) {
//	      res.status(500).send(exception)
//	    }
	});







	///////////////////////////////////////////Deutsch
































		//international












		//wow readFileSync










app.get('/region', (req, res) =>{
	//console.log("Wowresultlast");

	let resserver = res;
	MongoClient.connect(url,  function(err, db) {
		if (err){ if(db != null)db.close(); return;}
		var dbo = db.db("mydb");
		var myquery = { name: req.query.name};
		dbo.collection("mycoltr").findOne(myquery,function(err, res) {
			if (err){ if(db != null)db.close(); resserver.send("NONE"); return;}
			//console.log("elo deyishishdi");
			resserver.send(res);
			if(db != null)db.close();
		});


	});
});

app.listen(3011, () => console.log('Example app listening on port 80!'))

// var httpServer = http.createServer(app);
// var httpsServer = https.createServer(credentials, app);
//
// httpServer.listen(8080);
// httpsServer.listen(8443);
