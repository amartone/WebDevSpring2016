/**
 * Created by Andrew on 2/23/16.
 */
(function(){
    angular
        .module("ProjectIssuesApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {
        var vm = this;
        vm.register = register;

        function init() {

        }
        init();
        function register(user) {
            console.log(user.firstName);

            UserService
                .register(user)
                .then(function (response) {
                    var currentUser = response.data;
                    if (currentUser != null) {
                        UserService.setCurrentUser(currentUser);
                        $location.url("/profile");
                    }
                });
        }
    }

})();