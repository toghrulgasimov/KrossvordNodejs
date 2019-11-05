let fs = require('fs');

let s = "01 Adana\n" +
    "02 Adıyaman\n" +
    "03 Afyon\n" +
    "04 Ağrı\n" +
    "05 Amasya\n" +
    "06 Ankara\n" +
    "07 Antalya\n" +
    "08 Artvin\n" +
    "09 Aydın\n" +
    "10 Balıkesir\n" +
    "11 Bilecik\n" +
    "12 Bingöl\n" +
    "13 Bitlis\n" +
    "14 Bolu\n" +
    "15 Burdur\n" +
    "16 Bursa\n" +
    "17 Çanakkale\n" +
    "18 Çankırı\n" +
    "19 Çorum\n" +
    "20 Denizli\n" +
    "21 Diyarbakır\n" +
    "22 Edirne\n" +
    "23 Elazığ\n" +
    "24 Erzincan\n" +
    "25 Erzurum\n" +
    "26 Eskişehir\n" +
    "27 Gaziantep\n" +
    "28 Giresun\n" +
    "29 Gümüşhane\n" +
    "30 Hakkari\n" +
    "31 Hatay\n" +
    "32 Isparta\n" +
    "33 İçel (Mersin)\n" +
    "34 İstanbul\n" +
    "35 İzmir\n" +
    "36 Kars\n" +
    "37 Kastamonu\n" +
    "38 Kayseri\n" +
    "39 Kırklareli\n" +
    "40 Kırşehir\n" +
    "41 Kocaeli\n" +
    "42 Konya\n" +
    "43 Kütahya\n" +
    "44 Malatya\n" +
    "45 Manisa\n" +
    "46 K.maraş\n" +
    "47 Mardin\n" +
    "48 Muğla\n" +
    "49 Muş\n" +
    "50 Nevşehir\n" +
    "51 Niğde\n" +
    "52 Ordu\n" +
    "53 Rize\n" +
    "54 Sakarya\n" +
    "55 Samsun\n" +
    "56 Siirt\n" +
    "57 Sinop\n" +
    "58 Sivas\n" +
    "59 Tekirdağ\n" +
    "60 Tokat\n" +
    "61 Trabzon\n" +
    "62 Tunceli\n" +
    "63 Şanlıurfa\n" +
    "64 Uşak\n" +
    "65 Van\n" +
    "66 Yozgat\n" +
    "67 Zonguldak\n" +
    "68 Aksaray\n" +
    "69 Bayburt\n" +
    "70 Karaman\n" +
    "71 Kırıkkale\n" +
    "72 Batman\n" +
    "73 Şırnak\n" +
    "74 Bartın\n" +
    "75 Ardahan\n" +
    "76 Iğdır\n" +
    "77 Yalova\n" +
    "78 Karabük\n" +
    "79 Kilis\n" +
    "80 Osmaniye\n" +
    "81 Düzce";


  let t = s.split('\n');
  let ans = '';
  for(let i = 0; i < t.length; i += 1) {
      let s = t[i].split(' ');
      console.log(s[1]);
      ans += '"'+s[1]+'",'
  }
  console.log(ans)