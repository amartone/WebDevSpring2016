/**
 * Created by Andrew on 2/23/16.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $rootScope, $location) {

        var vm = this;
        vm.update = update;

        function init() {
            vm.user = UserService.getLoggedIn();
        }

        init();

        function update(user) {
            console.log(user.username);
            console.log(user._id);
            UserService
                .updateUser(user._id, user)
                .then(function (response) {
                    console.log(response.data);
                    UserService.setCurrentUser(response.data);
                    $location.url("/profile")

                });
        }
    }
})();