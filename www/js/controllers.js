var jGlob;

//for the map drag interval below for map
var cInt;


angular.module('chatRoom.controllers', [])
/**
.factory('getLoc', function ($scope, $timeout, angularFire) {
        $scope.getUserLocation = function(){
          return [parseFloat(localStorage.getItem('lat')), parseFloat(localStorage.getItem('lon'))]; 
        }

        $scope.currentLocation=$scope.getUserLocation();

        return {
            getLat: function() {
              if($scope.currentLocation) {
        // =[position.coords.latitude, position.coords.longitude]
                return $scope.getUserLocation()[0];
              } else {
                return 40.777225004040009;
              }
            },
            getLon: function() {
              if($scope.currentLocation) {
                return $scope.getUserLocation()[1];
              } else {
                return -73.95218489597806;
            }
        }
  }
})
**/
.controller('LoadingCtrl', function($scope, $ionicLoading) {
  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  }})
.controller('AppCtrl', function($scope, $location) {

  clearInterval(cInt);
  $scope.goToNewRoom = function() {
    $location.path('/rooms/new');
    $scope.toggleSideMenu();
  };

  $scope.goToNewRoomDirect = function() {
    $location.path('/rooms/new');
  };
  
  $scope.goToAbout = function() {
    $location.path('/about');
    $scope.toggleSideMenu();
  };
  
  $scope.goToHome = function() {
    $location.path('/home');
  };  

  $scope.goToLaunch = function() {
    $location.path('/launch');
    $scope.toggleSideMenu();
  }; 

   $scope.updateMap = function() {
    $location.path('/launch');
  }; 
    
  $scope.toggleSideMenu = function() {
    $scope.sideMenuController.toggleLeft();
  };

})

.controller('MainCtrl', function($scope, $timeout, angularFire) {
clearInterval(cInt);

  //get user location from map


  

  $scope.rooms = [];
  var ref = new Firebase('https://blistering-fire-5269.firebaseio.com/opened_rooms');  
  

 /*

  var geoFire = new GeoFire(ref);
console.log(userPosition)
  
 geoFire.get("location", userPosition).then(function() {
  console.log(location);
  console.log("Provided key has been added to GeoFire");
}, function(error) {
  console.log("Error: " + error);
});


var geoQuery = geoFire.query({
  center: userPosition,
  radius: 1.609 //kilometers
});

geoQuery.on("key_entered", function(key, location, distance) {
 alert("Bicycle shop " + key + " found at " + location + " (" + distance + " km away)");
});

   var messageListQuery = ref.limit(5);

messageListQuery.on('child_added', function(snapshot) {
  var messageInfo = snapshot.val();
  console.log(messageInfo)
  //alert('User ' + messageInfo.user_id + ' said: ' + messageInfo.text);
});


*/
  var promise = angularFire(ref, $scope, "rooms");

  $scope.sortLoc = {
/*
    distanceFromHere :function (_item, _startPoint) {
    var start = null;

    var radiansTo = function (start, end) {
      var d2r = Math.PI / 180.0;
      var lat1rad = start.latitude * d2r;
      var long1rad = start.longitude * d2r;
      var lat2rad = end.latitude * d2r;
      var long2rad = end.longitude * d2r;
      var deltaLat = lat1rad - lat2rad;
      var deltaLong = long1rad - long2rad;
      var sinDeltaLatDiv2 = Math.sin(deltaLat / 2);
      var sinDeltaLongDiv2 = Math.sin(deltaLong / 2);
      // Square of half the straight line chord distance between both points.
      var a = ((sinDeltaLatDiv2 * sinDeltaLatDiv2) +
              (Math.cos(lat1rad) * Math.cos(lat2rad) *
                      sinDeltaLongDiv2 * sinDeltaLongDiv2));
      a = Math.min(1.0, a);
      return 2 * Math.asin(Math.sqrt(a));
    };

    if ($scope.currentLocation) {
      start = {
        longitude: $scope.currentLocation[0],
        latitude: $scope.currentLocation[1]
      };
    }
    start = _startPoint || start;

    var end = {
      longitude: _item.location.lng,
      latitude: _item.location.lat
    };

    var num = radiansTo(start, end) * 3958.8;
    return Math.round(num * 100) / 100;
  }
*/
  }
  $scope.currentLocation=userPosition;


  $scope.booyah= function(){
    return 2;
  }

  $scope.getUserLocation = function(){

  return [parseFloat(localStorage.getItem('lat')), parseFloat(localStorage.getItem('lon'))]; 

  }

  $scope.currentLocation=$scope.getUserLocation();

  

  $scope.goToIt = function(theUrl){

    window.location=theUrl;
  }
  
  $scope.distanceFromHere = function (_item, _startPoint) {
/*
    var start = null;

    var radiansTo = function (start, end) {
      var d2r = Math.PI / 180.0;
      var lat1rad = start.latitude * d2r;
      var long1rad = start.longitude * d2r;
      var lat2rad = end.latitude * d2r;
      var long2rad = end.longitude * d2r;
      var deltaLat = lat1rad - lat2rad;
      var deltaLong = long1rad - long2rad;
      var sinDeltaLatDiv2 = Math.sin(deltaLat / 2);
      var sinDeltaLongDiv2 = Math.sin(deltaLong / 2);
      // Square of half the straight line chord distance between both points.
      var a = ((sinDeltaLatDiv2 * sinDeltaLatDiv2) +
              (Math.cos(lat1rad) * Math.cos(lat2rad) *
                      sinDeltaLongDiv2 * sinDeltaLongDiv2));
      a = Math.min(1.0, a);
      return 2 * Math.asin(Math.sqrt(a));
    };

    if ($scope.currentLocation) {
      console.log($scope.getUserLocation());
      start = {
        longitude: $scope.getUserLocation()[0],
        latitude: $scope.getUserLocation()[1]
      };
    }

    start = _startPoint || start;

    var end = {
      longitude: _item.longitude,
      latitude: _item.latitude
    };
    //console.log(end);


    var num = radiansTo(start, end) * 3958.8;
        //console.log(Math.round(num * 100) / 100);
    return Math.round(num * 100 / 10000);
  
*/

lat2 = $scope.getUserLocation()[0];
lon2 = $scope.getUserLocation()[1];
lat1 =_item.latitude;
lon1 = _item.longitude;
console.log(lon1);
var R = 6371; // Radius of the earth in km
   var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);  
   var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return (d* 0.621371).toFixed(2);
  }

jGlob = $scope; 
  $scope.onRefresh = function() { 
      
    var stop = $timeout(function() {            
      $scope.$broadcast('scroll.refreshComplete');
    }, 1000);
  };
})

