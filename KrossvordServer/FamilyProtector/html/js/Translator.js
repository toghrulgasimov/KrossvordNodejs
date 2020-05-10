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

Translation["permissions"] = {az:"Activate Accesibility Service, Location, Adminstrator for Controlling all apps.", en:"Activate Accesibility Service, Location, Adminstrator for Controlling all apps."};
Translation["activate"] = {az:"Aktivləşdir", en:"Activate"};


Translation["no"] = {az:"Xeyr", en:"No"};
Translation["yes"] = {az:"Bəli", en:"Yes"};
Translation["isParent"] = {az:"Bu cihaz valideyinə aiddir?", en:"Does this device belong to a parent?"};




Translation["name"] = {az:"Ad", en:"Name"};
Translation["enterName"] = {az:"Ad daxil edin.", en:"Enter Name"};
Translation["enterChildName"] = {az:"Uşağın adını daxil edin.", en:"Enter Child's Name."};
Translation["next"] = {az:"Sonrakı", en:"Next"};





var language = navigator.language || navigator.userLanguage;
language = (language + "").toLocaleLowerCase();
if(language.startsWith("az")) {
    language = "az";
}else if(language.startsWith("en")) {
    language = "en";
}
language = "az";
Translation.get = function (s) {
    if(Translation[s] == undefined) return Translation[s]["en"];
    else
    return Translation[s][language];
}
// Translation["login"] = {az:"Daxil ol", en:"Login"};
// Translation["login"] = {az:"Daxil ol", en:"Login"};