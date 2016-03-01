/**
 * Created by Andrew on 2/23/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController(UserService, $location, $scope, $rootScope) {
        $scope.register = register;

        function register(user) {
            if (user == null) {
                return;
            }
            if (!user.username) {
                return;
            }
            if (!user.password || !user.password2) {
                return;
            }
            if (user.password != user.password2) {
                return;
            }
            //$rootScope.user = UserService.findUserByUsername(user.username);
            //Check if user already exists
            //if (user != null) {
            //    return;
            //}
            var callback = function(response){
                $rootScope.currentUser = response;

            };

            UserService.createUser(user, callback);
            $location.url("/profile");
        }
    }
})();