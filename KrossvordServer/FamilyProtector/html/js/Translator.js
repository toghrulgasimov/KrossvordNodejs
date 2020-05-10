var Translation = {};
Translation["login"] = {az:"Daxil ol", en:"Login"};
Translation["signUp"] = {az:"Qeydiyyat", en:"Sign Up"};
Translation["forgotPassword"] = {az:"Parolu unutmusun?", en:"Forgot Password?"};
Translation["password"] = {az:"Şifrə", en:"Password"};
Translation["confirm"] = {az:"Şifrəni təkrarlayın", en:"confirm"};

Translation["wrongEmailOrPassword"] = {az:'Email və ya şifre yanlışdır.', en:"Wrong Password or Email."};
Translation["serverError"] = {az:"Server Error", en:"Server Error"};
Translation["enterPassword"] = {az:"Şifrə daxil edin.", en:"Enter Password"};
Translation["enterEmail"] = {az:'Email daxil edin.', en:"Enter Email"};
Translation["theUserNameIsTaken"] = {az:"Bu Email mövcuddur.", en:"The username is taken. Try another."};
Translation["enterPasswordAgain"] = {az:"Şifrəni yenidən daxil edin.", en:"Enter Password again."};
Translation["passwordIsDifferent"] = {az:"Şifrələr fərqlidir.", en:"Passwords are different."};

var language = navigator.language || navigator.userLanguage;
language = (language + "").toLocaleLowerCase();
if(language.startsWith("az")) {
    language = "az";
}else if(language.startsWith("en")) {
    language = "en";
}
Translation.get = function (s) {
    return Translation[s][language];
}
// Translation["login"] = {az:"Daxil ol", en:"Login"};
// Translation["login"] = {az:"Daxil ol", en:"Login"};