/**
 * Created by Andrew on 2/24/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                resolve: {
                  loggedIn: checkCurrentUser
                }
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"

            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve:{
                    loggedIn: checkLoggedIn
                }

            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "FormFieldsController",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/fields", {
                templateUrl: "views/forms/field.view.html",
                controller: "FieldController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/form/:formId/fields", {
                templateUrl: "views/forms/field.view.html",
                controller: "FieldController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response){
                var currentUser = response.data;
                UserService.setCurrentUser(currentUser);
                deferred.resolve();
            });

        return deferred.promise;
    }

    // function checkLoggedIn(UserService, $q, $location) {
    //
    //     var deferred = $q.defer();
    //
    //     UserService.getCurrentUser()
    //         .then(function(response) {
    //             var currentUser = response.data;
    //
    //             if(currentUser) {
    //                 UserService.setCurrentUser(currentUser);
    //                 deferred.resolve();
    //             } else {
    //                 deferred.reject();
    //                 $location.url("/home");
    //             }
    //         });
    //
    //     return deferred.promise;
    // }


  var checkLoggedIn = function($q, $timeout, $http, $location, $rootScope)
  {
      var deferred = $q.defer();

      $http.get('/api/assignment/loggedIn').success(function(user)
      {
          $rootScope.errorMessage = null;
          // User is Authenticated
          if (user !== '0')
          {
              $rootScope.currentUser = user;
              deferred.resolve();
          }
          // User is Not Authenticated
          else
          {
              $rootScope.errorMessage = 'You need to log in.';
              deferred.reject();
              $location.url('/login');
          }
      });

      return deferred.promise;
  };

  var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedIn').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };


})();
