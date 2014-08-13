// Note that using angularFire with $scope properties should be avoided

angular.module('chatRoom.services', [])

.service('CheckUserHasRoom', function ($firebase, UserAddRoom) {
// this service checks if this room is already in user's myRooms
  this.hasRoom = function(routeParamsId) {

    var usersRef = new Firebase('https://chaffy.firebaseio.com/users');
    var userID = localStorage.getItem('localUserID');
    var thisUser = usersRef.child(userID);
    var userPromise = $firebase(thisUser.child("myRooms")).$asArray();

var hasRoom = false;
userPromise.$loaded().then(function(arr) {
  for (var idx=0; idx < arr.length; idx ++) {
    var roomId = arr[idx].$value;
    if (routeParamsId == roomId) {
      //console.log("found the room: " + roomId);
      return hasRoom = true;
      break;
    }
  } // for
}).then(function() {
  //console.log("CheckUserHasRoom's hasRoom is: " + hasRoom);
  return hasRoom;
}).then(function(hasRoom) {
  if (hasRoom == false) {
    var roomToAdd = parseFloat(routeParamsId);
    console.log("hasRoom is " + hasRoom + " so calling roomToAdd: " + roomToAdd);
    UserAddRoom.addMyRoom(roomToAdd);
  } else {
    console.log("hasRoom is " + hasRoom + " so didn't run UserAddRoom!");
  }
}); // userPromise

} // this.hasRoom

})

.service('UserAddRoom', function ($firebase) {
  //this service adds a roomId to the user's myRooms array

  this.addMyRoom = function(roomToAdd) {

    var usersRef = new Firebase('https://chaffy.firebaseio.com/users');
    var userID = localStorage.getItem('localUserID');
    var thisUser = usersRef.child(userID);
    var userPromise = $firebase(thisUser.child("myRooms")).$asArray();

    userPromise.$loaded().then(function(arr) {
      var myRooms = arr;

      if (myRooms=""){ // myRooms empty
        var roomsArray = [];
        roomsArray.push(roomToAdd);
        
        console.log("myRooms empty, init with: " + roomsArray);
      } else { // myRooms has rooms already 
        var roomsArray = [];
        
        for (var idx=0; idx < arr.length; idx ++) {
          var roomId = arr[idx].$value;
          roomsArray.push(roomId);
        }

        roomsArray.push(roomToAdd);
      } // else

      return roomsArray;
    })

    .then(function(roomsArray) {

      var thisUserPromise = $firebase(thisUser);
      thisUserPromise.$update({
          myRooms: roomsArray
      });
      
      console.log("myRooms updated to: " + roomsArray);
    });

  } // this.addMyRoom();

})

.factory('Flushing', function ($firebase) {

  function flushMessages(roomId) {
    var roomsRef = new Firebase('https://chaffy.firebaseio.com/rooms/' + roomId);
   
    roomsRef.endAt().limit(2).once('value', function(snap){
      var data = snap.val();
      roomsRef.setWithPriority(data, Firebase.ServerValue.TIMESTAMP);
    });

  } //flushMessages()

  function flushAll() {
    var allRooms = new Firebase('https://chaffy.firebaseio.com/rooms');
    var promise = $firebase(allRooms).$asArray();

    promise.$loaded().then(function(arr) {
      for (var idx=0; idx < arr.length; idx ++) {
        var roomId = arr.$keyAt(idx);
        console.log("roomId is: " + roomId);
        flushMessages(roomId);
      }
    });
      
  } // flushAll();

  return {
    thisRoom: function (roomId) {
      flushMessages(roomId);
    },
    allRooms: function() {
      flushAll();
    }
  }; //return

});

/**
.factory('Rooms', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var rooms = [
    { id: 0, title: 'WDI HK Sept 2013 Instructors', slug: "wdi-hk-sept-2013-instructors", description: 'Instructors only.', messages: [{created_by: "Eddie Lau 1", content: "Hello World", created_at: new Date()}, {created_by: "Eddie Lau 2", content: "Hello World", created_at: new Date()}] },
    { id: 1, title: 'WDI HK Sept 2013 Secrets', slug: "wdi-hk-sept-2013-secrets", description: 'Making fun of instructors. Cats and Baby gif here.', messages: [{created_by: "Eddie Lau 3", content: "Hello World", created_at: new Date()}, {created_by: "Eddie Lau 4", content: "Hello World", created_at: new Date()}] },
    { id: 2, title: 'WDI NY Sept 2013', slug: "wdi-ny-sept-2013", description: 'All students in the course.', messages: [{created_by: "Eddie Lau 5", content: "Hello World", created_at: new Date()}, {created_by: "Eddie Lau 6", content: "Hello World", created_at: new Date()}] },
    { id: 3, title: 'WDI NY Dec 2013', slug: "wdi-ny-dec-2013", description: 'All students in the course.', messages: [{created_by: "Eddie Lau 7", content: "Hello World", created_at: new Date()}, {created_by: "Eddie Lau 8", content: "Hello World", created_at: new Date()}] },
  ];

  return {
    all: function() {
      return rooms;
    },
    get: function(roomId) {
      // Simple index lookup
      return rooms[roomId];
    },
    add: function(title, slug, description) {
      var newRoom = {
        id: rooms.length,
        title: title,
        slug: slug,
        description: description
      };
      rooms.push(newRoom);
      return newRoom;
    }
  }
});
**/