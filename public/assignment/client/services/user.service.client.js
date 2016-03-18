/**
 * Created by Andrew on 3/15/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService($http, $rootScope) {
        var api = {
            findUserByCredentials: findUserByCredentials,
            setCurrentUser: setCurrentUser,
            register: register,
            logout: logout,
            updateUser: updateUser,
            getLoggedIn: getLoggedIn,
            findUserById: findUserById
        };

        return api;

        function updateUser(userId, user){
            return $http.put("/api/assignment/user/" + userId, user);
        }

        function register(user) {
            console.log(user.lastName);
            return $http.post("/api/assignment/user", user);
        }

        function logout() {
            $rootScope.currentUser = null;
        }

        function setCurrentUser(user) {
            console.log("Setting current user to: " + user.username);
            $rootScope.currentUser = user;
        }

        function findUserByCredentials(username, password) {
            console.log(username);
            console.log(password);
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function getLoggedIn(){

            return $rootScope.currentUser;
        }

        function findUserById(userId){
            return http.get("/api/assignment/user/", userId);
        }

    }
})();