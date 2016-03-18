/**
 * Created by Andrew on 2/23/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController(UserService, $location) {
        var vm = this;
        vm.logout = logout;


        function logout() {
            UserService.logout();
            $location.url("/home");

        }
    }
})();