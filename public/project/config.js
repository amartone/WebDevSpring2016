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
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })

            .when("/issues", {
                templateUrl: "views/issues/issues.view.html",
                controller: "IssueController"
            })
            .when("/users", {
                templateUrl: "views/users/users.view.html",
                controller: "UserController"
            })
            .when("/rooms", {
                templateUrl: "views/rooms/room.view.html",
                controller: "RoomController"
            })
            .when("/issuedetails", {
                templateUrl: "views/details/issues.details.view.html"
            })
            .when("/roomdetails", {
                templateUrl: "views/details/room.details.view.html"
            })
            .when("/createissue", {
                templateUrl: "views/issues/create.issue.view.html"
            })
            .when("/editissue", {
                templateUrl: "views/issues/edit.issue.view.html"
            })
            .when("/editroom", {
                templateUrl: "views/rooms/room.edit.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();