.controller('NewRoomCtrl', function($scope, $location, angularFire) {      
  $scope.rooms = [];
  var ref = new Firebase('https://blistering-fire-5269.firebaseio.com/opened_rooms');  
  var promise = angularFire(ref, $scope, "rooms");
  
  $scope.newRoomName = "";
  $scope.newRoomNameId = "";
  $scope.newRoomDescription = "";


  $scope.setNewRoomNameId = function() {
    this.newRoomNameId = this.newRoomName.toLowerCase().replace(/\s/g,"-").replace(/[^a-z0-9\-]/g, '');
  };
  
  $scope.createRoom = function() {
    $scope.rooms.push({
      id: Math.floor(Math.random() * 5000001),
      title: $scope.newRoomName,
      slug: $scope.newRoomNameId, 
      location:userPosition,
      longitude: userPosition[1],
      latitude: userPosition[0],
      description: $scope.newRoomDescription
    });
    
    $location.path('/home');
  };
})

.controller('RoomCtrl', function($scope, $routeParams, $timeout, angularFire) {
  $scope.newMessage = "";
  $scope.messages = [];

setTimeout(function() {
  //alert();
  //  var delegate = $ionicScrollDelegate.$getByHandle('myScroll');

    // rest of related code included here...

},10);
  var ref = new Firebase('https://blistering-fire-5269.firebaseio.com/rooms/' + $routeParams.roomId);
   ref.on('value', function(dataSnapshot) {
  // code to handle new value.

  setTimeout(function(){
 $(".scroll").css('-webkit-transform','translate3d(0px, -'+(parseInt($('.scroll').css('height'))-250)+"px"+', 0px)');
    },500);


// connie
  $('#mainInput').on('focus', function(){
     $(".scroll").css('-webkit-transform','translate3d(0px, -'+(parseInt($('.scroll').css('height'))-190)+"px"+', 0px)');
  });
});

  
  var ref = new Firebase('https://blistering-fire-5269.firebaseio.com/rooms/' + $routeParams.roomId);
  var promise = angularFire(ref, $scope, "messages");
  
  // $scope.username = 'User' + Math.floor(Math.random() * 501);

  $scope.username = localStorage.getItem("localusername");
  $scope.userGender = localStorage.getItem("localuserGender");
  $scope.userAge = localStorage.getItem("localuserAge");

  $scope.submitAddMessage = function() {
  
    $scope.messages.push({
      created_by: this.username,
      content: this.newMessage,
      created_at: new Date(),
      userGender: this.userGender,
      userAge: this.userAge
    });
    this.newMessage = "";

    setTimeout(function(){
      $('#mainInput').blur();
    }, 10);
  };
  
  $scope.onRefresh = function() {
    var stop = $timeout(function() {
      $scope.$broadcast('scroll.refreshComplete');
    }, 1000);
  };
})

