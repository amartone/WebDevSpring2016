/**
 * Created by Andrew on 2/23/16.
 */
/**
 * Created by Andrew on 2/23/16.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function init() {
        }

        init();

        function login(user) {
            if (!user) {
                return;
            }
            UserService
                .login(user)
                .then(function (response) {
                    if (response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }
                });
        }
    }
})();
