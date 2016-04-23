/**
 * Created by Andrew on 3/15/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService($http, $rootScope) {
        var api = {
            login: login,
            setCurrentUser: setCurrentUser,
            register: register,
            logout: logout,
            updateUser: updateUser,
            getLoggedIn: getLoggedIn,
            findUserById: findUserById,
            getCurrentUser: getCurrentUser
        };

        return api;

        function getCurrentUser(){
            return $http.get("/api/assignment/loggedIn");
        }

        function updateUser(userId, user){
            return $http.put("/api/assignment/user/" + userId, user);
        }

        function register(user) {
            return $http.post("/api/assignment/register", user);
        }

        function logout() {
          return $http.post("/api/assignment/logout");
        }

        function setCurrentUser(user) {
            console.log("Seting current user to:" + user.username);
            $rootScope.currentUser = user;
        }

        function login(user) {
            return $http.post("/api/assignment/login", user);
        }

        function getLoggedIn(){
            console.log("Getting logged in user:" + $rootScope.currentUser.username);
            return $rootScope.currentUser;
        }

        function findUserById(userId){
            return http.get("/api/assignment/user/", userId);
        }

    }
})();
