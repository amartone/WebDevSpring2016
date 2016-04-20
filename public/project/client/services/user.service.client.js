/**
 * Created by Andrew on 3/28/16.
 */
(function(){
    angular
        .module("ProjectIssuesApp")
        .factory("UserService", userService);

    function userService($http, $rootScope) {
        var api = {
            findAllUsers: findAllUsers,
            findUserByCredentials: findUserByCredentials,
            setCurrentUser: setCurrentUser,
            register: register,
            logout: logout,
            updateUser: updateUser,
            getLoggedIn: getLoggedIn,
            findUserById: findUserById,
            deleteUserById: deleteUserById,
            getCurrentUser: getCurrentUser
        };

        return api;


        function getCurrentUser(){
                return $http.get("/api/project/loggedin");
            }

        function findAllUsers(){
            return $http.get("/api/project/user/");
        }
        function updateUser(userId, user){
            return $http.put("/api/project/user/" + userId, user);
        }

        function register(user) {
            console.log(user.lastName);
            return $http.post("/api/project/user", user);
        }

        function logout() {
            $rootScope.currentUser = null;
            return $http.post("/api/project/logout");
        }

        function setCurrentUser(user) {
            console.log("Setting current user to: " + user.username);
            $rootScope.currentUser = user;
        }

        function findUserByCredentials(username, password) {
            console.log(username);
            console.log(password);
            return $http.get("/api/project/user?username=" + username + "&password=" + password);
        }

        function getLoggedIn(){

            return $rootScope.currentUser;
        }

        function findUserById(userId){
              return $http.get("/api/project/user/" + userId);
          }

        function deleteUserById(userId){
            return $http.delete("/api/project/user/" + userId);
        }
    }
})();
