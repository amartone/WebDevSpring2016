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
                controllerAs: "model"
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
                controllerAs: "model"
            })
            .when("/profile/", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/issues", {
                templateUrl: "views/issues/issues.view.html",
                controller: "IssueController",
                controllerAs: "model"
            })
            .when("/users", {
                templateUrl: "views/users/users.view.html",
                controller: "UserController",
                controllerAs: "model"
            })
            .when("/rooms", {
                templateUrl: "views/rooms/room.view.html",
                controller: "RoomController",
                controllerAs: "model"
            })
            .when("/issuedetails/:issueId/", {
                templateUrl: "views/details/issues.details.view.html",
                controller: "IssueController",
                controllerAs: "model"
            })
            .when("/roomdetails/:roomId", {
                templateUrl: "views/details/room.details.view.html",
                controller: "RoomController",
                controllerAs: "model"
            })
            .when("/createissue", {
                templateUrl: "views/issues/create.issue.view.html",
                controller: "IssueController",
                controllerAs: "model"
            })
            .when("/createroom", {
                templateUrl: "views/rooms/create.room.view.html",
                controller: "RoomController",
                controllerAs: "model"
            })
            .when("/editissue/:issueId/", {
                templateUrl: "views/issues/edit.issue.view.html",
                controller: "IssueController",
                controllerAs: "model"
            })
            .when("/editroom/:roomId", {
                templateUrl: "views/rooms/room.edit.view.html",
                controller: "RoomController",
                controllerAs: "model"
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();