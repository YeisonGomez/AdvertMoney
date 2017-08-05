var api = "http://localhost:3006";

angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http) {

  $scope.loginData = {};
  $scope.login = login;
  $scope.generate = generate;
  $scope.logout = logout;
  $scope.username = "";
  $scope.money = -1;
  $scope.error = undefined;
  $scope.limit = false;

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    activate();
  });

  function activate(){
    if(!getLocal("session")){
      login();
    } else {
      $scope.username = getLocal('username');
      $scope.money = getLocal('money') || -1;
    }
  }

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  function login() {
    $scope.modal.show();
  };

  $scope.doLogin = function() {
    $http.post(api + "/login", { user: $scope.loginData.username, password: $scope.loginData.password })
    .then(function(data){
      if(data.data.state == 'OK'){
        localStorage.setItem('session', data.data.cookie);
        localStorage.setItem('username', $scope.loginData.username);
        $scope.username = $scope.loginData.username;
        $scope.loginData = {};
        $scope.error = undefined;
        $scope.closeLogin();
      } else {
        $scope.error = true;
      }
    });
  };

  function generate(){
    $http.post(api + "/generate", { session: getLocal("session") })
    .then(function(data){
      if(data.data.state == 'OK'){
        if($scope.money == data.data.money){
          $scope.limit = true;
        }
        $scope.money = data.data.money;
        localStorage.setItem('money', $scope.money);
      } else {
        logout();
      }
    });
  }

  function logout(){
    $scope.money = -1;
    $scope.limit = false;
    $scope.username = "";
    localStorage.clear();
    login();
  }

  function getLocal(key){
    return localStorage.getItem(key);
  }
})

.controller('PlaylistsCtrl', function($scope) {
})
