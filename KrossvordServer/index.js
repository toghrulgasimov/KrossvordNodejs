async function f() {


	const express = require('express')
	const app = express()

	var bodyParser = require('body-parser');
	let fs = require('fs')

	//secure
	var http = require('http')
	var https = require('https')
	var privateKey  = fs.readFileSync('ssh/key.pem', 'utf8');
	var certificate = fs.readFileSync('ssh/cert.pem', 'utf8');

	var credentials = {key: privateKey, cert: certificate};
	var httpServer = http.createServer(app);
	var httpsServer = https.createServer(credentials, app);
	//secure

	app.use(bodyParser.urlencoded({
		limit:'50mb',
		extended: true
	}));
	app.use(bodyParser.json({limit:'50mb'}));
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(express.static('icons'));
	app.use(express.static('googleadmob'));
	let SECO = 0;
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";


	//file upload
	// SET STORAGE


	//file upload



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
	var colors = require('colors');

	let mongoUtil = require( './mongoUtil' );
	let cilentM = await mongoUtil.connectToServer();
	console.log("connected");

	let dbMo = await mongoUtil.getDb();

	require('./firebasedelete').routes(app, dbMo);
	app.post('/ailep', (req, res) =>{
		//res.send('Hello World!');
		let s = "<html>\n" +
			"<header><title>This is title</title></header>\n" +
			"<body>\n" +
			"Hello world\n" +
			"</body>\n" +
			"</html>";

		res.send(s)
		console.log(req.query);
		console.log(req.body);
	});
	app.get('/profil', (req, res) =>{
		//res.send('Hello World!');
		console.log(req.query);



		MongoClient.connect(url, async function(err, db) {
			if (err){ if(db != null)db.close(); return;}
			var dbo = db.db("mydb");
			var query = { name: req.query.device };
			let newvalues = { $set: req.query};

			let u = await dbo.collection("mycol").updateOne({device:req.query.device}, newvalues);
			console.log(u);
			res.send("1");
			if(db != null)db.close(); return;
		});

	});
	app.get('/teklif', (req, res) =>{
		//res.send('Hello World!');
		console.log(req.query);


		let p = req.query.device + "---" + req.query.soz + "----" + req.query.cavab + "\n";

		MongoClient.connect(url, async function(err, db) {
			if (err){ if(db != null)db.close(); return;}
			var dbo = db.db("mydb");

			let u = await dbo.collection("mycol").findOne({device:req.query.device});
			if(u != null) {
				u.teklifsual = req.query.soz;
				u.teklifcavab = req.query.cavab;
				u.status = 0;
				delete u._id;
				console.log(u);
				await dbo.collection("teklifler").insertOne(u);
			}

			if(db != null)db.close(); return;
		});

		fs.appendFile('teklifler', p, function (err) {
			if (err){  return;}
			//console.log('Saved!');
		});
		res.send("1");

	});
	app.get('/xal', (req, res) =>{
		//res.send('Hello World!');
		console.log(req.query);

		MongoClient.connect(url, async function(err, db) {
			if (err){ if(db != null)db.close(); return;}
			var dbo = db.db("mydb");

			let u = await dbo.collection("mycol").findOne({device:req.query.device});
			console.log(u);
			if(u.pxal == undefined) {
				u.pxal = 0;
			}
			if(u.psoz == undefined) {
				u.psoz = 0;
			}
			res.send(u.psoz + "@" + u.pxal);
			if(db != null)db.close(); return;
		});


	});
	app.get('/sozler', (req, res) =>{
		//res.send('Hello World!');

		MongoClient.connect(url, async function(err, db) {
			if (err){ if(db != null)db.close(); return;}
			var dbo = db.db("mydb");
			var myquery = { name: req.query.reg};
			let add = parseInt(req.query.muss);
			//console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+ add +"--" + myquery.name+"-"+req.query.name+ "::"+req.connection.remoteAddress);

			let a = await dbo.collection("sozsaniye").find().toArray();
			console.log(a);
			for(let i = 0; i < a.length; i++) {
				a[i].orta = a[i].sec / a[i].cnt;
			}
			a.sort(function(a,b){
				return a.orta < b.orta ? 1 : -1;
			});
			let ans = "";
			for(let i = 0; i < 200; i++) {
				ans += a[i].soz + "--" + a[i].orta + "<br>";
			}
			res.send(ans);

			if(db != null)db.close();
		});
	});
	function toDate(s) {
		let a = s.split("/");
		return {day:parseInt(a[0]), month:parseInt(a[1]), year:parseInt(a[2])};
	}
	app.get('/gun', (req, res) =>{
		//res.send('Hello World!');

		MongoClient.connect(url, async function(err, db) {
			if (err){ if(db != null)db.close(); return;}
			var dbo = db.db("mydb");
			var myquery = { name: req.query.reg};
			let add = parseInt(req.query.muss);
			//console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+ add +"--" + myquery.name+"-"+req.query.name+ "::"+req.connection.remoteAddress);

			let a = await dbo.collection("gunoyun").find().toArray();
			console.log(a);
			for(let i = 0; i < a.length; i++) {
				let sec = a[i].sec;
				let hours = sec / (60 * 60);
				hours = parseInt(hours);
				let minutes = parseInt(sec / 60) - (hours * 60);
				minutes = parseInt(minutes);
				let secc = sec % 60;
				a[i].sec = hours + "h " + minutes + "m " + "s " + secc;
				a[i].day2 = toDate(a[i].day);
			}
			a.sort(function(a,b){
				if(a.day2.year < b.day2.year) {
					return 1;
				}else if(a.day2.year > b.day2.year) {
					return -1;
				}else if(a.day2.month < b.day2.month) {
					return 1;
				}else if(a.day2.month > b.day2.month) {
					return -1;
				}else if(a.day2.day < b.day2.day) {
					return 1;
				}else {
					return -1;
				}
			});
			let ans = "";
			for(let i = 0; i < a.length; i++) {
				ans += a[i].day + "--" + a[i].sec + "<br>";
			}
			res.send(ans);

			if(db != null)db.close();
		});
	});
	app.get('/newmissia', (req, res) =>{
		//res.send('Hello World!');
		let p = "newmissia " + req.query.l+ "::" + req.query.name;
		console.log(p);

		//req.connection.remoteAddress
		//req.connection.remotePort
		//  req.connection.localAddress
		//  req.connection.localPort
		fs.appendFile('log', new Date().getTime()+"&&"+p+"\n", function (err) {
			if (err){  return;}
			//console.log('Saved!');
		});
		let path = './missions/'+req.query.l;
		if (fs.existsSync(path)) {
			let s = fs.readFileSync(path)+"";
			res.send(s);
		}else {
			res.send("soon");
		}

		MongoClient.connect(url, async function(err, db) {
			if (err){ if(db != null)db.close(); return;}
			var dbo = db.db("mydb");
			var query = { name: req.query.name };
			if(!S.has(req.query.name)) {
				S.add(req.query.name+"&&&");
			}
			let newvalues = { $set: {level : parseInt(req.query.l)}};

			await dbo.collection("mycol").updateOne({name:req.query.name}, newvalues);
			if(db != null)db.close(); return;
		});

	});
	app.get('/versia', (req, res) =>{
		//res.send('Hello World!');

		res.send("4.6");
	});
	app.post('/update2', (req, res) =>{
		//res.send('Hello World!');
		let resserver = res;
		let adi = req.body.name+"";
		let reg = req.body.reg;
		//console.log("update");
		if(!S.has(req.query.name)) {
			S.add(req.query.name+"&&&");
		}
		MongoClient.connect(url, function(err, db) {
			if (err){ if(db != null)db.close(); return;}
			var dbo = db.db("mydb");
			var myquery = {name: req.body.name };
			var nv = {};
			if(reg!= undefined) nv.reg = reg;
			if(req.body.missiascore!= undefined) nv.missiascore = parseInt(req.body.missiascore);
			if(req.body.score!= undefined) nv.score = parseInt(req.body.score);

			var newvalues = {$set : nv};
			//if(reg != undefined) newvalues = { $set: { score : parseInt(req.query.score), reg:reg, missiascore: parseInt(req.query.missiascore)}};
			//else newvalues = { $set: { name: req.query.name, score : parseInt(req.query.score)}}
			dbo.collection("mycol").updateOne(myquery, newvalues,{upsert:true},  function(err, res) {
				if (err){ if(db != null)db.close(); return;}
				dbo.collection("mycol").count({"score" : parseInt(req.body.score)-1 },async function(err, result){
					if (err){ if(db != null)db.close(); return;}
					//console.log(req.query.name + ": " + req.query.score + " " + result);
					fs.appendFile('log',new Date().getTime()+"&&"+ req.body.name + ": " + req.body.score + " " + result.toString()+reg + "::"+req.connection.remoteAddress+"\n", function (err) {
						if (err){ if(db != null)db.close(); return;}
					});
					if(parseInt(req.body.score)== 1) result = result / 6;
					result = Math.ceil(result);
					//NAR.(Navahi)
					if(req.body.name.indexOf("NAR.(Nav") != -1) {
						let txt = "Adresinizi bu Emailə tmhgde@gmail.com göndərin";
						resserver.send(txt);
					}else {

						resserver.send(result+"");
					}
					let sozq = {soz:req.body.soz};
					let sozs = parseInt(req.body.sozSecond);
					let dd = await dbo.collection("sozsaniye").findOne(sozq);
					if(dd == undefined) {
						await dbo.collection("sozsaniye").insertOne({soz:req.body.soz, cnt:1, sec:sozs});
					}else {
						await dbo.collection("sozsaniye").updateOne(sozq,{ $set:{cnt:dd.cnt + 1, sec:dd.sec + sozs}});
					}
					//let day = await dbo.collection("sozsaniye").findOne(sozq);
					//await dbo.collection("gunoyun").updateOne(sozq,{ $set:{cnt:dd.cnt + 1, sec:dd.sec + sozs}}, {upsert:true});
					let today = new Date();
					let ddd = today.getDate();
					var mmm = today.getMonth() + 1; //January is 0!

					var yyyy = today.getFullYear();
					if (ddd < 10) {
						dd = '0' + dd;
					}
					if (mmm < 10) {
						mmm = '0' + mmm;
					}
					today = ddd + '/' + mmm + '/' + yyyy;
					// let tttttt = await dbo.collection("gunoyun").findOne({day:today});
					// console.log(tttttt);
					// if(tttttt == undefined) {
					// 	await dbo.collection("gunoyun").insertOne({day:today, sec:parseInt(req.body.sozSecond)});
					// }else {
					// 	await dbo.collection("gunoyun").updateOne({day:today},{ $set:{sec:(tttttt.sec + parseInt(req.body.sozSecond))}});
					// }
					await dbo.collection("gunoyun").updateOne({day:today},{ $inc:{sec:parseInt(req.body.sozSecond)}}, {upsert:true});

					if(db != null)db.close();
				})

			});
		});

		//res.send("5");
		console.log(JSON.stringify(req.body).green);

	});
	app.get('/reklamopen', (req, res) =>{
		//res.send('Hello World!');
		console.log("reclam open ooooo00000000000000   " + req.query.name);
		res.send("2.7");
	});
	app.get('/reklamfail', (req, res) =>{
		//res.send('Hello World!');
		//console.log("reclam fail XXXXXXXX " + req.query.name);
		res.send("2.7");
	});
	app.get('/reklamsucces', (req, res) =>{
		//res.send('Hello World!');
		console.log("reclam succes -------" + req.query.name);
		res.send("2.7");
	});
	app.get('/reklamload', (req, res) =>{
		//res.send('Hello World!');
		console.log("reclam load ------" + req.query.name);
		res.send("2.7");
	});
	app.get('/ggg', (req, res) =>{
		//res.send('Hello World!');
		var img = fs.readFileSync('./ggg.gif');
		res.set({
			'Content-Type': 'image/gif'
		})
		res.send(img);
		console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO" + req.query.name);
	});

	app.get('/variable', (req, res) =>{
		//res.send('Hello World!');
		//console.log("variable" + req.query.name);
		res.send("4");
	});
	app.get('/log', (req, res) =>{
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
	app.get('/online', (req, res) =>{
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

	app.get('/getonline', (req, res) =>{
		let ans = "Online:"+S.size + "<br>Time:" + parseInt(SECO / 60) + "," + (SECO % 60) + "<br>";
		for(let x of S) {
			ans += x+"::"+req.connection.remoteAddress + "<br>";
		}
		res.send(ans);
	});

	setInterval(() => {
		SECO++;
		if(SECO == 60 * 5) {
			S.clear();
			SECO = 0;
		}
	}, 1000);
	app.get('/', (req, res) =>{
		//res.send('Hello World!');
		MongoClient.connect(url, function(err, db) {
			if (err){ if(db != null)db.close(); return;}
			var dbo = db.db("mydb");
			var query = { name: req.query.name };
			if(!S.has(req.query.name)) {
				S.add(req.query.name+"&&&");
			}

			dbo.collection("mycol").find(query).toArray(function(err, result) {
				if (err){ if(db != null)db.close(); return;}
				if(result.length > 0) {
					res.send("Bu ad artiq movcuddur");
					let p = req.query.name+"::"+req.connection.remoteAddress+" Bu ad artiq movcuddur XXXXXXXXXXX";
					console.log(p);
					fs.appendFile('log',new Date().getTime()+"&&"+ p+"\n", function (err) {
						if (err){ if(db != null)db.close(); return;}
						//console.log('Saved!');
					});
				}else {
					var myobj = { name: req.query.name, score : 0.0, elo:500, wowelo:500};
					dbo.collection("mycol").insertOne(myobj, function(err, res) {
						if (err){ if(db != null)db.close(); return;}
						let p = req.query.name+"::"+req.connection.remoteAddress+" Qeydiyyat-----------------------------------------------------";
						console.log(p);
						fs.appendFile('log',new Date().getTime()+"&&"+ p+"\n", function (err) {
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
	app.get('/g41', (req, res) =>{
		//res.send('Hello World!');
		MongoClient.connect(url, async function(err, db) {
			if (err){ if(db != null)db.close(); return;}
			var dbo = db.db("mydb");
			var query = { device: req.query.device };
			if(!S.has(req.query.name)) {
				S.add(req.query.name+"&&&");
			}

			let u = await dbo.collection("mycol").findOne({ device: req.query.device });
			if(u != undefined) {
				console.log(u);
				let score = u.score - u.missiascore;
				if(score < 0) score = 0;
				if(u.level == undefined) u.level = 1;
				let ans = "5601373|" + u.name + "|" + score + "|" + u.level;
				console.log("Device var");
				fs.appendFile('device',JSON.stringify(u)+"\n", function (err) {
					if (err){ if(db != null)db.close(); return;}
					//console.log('Saved!');
				});
				res.send(ans);
			}else {
				let us = await dbo.collection("mycol").findOne({ name: req.query.name });
				if(us != undefined) {
					let p = req.query.name+"::"+req.connection.remoteAddress+" Bu ad artiq movcuddur XXXXXXXXXXX";
					console.log(p);
					while (true) {
						console.log("sonsuz dovr");
						let ex = getRandom(0,1000000000);
						let newname = req.query.name + ex;
						us = await dbo.collection("mycol").findOne({ name: newname });
						if(us == undefined) {
							// yeni qeydiyyat
							let ans = "5601373|" + newname + "|" + "0" + "|" + "1";
							res.send(ans);
							await dbo.collection("mycol").insertOne({ name: newname, score : 0.0, elo:500, wowelo:500, device: req.query.device, missiascore:0})
							let p = newname+"::"+req.connection.remoteAddress+" Qeydiyyat-----------------------------------------------------";
							console.log(p);
							fs.appendFile('log',new Date().getTime()+"&&"+ p+"\n", function (err) {
								if (err){ if(db != null)db.close(); return;}
								//console.log('Saved!');
							});
							break;
						}
					}
				}else {
					// yeni qeydiyyat
					let ans = "5601373|" + req.query.name + "|" + "0" + "|" + "1";
					res.send(ans);
					await dbo.collection("mycol").insertOne({ name: req.query.name, score : 0.0, elo:500, wowelo:500, device: req.query.device, missiascore:0})
					let p = req.query.name+"::"+req.connection.remoteAddress+" Qeydiyyat-----------------------------------------------------";
					console.log(p);
					fs.appendFile('log',new Date().getTime()+"&&"+ p+"\n", function (err) {
						if (err){ if(db != null)db.close(); return;}
						//console.log('Saved!');
					});

				}
			}

		});
	});

	app.get('/update', (req, res) =>{
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
			var myquery = {name: req.query.name };
			var nv = {};
			if(reg!= undefined) nv.reg = reg;
			if(req.query.missiascore!= undefined) nv.missiascore = parseInt(req.query.missiascore);
			if(req.query.score!= undefined) nv.score = parseInt(req.query.score);

			var newvalues = {$set : nv};
			//if(reg != undefined) newvalues = { $set: { score : parseInt(req.query.score), reg:reg, missiascore: parseInt(req.query.missiascore)}};
			//else newvalues = { $set: { name: req.query.name, score : parseInt(req.query.score)}}
			dbo.collection("mycol").updateOne(myquery, newvalues,{upsert:true}, function(err, res) {
				if (err){ if(db != null)db.close(); return;}
				dbo.collection("mycol").count({"score" : parseInt(req.query.score)-1 },function(err, result){
					if (err){ if(db != null)db.close(); return;}
					//console.log(req.query.name + ": " + req.query.score + " " + result);
					fs.appendFile('log',new Date().getTime()+"&&"+ req.query.name + ": " + req.query.score + " " + result.toString()+reg + "::"+req.connection.remoteAddress+"\n", function (err) {
						if (err){ if(db != null)db.close(); return;}
					});
					if(parseInt(req.query.score)== 1) result = result / 6;
					result = Math.ceil(result);
					//NAR.(Navahi)
					if(req.query.name.indexOf("NAR.(Nav") != -1) {
						let txt = "Adresinizi bu Emailə tmhgde@gmail.com göndərin";
						resserver.send(txt);
					}else {

						resserver.send(result+"");
					}

					if(db != null)db.close();
				})

			});
		});
	});

	app.get('/updatereg', (req, res) =>{
		//res.send('Hello World!');
		let resserver = res;
		//console.log("update");
		if(!S.has(req.query.name)) {
			S.add(req.query.name+"&&&");
		}
		MongoClient.connect(url, async function(err, db) {
			if (err){ if(db != null)db.close(); return;}
			var dbo = db.db("mydb");
			var myquery = { name: req.query.reg};
			let add = parseInt(req.query.muss);
			//console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+ add +"--" + myquery.name+"-"+req.query.name+ "::"+req.connection.remoteAddress);

			let u = await dbo.collection("mycol").findOne({ name: req.query.name });
			await dbo.collection("mycol").updateOne({ name: req.query.name }, {$set:{reg:req.query.reg}});
			console.log(u.name+" "+u.reg + " S: " + u.score + " L: " + u.level + " SC: "+u.missiascore );
			dbo.collection("mycolreg").updateOne(myquery, { $inc: { score: add} },{upsert:true}, function(err, result) {
				if (err){ if(db != null)db.close(); return;}
				dbo.collection("mycol").count({"score" : parseInt(req.query.score)-1 },function(err, result){
					if (err){ if(db != null)db.close(); return;}
					//console.log(req.query.name + ": " + req.query.score + " " + result);
					fs.appendFile('log',new Date().getTime()+"&&"+ req.query.name + ": " + req.query.score + " " + result.toString() + "::"+req.connection.remoteAddress+"\n", function (err) {
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


	app.get('/count', (req, res) =>{
		let resserver = res;
		let score = parseInt(req.query.score);

		MongoClient.connect(url, function(err, db) {
			if (err){ db.close(); return;}
			var dbo = db.db("mydb");
			dbo.collection("mycol").count({"score" : { $gt: score} },function(err, result){
				if (err){ if(db != null)db.close(); return;}
				resserver.send(result+"");
				fs.appendFile('log', new Date().getTime()+"&&"+result.toString()+"::"+req.connection.remoteAddress+"\n", function (err) {
					if (err){ if(db != null)db.close(); return;}
				});
				if(db != null)db.close();
			})

		});
	});
	app.get('/countcollection', (req, res) =>{
		let resserver = res;
		let score = parseInt(req.query.score);
		//console.log("2.6--" + req.query.name);
		MongoClient.connect(url, function(err, db) {
			if (err){ if(db != null)db.close(); return;}
			var dbo = db.db("mydb");
			dbo.collection("mycol").count({},function(err, result){
				if (err){ if(db != null)db.close(); return;}
				resserver.send(result+"");
				fs.appendFile('log', new Date().getTime()+"&&"+result.toString()+"::"+req.connection.remoteAddress+"\n", function (err) {
					if (err){ if(db != null)db.close(); return;}
				});
				if(db != null)db.close();
			})

		});
	});


	app.get('/countaz', (req, res) =>{
		let resserver = res;
		let score = parseInt(req.query.score);


		MongoClient.connect(url, async function(err, db) {
			if (err){ if(db != null)db.close(); return;}
			var dbo = db.db("mydb");



			var mysort = { score: -1 };


			let name = req.query.name;
			let newv = {};
			if(name != undefined) {
				if(req.query.device!= undefined) newv.device = req.query.device;
				await dbo.collection("mycol").updateOne({name:name}, {$set:{device:newv.device}},{upsert:true})
			}


			dbo.collection("mycol").count({"score" : { $gt: score} },async function(err, result){
				if (err){ if(db != null)db.close(); return;}
				if(score == 0) {
					// result = 400 * Math.random();
					// result = Math.ceil(result);
				}
				console.log("menu : count " + result + "::"+req.connection.remoteAddress);
				let u = await dbo.collection("mycol").findOne({ name: req.query.name });
				if(u != undefined && u != null) {
					console.log(u.name+" "+u.reg + " S: " + u.score + " L: " + u.level + " SC: "+u.missiascore );
				}
				fs.appendFile('log',new Date().getTime()+"&&"+ result.toString()+"::"+req.connection.remoteAddress+"\n", function (err) {
					if (err){ if(db != null)db.close(); return;}
				});
				let res = result;

				dbo.collection("mycol").find().sort(mysort).limit(200).toArray(function(err, result) {
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


	app.get('/countregaz', (req, res) =>{
		let resserver = res;
		let score = parseInt(req.query.score);
		let adi = req.query.name;

		MongoClient.connect(url, async function(err, db) {
			if (err){ if(db != null)db.close(); return;}
			var dbo = db.db("mydb");
			let u = await dbo.collection("mycol").findOne({ name: req.query.name });
			console.log("menu + " + u.name+" "+u.reg + " S: " + u.score + " L: " + u.level + " SC: "+u.missiascore );
			var mysort = { score: -1 };
			//console.log("menu : statistika "  + "::"+req.connection.remoteAddress);
			fs.appendFile('log',new Date().getTime()+"&&"+"::"+req.connection.remoteAddress+"\n", function (err) {
				if (err){ if(db != null)db.close(); return;}
			});
			let res = "";

			dbo.collection("mycolreg").find().sort(mysort).limit(200).toArray(async function(err, result) {
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
				let name = req.query.name;
				let newv = {};
				if(name != undefined) {
					if(req.query.device!= undefined) newv.device = req.query.device;

					await dbo.collection("mycol").updateOne({name:name}, {$set:{device:newv.device}},{upsert:true})
				}
				if(db != null)db.close();
			});

		});
	});

	app.get('/countreglistaz', (req, res) =>{
		let resserver = res;
		let score = parseInt(req.query.score);
		let adi = req.query.name;
		let reg = req.query.reg;
		MongoClient.connect(url, function(err, db) {
			if (err){ if(db != null)db.close(); return;}
			var dbo = db.db("mydb");

			var mysort = { score: -1 };
			console.log("menu : statistika list "  + "::"+req.connection.remoteAddress + "-" + reg);
			fs.appendFile('log',new Date().getTime()+"&&"+"::"+req.connection.remoteAddress+"\n", function (err) {
				if (err){ if(db != null)db.close(); return;}
			});
			let res = "";

			dbo.collection("mycol").find({reg:reg}).sort(mysort).limit(200).toArray(function(err, result) {
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
	app.get('/updateyarish', (req, res) =>{
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
			var newvalues = { $set: { name: req.query.name , score: parseInt(req.query.score), time: Date.now() }};
			dbo.collection("mycolyarish").updateOne(myquery, newvalues,{upsert:true}, function(err, res) {
				if (err){ if(db != null)db.close(); return;}
				dbo.collection("mycolyarish").count({"score" : parseInt(req.query.score)-1 },function(err, result){
					if (err){ if(db != null)db.close(); return;}
					result = Math.random() * 20;
					result = parseInt(result);
					console.log(req.query.name + ": " + req.query.score + " " + result);
					fs.appendFile('logyarish',new Date().getTime()+"&&"+ req.query.name + ": " + req.query.score + " " + result.toString() + "::"+req.connection.remoteAddress+"\n", function (err) {
						if (err){ if(db != null)db.close(); return;}
					});
					resserver.send(result+"");
					if(db != null)db.close();
				})

			});
		});
	});


	app.get('/countazyarish', (req, res) =>{
		let resserver = res;
		let score = parseInt(req.query.score);


		MongoClient.connect(url, function(err, db) {
			if (err){ if(db != null)db.close(); return;}
			var dbo = db.db("mydb");

			var mysort = { score: -1 };


			dbo.collection("mycol").count({"score" : { $gt: score} },function(err, result){
				if (err){ if(db != null)db.close(); return;}
				console.log("menu : count " + result + "::"+req.connection.remoteAddress);
				fs.appendFile('logyarish',new Date().getTime()+"&&"+ result.toString()+"::"+req.connection.remoteAddress+"\n", function (err) {
					if (err){ if(db != null)db.close(); return;}
				});
				let res = result;
				dbo.collection("mycol").find().sort(mysort).limit(8).toArray(function(err, result) {
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
	app.get('/yarish', (req, res) =>{
		//res.send('Hello World!');
		let p = "yarish " + req.query.l + "::" + req.connection.remoteAddress;
		console.log(p);

		fs.appendFile('logyarish', new Date().getTime()+"&&"+p+"\n", function (err) {
			if (err){  return;}
			//console.log('Saved!');
		});
		let path = './yarish';
		let xx = fs.existsSync(path)
		let NOMRE = "1\n";
		if (false) {
			let s = NOMRE+fs.readFileSync(path)+"";
			res.send(s);
		}else {
			let s =//' Hər hansı bir problemlə üzləkdikdə\n'+
				' Növbəti Yarış xx May(20:00	)\n'+
				' Yarış xx May(21:00) bitir\n'+
				' Nəticələr xx May(21:05) elan edilir,\n'+
				' 1-ci, 2-ci Yerə Ağıllı saatlar hədiyyə.\n'+
				' 		Saatların funksiyası\n'+
				' Telefonla əlaqə, QR-KOD scanner, Sensor,\n'+
				' Saat üçün xüsusi Programların yüklənməsi,\n'+
				' Zəng etmək, SMS göndərmək,\n'+
				' Facebook, Whatsapp, skype-la xüsusi əlaqə,\n'+
				' Telefon itdikdə koordinatları göstərmək,\n'+
				' Gündəlik hərəkətlərin və yatmağın analizi,\n'+
				' Hədiyyələr poçt filiallarına göndəriləcək.\n';
			//' 1,2,3,4,5-ci yerə KROSSVORD KÖYNƏKLƏRİ hədiyyə.\n'
			s += "\nƏlaqə tmhgde@gmail.com\n";
			s += "\n\n\nQalibler afaq1985, YASİN ƏKBƏROV.\n";
			s += "\n\nİlk 30 İştirakçı.\n"+
				' 1.afaq1985(Bakı) 37 Xal\n'+
				' 2.YASİN ƏKBƏROV(Laçın) 37 Xal\n'+
				' 3.ceyhun79(Gəncə) 37 Xal\n'+
				' 4.Agayev Rufet(Bakı) 37 Xal\n'+
				' 5.Sebiw(Bakı) 37 Xal\n'+
				' 6.Gül hanım(Bakı) 37 Xal\n'+
				' 7.Delixan(Bakı) 37 Xal\n'+
				' 8.Penah Babayev(Quba) 37 Xal\n'+
				' 9.Doktor(Naxçıvan) 37 Xal\n'+
				' 10.Maral(Sumqayıt) 37 Xal\n'+
				' 11.Ejdaha(Mingəçevir) 37 Xal\n'+
				' 12.Nadir Cəlilov(Quba) 37 Xal\n'+
				' 13.çakır(Sumqayıt) 37 Xal\n'+
				' 14.babudi(Lənkəran) 37 Xal\n'+
				' 15.vuqar80(Bakı) 37 Xal\n'+
				' 16.denizzzzzzz(Qəbələ) 37 Xal\n'+
				' 17.xemse(Zaqatala) 37 Xal\n'+
				' 18.mustanger(Ağdam) 37 Xal\n'+
				' 19.Emıl(Gədəbəy) 37 Xal\n'+
				' 20.Turan 2007(Şəki) 37 Xal\n'+
				' 21.Mahir483(Bakı) 37 Xal\n'+
				' 22.murad.(Masallı) 37 Xal\n'+
				' 23.yusi611(Samux) 37 Xal\n'+
				' 24.Ramile91(Bakı) 37 Xal\n'+
				' 25.muserref(Bakı) 37 Xal\n'+
				' 26.tomtom(Bakı) 37 Xal\n'+
				' 27.Tempus061(Ucar) 37 Xal\n'+
				' 28.mickymouse(Ağsu) 37 Xal\n'+
				' 29.ORXAN.ŞAMÍL(Bakı) 37 Xal\n'+
				' 30.M.Nigar(Bakı) 37 Xal\n';
			res.send(s);
		}
	});





	//var youtubeStream = require('youtube-audio-stream')
	app.get('/audio', function(req, res){
		console.log("send file mp3 --" + req.query.name);
		res.set('content-type', 'audio/mp3');
		//fs.createReadStream('song.mp3').pipe(res);

//	    var requestUrl = 'http://youtube.com/watch?v=9QTAAgyzGWQ'
//	    try {
//	      youtubeStream(requestUrl).pipe(res)
//	    } catch (exception) {
//	      res.status(500).send(exception)
//	    }
	});
	app.get('/xeta', async function(req, res){

		MongoClient.connect(url, async function(err, db) {
			if (err){ if(db != null)db.close(); return;}
			var dbo = db.db("mydb");

			let u = await dbo.collection("mycol").findOne({ name: req.query.name });
			if(u != undefined && u != null) {
				console.log("Xeta "+u.name + " S:" + u.score + " L:" + u.level+">" );
			}
			console.log(req.query)
			fs.appendFile('xetalar', req.query.xx+"\n-----------------\n", function (err) {
				if (err){  return;}
				//console.log('Saved!');
			});

		});

	});
	app.get('/missions', async function(req, res){

		MongoClient.connect(url, async function(err, db) {
			if (err){ if(db != null)db.close(); return;}
			var dbo = db.db("mydb");
			let ans = "";
			for(let i = 1; ;i++) {
				let c = await dbo.collection("mycol").find({level: (i)}).count();
				console.log(c);
				if(c == 0) break;
				ans += (i + "-----" + c + "<br>");
			}
			res.send(ans);

		});

	});






	///////////////////////////////////////////Deutsch
	app.get('/newmissiade', (req, res) =>{
		//res.send('Hello World!');
		let p = "newmissia " + req.query.l + "::"+req.query.name + "::" + req.connection.remoteAddress;
		console.log(p);

		//req.connection.remoteAddress
		//req.connection.remotePort
		//  req.connection.localAddress
		//  req.connection.localPort
		fs.appendFile('logde', new Date().getTime()+"&&"+p+"\n", function (err) {
			if (err){  return;}
			//console.log('Saved!');
		});
		let path = './missionsde/'+req.query.l;
		if (fs.existsSync(path)) {
			let s = fs.readFileSync(path)+"";
			res.send(s);
		}else {
			res.send("soon");
		}
	});
	app.get('/versiade', (req, res) =>{
		//res.send('Hello World!');

		res.send("2.8");
	});
	app.get('/changescore', (req, res) =>{

		// if(req.query.name == "asif_gunayy") {
		// 	res.send(123+"");
		// }else {
		// 	res.send("NO");
		// }
		MongoClient.connect(url, async function(err, db) {
			if (err){ if(db != null)db.close(); return;}
			var dbo = db.db("mydb");

			let u = await dbo.collection("mycol").findOne({ name: req.query.name });
			if(u.up != undefined && u.up > 0) {
				await dbo.collection('mycol').updateOne({device:u.device},{$set:{score:(u.score + u.up), up:0}});
				await dbo.collection("mycolreg").updateOne({name: req.query.reg}, { $inc: { score: u.up} });

				let pp = (u.score + u.up);
				pp = pp + "";
				res.send(pp);
				console.log("new score --- " + (u.score + u.up));
			}else {
			}

		});
	});
	let Sde = new Set();
	app.get('/onlinede', (req, res) =>{
		let s = req.query.name
		res.send("0");
		let t = s+"&&&";
		if(!Sde.has(t)) {
			Sde.add(s);
		}
	});
	app.get('/getonlinede', (req, res) =>{
		let ans = Sde.size + "<br>";
		for(let x of Sde) {
			ans += x+"::"+req.connection.remoteAddress + "<br>";
		}
		res.send(ans);
	});
	setInterval(() => {
		Sde.clear();
	}, 60000 * 5);
	app.get('/de', (req, res) =>{
		//res.send('Hello World!');
		MongoClient.connect(url, function(err, db) {
			if (err){ if(db != null)db.close(); return;}
			var dbo = db.db("mydb");
			var query = { name: req.query.name };
			if(!S.has(req.query.name)) {
				S.add(req.query.name+"&&&");
			}

			dbo.collection("mycolde").find(query).toArray(function(err, result) {
				if (err){ if(db != null)db.close(); return;}
				if(result.length > 0) {
					res.send("Bu ad artiq movcuddur");
					let p = req.query.name+"::"+req.connection.remoteAddress+" Bu ad artiq movcuddur XXXXXXXXXXX";
					console.log(p);
					fs.appendFile('logde',new Date().getTime()+"&&"+ p+"\n", function (err) {
						if (err){ if(db != null)db.close(); return;}
						//console.log('Saved!');
					});
				}else {
					var myobj = { name: req.query.name, score : 0.0};
					dbo.collection("mycolde").insertOne(myobj, function(err, res) {
						if (err){ if(db != null)db.close(); return;}
						let p = req.query.name+"::"+req.connection.remoteAddress+" Qeydiyyat-----------------------------------------------------";
						console.log(p);
						fs.appendFile('logde',new Date().getTime()+"&&"+ p+"\n", function (err) {
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

	app.get('/updatede', (req, res) =>{
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
			dbo.collection("mycolde").updateOne(myquery, newvalues,{upsert:true}, function(err, res) {
				if (err){ if(db != null)db.close(); return;}
				dbo.collection("mycolde").count({"score" : parseInt(req.query.score)-1 },function(err, result){
					if (err){ if(db != null)db.close(); return;}
					console.log(req.query.name + ": " + req.query.score + " " + result);
					fs.appendFile('logde',new Date().getTime()+"&&"+ req.query.name + ": " + req.query.score + " " + result.toString() + "::"+req.connection.remoteAddress+"\n", function (err) {
						if (err){ if(db != null)db.close(); return;}
					});
					resserver.send(result+"");
					if(db != null)db.close();
				})

			});
		});
	});


	app.get('/countde', (req, res) =>{
		let resserver = res;
		let score = parseInt(req.query.score);


		MongoClient.connect(url, function(err, db) {
			if (err){ if(db != null)db.close(); return;}
			var dbo = db.db("mydb");

			var mysort = { score: -1 };


			dbo.collection("mycolde").count({"score" : { $gt: score} },function(err, result){
				if (err){ if(db != null)db.close(); return;}
				console.log("menu : count " + result + "::"+req.connection.remoteAddress);
				fs.appendFile('logde',new Date().getTime()+"&&"+ result.toString()+"::"+req.connection.remoteAddress+"\n", function (err) {
					if (err){ if(db != null)db.close(); return;}
				});
				let res = result;
				dbo.collection("mycolde").find().sort(mysort).limit(100).toArray(function(err, result) {
					if (err){ if(db != null)db.close(); return;}

					let ans =res+ "^";
					for(let i = 0; i < result.length; i++) {
						let o = result[i];
						if(o.name == null) continue;
						let s = replace(o.name+"", " ", "");
						ans += o.name + "^" + o.score + "^";
					}
					resserver.send(ans+"");
					if(db != null)db.close();
				});
			})

		});
	});

	app.get('/reklamopende', (req, res) =>{
		//res.send('Hello World!');
		console.log("reclam open ooooo00000000000000   " + req.query.name);
		res.send("2.7");
	});
	app.get('/reklamfailde', (req, res) =>{
		//res.send('Hello World!');
		//console.log("reclam fail XXXXXXXX " + req.query.name);
		res.send("2.7");
	});
	app.get('/reklamsuccesde', (req, res) =>{
		//res.send('Hello World!');
		console.log("reclam succes -------" + req.query.name);
		res.send("2.7");
	});
	app.get('/reklamloadde', (req, res) =>{
		//res.send('Hello World!');
		console.log("reclam load ------" + req.query.name);
		res.send("2.7");
	});
	app.get('/variablede', (req, res) =>{
		//res.send('Hello World!');
		//console.log("variable" + req.query.name);
		res.send("4");
	});
	app.get('/countcollectionde', (req, res) =>{
		let resserver = res;
		let score = parseInt(req.query.score);
		//console.log("2.6--" + req.query.name);
		MongoClient.connect(url, function(err, db) {
			if (err){ if(db != null)db.close(); return;}
			var dbo = db.db("mydb");
			dbo.collection("mycolde").count({},function(err, result){
				if (err){ if(db != null)db.close(); return;}
				resserver.send(result+"");
				fs.appendFile('logde', new Date().getTime()+"&&"+result.toString()+"::"+req.connection.remoteAddress+"\n", function (err) {
					if (err){ if(db != null)db.close(); return;}
				});
				if(db != null)db.close();
			})

		});
	});












	//Math
	//Mathresultb
	let Arr = [], cavab = [];
	let sec = 0;
	let c = require('./elo.js')
	let E;
	let test;
	let ff = fs.readFileSync("mathgames")+"";
	let Suallar = ff.split('\n');
	test = Suallar[getRandom(1,600)];
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
	setInterval(function(){
			sec++;
			if(sec % 65 == 0) {// oyun bashladi
				Arr = [];
				cavab = [];
				test = Suallar[getRandom(1,600)];
			}
			if(sec % 65 == 47) {// bashla hesablamaga

				E = new c.ELOMatch();
				Arr.sort(compare);
				for(let i = 0; i < Arr.length; i++) {
					E.addPlayer(Arr[i].name, i+1, Arr[i].elo); // tomorrow
				}
				E.calculateELOs();
				for(let i = 0; i < E.players.length; i++) {
					//console.log(E.players[i]);
				}
			}
			//console.log(sec);
		}
		, 1000);


	app.get('/Math', (req, res) =>{
		let b = 65 - (sec % 65);
		let s = test+b+"";
		res.send(s);
	});
	app.get('/Mathresult', (req, res) =>{
		//console.log(req.query);
		//console.log("MAthresult")
		Arr.push({name:req.query.name, score:parseInt(req.query.score), lasttime:parseInt(req.query.lasttime), elo:parseInt(req.query.elo)});
		res.send("1");
		MongoClient.connect(url, function(err, db) {
			if (err){ if(db != null)db.close(); return;}
			var dbo = db.db("mydb");
			var myquery = { name: req.query.name};
			var newvalues = { $set: { name: req.query.name, elo : parseInt(req.query.elo) }};
			dbo.collection("mycol").updateOne(myquery, newvalues,{upsert:true}, function(err, res) {
				if (err){ if(db != null)db.close(); return;}
				if(db != null)db.close();
			});
		});
	});
	app.get('/Mathresultb', (req, res) =>{// cavab gonderilir
		let ans = "0^^";
		let name = req.query.name;
		for(let i = 0; i < E.players.length; i++) {
			if(E.players[i].name == name) {
				let change = E.players[i].eloChange;
				if(change > 0) change = "+" + change;
				ans = "";
				if(Arr[i] == undefined || Arr[i].name == "qedim ") continue;
				if(Arr[i].name == "DASAQ")continue;
				ans += change+"^"+(i+1) + "-cı yer\n" + Arr[i].score + " Doğru\n" + "Xal " + change+"^";
				break;
			}
		}
		for(let i = 0; i < E.players.length; i++) {
			let change = E.players[i].eloChange;
			if(change >= 0) change = "+" + change;
			if(E.players[i] == undefined || Arr[i] == undefined)continue;
			ans += (i+1)+". " + E.players[i].name + " Xal "+ E.players[i].eloPre + "     " + change+"  Doğru "+Arr[i].score+"^";
		}
		res.send(ans);
	});

	app.get('/Mathcount', (req, res) =>{
		let resserver = res;
		let elo = parseInt(req.query.elo);


		MongoClient.connect(url, function(err, db) {
			if (err){ if(db != null)db.close(); return;}
			var dbo = db.db("mydb");

			var mysort = { elo: -1 };


			dbo.collection("mycol").count({"elo" : { $gt: elo} },function(err, result){
				if (err){ if(db != null)db.close(); return;}
				if(elo == 0) {
					// result = 400 * Math.random();
					// result = Math.ceil(result);
				}
				console.log("math menu : count " + result + "::"+req.connection.remoteAddress);
				fs.appendFile('log',new Date().getTime()+"&&"+ result.toString()+"::"+req.connection.remoteAddress+"\n", function (err) {
					if (err){ if(db != null)db.close(); return;}
				});
				let res = result+1;

				dbo.collection("mycol").find().sort(mysort).limit(200).toArray(function(err, result) {
					if (err){ if(db != null)db.close(); return;}

					let ans =0+"^Reyting " +res+ "\nXal " + req.query.elo+ "^";
					for(let i = 0; i < result.length; i++) {
						let o = result[i];
						if(o.name == null) continue;
						let s = replace(o.name, " ", "");
						let obj = {};
						if(o.reg != undefined) o.name += "("+o.reg+")";
						ans += (i+1)+". "+ o.name+" Xal " + o.elo + "^";
					}
					resserver.send(ans+"");
					if(db != null)db.close();
				});
			})

		});
	});


	//international
	app.get('/Mathresultbinternational', (req, res) =>{// cavab gonderilir
		let ans = "0^^";
		let name = req.query.name;
		for(let i = 0; i < E.players.length; i++) {
			if(E.players[i].name == name) {
				let change = E.players[i].eloChange;
				if(change > 0) change = "+" + change;
				ans = "";
				if(Arr[i] == undefined || Arr[i].name == "qedim ") continue;
				ans += change+"^"+(i+1) + ". Place\n" + Arr[i].score + " Correct\n" + "Point " + change+"^";
				break;
			}
		}
		for(let i = 0; i < E.players.length; i++) {
			let change = E.players[i].eloChange;
			if(change >= 0) change = "+" + change;
			if(E.players[i] == undefined || Arr[i] == undefined)continue;
			ans += (i+1)+". " + E.players[i].name + " Point "+ E.players[i].eloPre + "     " + change+"  Correct "+Arr[i].score+"^";
		}
		res.send(ans);
	});

	app.get('/Mathcountinternational', (req, res) =>{
		let resserver = res;
		let elo = parseInt(req.query.elo);


		MongoClient.connect(url, function(err, db) {
			if (err){ if(db != null)db.close(); return;}
			var dbo = db.db("mydb");

			var mysort = { elo: -1 };


			dbo.collection("mycol").count({"elo" : { $gt: elo} },function(err, result){
				if (err){ if(db != null)db.close(); return;}
				if(elo == 0) {
					// result = 400 * Math.random();
					// result = Math.ceil(result);
				}
				console.log("math menu : count international" + result + "::"+req.connection.remoteAddress);
				fs.appendFile('loginternational',new Date().getTime()+"&&"+ result.toString()+"::"+req.connection.remoteAddress+"\n", function (err) {
					if (err){ if(db != null)db.close(); return;}
				});
				let res = result+1;

				dbo.collection("mycol").find().sort(mysort).limit(200).toArray(function(err, result) {
					if (err){ if(db != null)db.close(); return;}

					let ans =0+"^Rating " +res+ "\nPoint " + req.query.elo+ "^";
					for(let i = 0; i < result.length; i++) {
						let o = result[i];
						if(o.reg != undefined) o.name += "("+o.reg+")";
						ans += (i+1)+". "+ o.name+" Point " + o.elo + "^";
					}
					resserver.send(ans+"");
					if(db != null)db.close();
				});
			})

		});
	});
	//international












	//wow readFileSync
	let wows = fs.readFileSync("wowcavab") + "";
	wows = wows.split("\n");
	let Arrwow = [], cavabwow = [], preelo={},PRE={};
	let Ewow, secwow=0, testwow="HƏRİNLƏMƏ|HƏRƏ|ƏLƏ|RƏMƏ";
	testwow = wows[getRandom(1,330)]
	app.get('/wow', (req, res) =>{
		let b = 85 - (secwow % 85);
		res.send(b+"|60|"+testwow);
	});
	// get result after 10 secon wating
	app.get('/wowresultb', (req, res) =>{// cavab gonderilir
		let ans = "0^^";
		let name = req.query.name;
		for(let i = 0; i < Ewow.players.length; i++) {
			if(Ewow.players[i].name == name) {
				let change = Ewow.players[i].eloChange;
				if(change > 0) change = "+" + change;
				ans = "";
				if(Arrwow[i] == undefined || Arrwow[i].name == "qedim " || Arrwow[i].name == "DASAQ") continue;
				ans += change+"^Yer:"+(i+1) + "\nSöz:" + Arrwow[i].score + "\n" + "Xal " + change+"^";
				break;
			}
		}
		for(let i = 0; i < Ewow.players.length; i++) {
			let change = Ewow.players[i].eloChange;
			if(change >= 0) change = "+" + change;
			if(Ewow.players[i] == undefined || Arrwow[i] == undefined)continue;
			ans += (i+1)+". " + Ewow.players[i].name+"("+Arrwow[i].reg+")" + " Xal "+ Ewow.players[i].eloPre + "" + change+"  Doğru "+Arrwow[i].score+" "+rat(Ewow.players[i].eloPre)+"^";
		}
		res.send(ans);
	});


	setInterval(function(){
			secwow++;



			if(secwow % 85 == 0) {// oyun bashladi
				Arrwow = [];
				cavabwow = [];
				preelo = {};
				//test = Suallar[getRandom(1,600)];
				testwow = wows[getRandom(1,330)]
				MongoClient.connect(url, function(err, db) {
					if (err) throw err;
					var dbo = db.db("mydb");
					dbo.collection("wowlive").deleteMany({}, function(err, obj) {
						if (err) throw err;
						console.log(obj.result.n + " document(s) deleted??????????????????????????????????????????????????????????????");
						db.close();
					});
				});
			}
			if(secwow % 85 == 67) {// bashla hesablamaga

				Ewow = new c.ELOMatch();
				//from mongodb
				//console.log("hesabla bashladi");
				MongoClient.connect(url, function(err, db) {
					if (err){ if(db != null)db.close(); return;}
					var dbo = db.db("mydb");
					dbo.collection("wowlive").find().sort({score:-1, lasttime:1}).toArray(function(err, result) {
						if (err){ if(db != null)db.close(); return;}
						for(let i = 0; i < result.length; i++) {
							let o = result[i];
							if(preelo[o.name] == undefined || o.name == "DASAQ") continue;
							Arrwow.push({name:o.name, score:parseInt(o.score), lasttime:parseInt(o.lasttime), wowelo:preelo[o.name], reg:o.reg});
							Ewow.addPlayer(o.name, i+1, preelo[o.name]); // tomorrow
							//console.log(o);
						}
						Ewow.calculateELOs();
						for(let i = 0; i < Ewow.players.length; i++) {
							//console.log(Ewow.players[i]);
						}
						if(db != null)db.close();
					});
				});



			}

		}
		, 1000);

	//every 10 second
	app.get('/Wowresult', (req, res) =>{
		let resserver = res;
		MongoClient.connect(url, function(err, db) {
			if (err){ if(db != null)db.close(); return;}
			var dbo = db.db("mydb");
			var myquery = { name: req.query.name};
			var newvalues;
			if(req.query.reg!= undefined) newvalues =  { $set: { name: req.query.name, score : parseInt(req.query.score), lasttime:parseInt(req.query.lasttime), reg:req.query.reg }};
			else newvalues =  { $set: { name: req.query.name, score : parseInt(req.query.score), lasttime:parseInt(req.query.lasttime)}}
			dbo.collection("wowlive").updateOne(myquery, newvalues,{upsert:true}, function(err, res) {
				if (err){ if(db != null)db.close(); return;}
				dbo.collection("wowlive").find().sort({score:-1, lasttime:1}).limit(50).toArray(function(err, result) {
					if (err){ if(db != null)db.close(); return;}
					let ans =" ";
					for(let i = 0; i < result.length; i++) {
						if(result[i].name == req.query.name) {
							ans = "Reyting "+(i+1)+"^";
							break;
						}
					}
					for(let i = 0; i < result.length; i++) {
						let o = result[i];
						if(o.name == "DASAQ") continue;
						let nname = o.name+"";
						if(o.reg != undefined) o.name += "("+o.reg+")";
						ans += (i+1)+". "+ o.name+" Söz " + o.score+" "+ rat(PRE[nname]) + "\n";
						//console.log(PRE[nname] + "  " + rat(PRE[nname]));
					}

					resserver.send(ans+"");
					if(db != null)db.close();
				});
			});
		});
	});

	//elo telefondan gedir menuya
	app.get('/Wowcount', (req, res) =>{
		let resserver = res;
		let wowelo = parseInt(req.query.wowelo);

		MongoClient.connect(url, function(err, db) {
			if (err){ if(db != null)db.close(); return;}
			var dbo = db.db("mydb");

			var mysort = { wowelo: -1 };


			dbo.collection("mycol").count({"wowelo" : { $gt: wowelo} },function(err, result){
				if (err){ if(db != null)db.close(); return;}

				//console.log("wow menu : count " + result + "::"+req.connection.remoteAddress);
				fs.appendFile('logwow',new Date().getTime()+"&&"+ result.toString()+"::"+req.connection.remoteAddress+"\n", function (err) {
					if (err){ if(db != null)db.close(); return;}
				});
				let res = result+1;

				dbo.collection("mycol").find().sort(mysort).limit(200).toArray(function(err, result) {
					if (err){ if(db != null)db.close(); return;}

					let ans =res+"^Reyting " +res+ "\nXal " + req.query.wowelo+ "^";
					for(let i = 0; i < result.length; i++) {
						let o = result[i];
						let obj = {};
						if(o.name == "DASAQ")continue;
						if(o.reg != undefined) o.name += "("+o.reg+")";
						ans += (i+1)+". "+ o.name+" Xal " + o.wowelo+" "+rat(o.wowelo) + "^";
					}
					resserver.send(ans+"");
					if(db != null)db.close();
				});
			})

		});
	});

	app.get('/Wowresultlast', (req, res) =>{
		//console.log("Wowresultlast");
		preelo[req.query.name] = parseInt(req.query.wowelo);
		PRE[req.query.name] = parseInt(req.query.wowelo);
		let resserver = res;
		MongoClient.connect(url, function(err, db) {
			if (err){ if(db != null)db.close(); return;}
			var dbo = db.db("mydb");
			var myquery = { name: req.query.name};
			var newvalues = { $set: { name: req.query.name, wowelo : parseInt(req.query.wowelo) }};
			dbo.collection("mycol").updateOne(myquery, newvalues, {upsert:true},function(err, res) {
				if (err){ if(db != null)db.close(); return;}
				//console.log("elo deyishishdi");
				resserver.send(res);
				if(db != null)db.close();
			});


		});
	});
	app.get('/region', (req, res) =>{
		//console.log("Wowresultlast");

		let resserver = res;
		MongoClient.connect(url,  function(err, db) {
			if (err){ if(db != null)db.close(); return;}
			var dbo = db.db("mydb");
			var myquery = { name: req.query.name};
			dbo.collection("mycol").findOne(myquery,function(err, res) {
				if (err){ if(db != null)db.close(); resserver.send("NONE"); return;}
				//console.log("elo deyishishdi");
				resserver.send(res);
				if(db != null)db.close();
			});


		});
	});





//tr------------------------------------------
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
						//
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

				dbo.collection("mycoltr").find().sort(mysort).limit(200).toArray(function(err, result) {
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

			dbo.collection("mycolregtr").find().sort(mysort).limit(200).toArray(function(err, result) {
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

			dbo.collection("mycoltr").find({reg:reg}).sort(mysort).limit(200).toArray(function(err, result) {
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

//tr------------------------------------------
	//app.listen(80, () => console.log('Example app listening on port 80!'))

	//secure

	httpServer.listen(3000);
	//httpsServer.listen(8443);
	//secure

// var httpServer = http.createServer(app);
// var httpsServer = https.createServer(credentials, app);
//
// httpServer.listen(8080);
// httpsServer.listen(8443);

}
f();