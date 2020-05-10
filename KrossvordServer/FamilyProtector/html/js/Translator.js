var Translation = {};
Translation["login"] = {az:"Daxil ol", en:"Login"};
Translation["signUp"] = {az:"Qeydiyyat", en:"Sign Up"};
Translation["forgotPassword"] = {az:"Parolu unutmusun?", en:"Forgot Password?"};
Translation["password"] = {az:"Şifrə", en:"Password"};
Translation["confirm"] = {az:"testiqleyin", en:"confirm"};
var language = navigator.language || navigator.userLanguage;
language = (language + "").toLocaleLowerCase();
if(language.startsWith("az")) {
    language = "az";
}else if(language.startsWith("en")) {
    language = "en";
}
// Translation["login"] = {az:"Daxil ol", en:"Login"};
// Translation["login"] = {az:"Daxil ol", en:"Login"};