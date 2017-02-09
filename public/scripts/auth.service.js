angular.module('passportApp').service('AuthService', function ($http, $location){

//no param cuz info is coming from params.
//get user's profile with login Status
  this.checkLoginStatus = function (){
  return $http.get('/loginStatus').then(function (res){
      if (res.data){
        console.log('User is logged in');
        return;
      } else {
        console.log('User is not logged in');
        // send them to the login view
        return $location.path('/');
      }
    });
  }
});