.controller('AboutCtrl', function($scope) {
})

.controller('LaunchCtrl', function($scope, $location, angularFire) {
/**
$scope.getUserLocation = function(){
  return [parseFloat(localStorage.getItem('lat')), parseFloat(localStorage.getItem('lon'))]; 
  }

$scope.currentLocation=$scope.getUserLocation();

  if($scope.currentLocation) {
        // =[position.coords.latitude, position.coords.longitude]
        var lat = $scope.getUserLocation()[0];
        var lon = $scope.getUserLocation()[1];
  } else {
        //default from app.js
        var lat = 40.777225004040009;
        var lon = -73.95218489597806;
  }
**/

clearInterval(cInt);
cInt = setInterval(function(){

      
   userPosition[0]= parseFloat(angular.element(document.getElementById('firstElem')).scope().circle.center.latitude);
           userPosition[1]= parseFloat(angular.element(document.getElementById('firstElem')).scope().circle.center.longitude);
          

          localStorage.setItem('lat', userPosition[0])
           localStorage.setItem('lon', userPosition[1])

           

           console.log('got location'+ userPosition[0] );

           



  }, 1000)

  


  
  
  var ref = new Firebase('https://blistering-fire-5269.firebaseio.com');  
  var userRef = ref.child("users");
  $scope.userRef = [];
  $scope.userGender = "";
  $scope.userAge = "";
  /** what's this variable used for? **/
  var promise = angularFire(userRef, $scope, "userRef");

  $scope.findChats = function() {
    
    // $scope.username = 'User' + Math.floor(Math.random() * 501);
    $scope.username = $scope.userAlias;
    localStorage.setItem("localusername", $scope.username );


    $scope.setUserGender = function(){
       if ($scope.userGender==0) {
        return 'male';
      } else if ($scope.userGender==1) {
        return 'female';
      } else {
        return 'anon';
      }
    }
    localStorage.setItem("localuserGender", $scope.setUserGender());
    $scope.setUserAge = function(){
       if ($scope.userAge==0) {
        return '18-29';
      } else if ($scope.userAge==1) {
        return '30-49';
      } else if ($scope.userAge==2) {
        return '49+';
      } else {
        return 'anon';
      }
    }
    localStorage.setItem("localuserAge", $scope.setUserAge());

    userRef.push({
      username: localStorage.getItem("localusername"),
      gender: $scope.setUserGender(),
      age: $scope.setUserAge()
    });

    $location.path('/home');
  };

/** map **/  

/**
var userPosition =[40.777225004040009, -73.95218489597806];
**/



$scope.map = {
    center: {
      latitude: userPosition[0],
      longitude: userPosition[1]
    },
    zoom: 13,
    refresh:true
};

$scope.circle = {
  center: {
      latitude: userPosition[0],
      longitude: userPosition[1]
    },
  fill: {
    color: "#FF2A58",
    opacity: 0.40
  },
  stroke: {
    weight: 2,
    color: "#FF2A58",
    opacity: 1
  },
  radius: 1000,
  geodesic: true
};

/*
setTimeout(function(){

  alert('about to change!')

  $('.angular-google-map-container').css({width:"auto", "height":"200px"})
}, 2000)
*/

});