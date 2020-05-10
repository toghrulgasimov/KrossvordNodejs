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

Translation["ppermissions"] = {az:"Activate Accesibility Service, Location, Adminstrator for Controlling all apps.", en:"Activate Accesibility Service, Location, Adminstrator for Controlling all apps."};
Translation["activate"] = {az:"Aktivləşdir", en:"Activate"};


Translation["no"] = {az:"Xeyr", en:"No"};
Translation["yes"] = {az:"Bəli", en:"Yes"};
Translation["isParent"] = {az:"Bu cihaz valideyinə aiddir?", en:"Does this device belong to a parent?"};




Translation["name"] = {az:"Ad", en:"Name"};
Translation["enterName"] = {az:"Ad daxil edin.", en:"Enter Name"};
Translation["enterChildName"] = {az:"Uşağın adını daxil edin.", en:"Enter Child's Name."};
Translation["next"] = {az:"Sonrakı", en:"Next"};



Translation["activities"] = {az:"Gündəlik", en:"Activities"};
Translation["mostUsed"] = {az:"Ən çox istifadə", en:"Most Used"};
Translation["apps"] = {az:"Proqramlar", en:"Apps"};
Translation["locations"] = {az:"Xəritə", en:"Locations"};
Translation["websites"] = {az:"Saytlar", en:"Websites"};
Translation["permissions"] = {az:"İcazələr", en:"Permissions"};
Translation["logout"] = {az:"Çıxış", en:"Logout"};

Translation["today"] = {az:"Bugün", en:"Today"};
Translation["yesterday"] = {az:"Dünən", en:"Yesterday"};
Translation["minute"] = {az:"Dəq.", en:"Min."};
Translation["second"] = {az:"San.", en:"Sec."};
Translation["hour"] = {az:"Saat", en:"H."};

Translation["month1"] = {az:"Proqramı 1 aylıq aktivləşdir.", en:"Activate for 1 months."};
Translation["month3"] = {az:"Proqramı 3 aylıq aktivləşdir.", en:"Activate for 3 months."};
Translation["month6"] = {az:"Proqramı 6 aylıq aktivləşdir.", en:"Activate for 6 months."};
Translation["month12"] = {az:"Proqramı 1 illik aktivləşdir.", en:"Activate for 1 year."};
Translation["price"] = {az:"Qiymət", en:"Price"};
Translation["snumber"] = {az:"Seria nömrəsi", en:"Serial number"};

Translation["aciq"] = {az:"Açıq", en:"Open"};
Translation["bagli"] = {az:"Bağlı", en:"Closed"};

Translation["inUsing"] = {az:"Aktiv", en:"In Using"};
Translation["bax"] = {az:"Bax", en:"Open"};

Translation["uninstallPermission"] = {az:"Proqramı silməyə icazə ver", en:"Allow to uninstall"};
Translation["GPSPermission"] = {az:"GPS-i söndürməyə icazə ver", en:"Allow to turn off GPS"};









var language = navigator.language || navigator.userLanguage;
if(language == undefined) language = "";
language = (language + "").toLocaleLowerCase();
if(language.startsWith("az")) {
    language = "az";
}else {
    language = "en";
}
//language = "az";
Translation.get = function (s) {
    if(Translation[s][language] == undefined) return Translation[s]["en"];
    else
    return Translation[s][language];
}
// Translation["login"] = {az:"Daxil ol", en:"Login"};
// Translation["login"] = {az:"Daxil ol", en:"Login"};