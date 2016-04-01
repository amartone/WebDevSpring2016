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
            UserService.getCurrentUser()
                .then(function(response){
                    vm.user=response.data;
                });
        }

        init();

        function update(user) {
            console.log(user.username);
            console.log(user._id);
            UserService
                .updateUser(user._id, user)
                .then(function (response) {
                    var currentUser = response.data;
                    if(currentUser){
                        UserService.setCurrentUser(currentUser);
                        $location.url("/profile");
                    }
                });
        }
    }
})();