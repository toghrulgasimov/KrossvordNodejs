// http://nodejs.org/api.html#_child_processes
var sys = require('sys')
var exec = require('child_process').exec;
var child;
// executes `pwd`
child = exec("pwd", function (error, stdout, stderr) {

    if (error !== null) {
        console.log('exec error: ' + error);
    }
});
// or more concisely
var sys = require('sys')
var exec = require('child_process').exec;
var request = require('sync-request');

async function  puts(error, stdout, stderr) {
    await exec("sudo forever start index.js", function (er, st, ster) {
        
    });
}
setInterval(async function () {

    try {
//http://34.125.242.46/
        var res = request('GET', 'http://34.125.242.46/versia' , {timeout:3000});
        let s = res.getBody() + "";
        console.log(s);
    }catch (e) {

        await exec("sudo forever stop index.js", puts);
        
    }

}, 5000);
