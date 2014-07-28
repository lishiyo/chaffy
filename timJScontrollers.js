angular.module('timjsChat.controllers', ['timjsChat.services'])

.controller('ChatCtrl', function($scope, $stateParams, $timeout, $ionicScrollDelegate, ChatService) {

  $scope.newMessage = "";
  $scope.messagesObj = ChatService.chatMessagesRef;


  var scrollBottom = function() {
    // Resize and then scroll to the bottom
    $ionicScrollDelegate.resize();
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom();
    });
  };

  $scope.$watch('messagesObj', function (value) {
    var messagesObj = angular.fromJson(angular.toJson(value));
    $timeout(function () {scrollBottom()});
    $scope.messages = [];

    angular.forEach(messagesObj, function (message, key) {
      $scope.messages.push(message);
    });
  }, true);



  $scope.submitAddMessage = function() {
    $scope.messagesObj.$add({
      created_by: ChatService.getUsername(),
      content: this.newMessage,
      created_at: new Date()
    });
    this.newMessage = "";
    scrollBottom();
  };

})



.controller('SettingsCtrl', function($scope, ChatService, $state) {

          $scope.data = {
                   username: ChatService.getUsername()
           };

           $scope.setUsername = function() {
             ChatService.setUsername($scope.data.username);
             $state.go('chat');
           }

})



.controller('AboutCtrl', function($scope) {})

.controller('AppCtrl', function($scope, $state) {});