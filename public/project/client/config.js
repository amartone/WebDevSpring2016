/**
 * Created by Andrew on 2/24/16.
 */
(function(){
    angular
        .module("ProjectIssuesApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
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
            .when("/profile/:userId/", {
                templateUrl: "views/users/profile.details.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/profile/", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve:{
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/issues", {
                templateUrl: "views/issues/issues.view.html",
                controller: "IssueController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/users", {
                templateUrl: "views/users/users.view.html",
                controller: "UserController",
                controllerAs: "model"
            })
            .when("/rooms", {
                templateUrl: "views/rooms/room.view.html",
                controller: "RoomController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/issuedetails/:issueId/", {
                templateUrl: "views/details/issues.details.view.html",
                controller: "IssueController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/roomdetails/:roomId", {
                templateUrl: "views/details/room.details.view.html",
                controller: "RoomController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/createissue", {
                templateUrl: "views/issues/create.issue.view.html",
                controller: "IssueController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/createroom", {
                templateUrl: "views/rooms/create.room.view.html",
                controller: "RoomController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/editissue/:issueId/", {
                templateUrl: "views/issues/edit.issue.view.html",
                controller: "IssueController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/editroom/:roomId", {
                templateUrl: "views/rooms/room.edit.view.html",
                controller: "RoomController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
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

        function checkLoggedIn(UserService, $q, $location) {

            var deferred = $q.defer();

            UserService.getCurrentUser()
                .then(function(response) {
                    var currentUser = response.data;
                    if(currentUser) {
                        UserService.setCurrentUser(currentUser);
                        deferred.resolve();
                    } else {
                        deferred.reject();
                        $location.url("/home");
                    }
                });

            return deferred.promise;
        }

    })();
