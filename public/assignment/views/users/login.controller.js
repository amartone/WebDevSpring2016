/**
 * Created by Andrew on 2/23/16.
 */
/**
 * Created by Andrew on 2/23/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location, $scope, $rootScope) {
        $scope.login = login;

        function login(user) {

            var callback = function(response){
                $rootScope.currentUser = response;
                console.log("logging in");
                $location.url("/profile");
            };

            UserService.findUserByCredentials(user.username, user.password, callback);
            //console.log(currentUser);
        }
    }
})();