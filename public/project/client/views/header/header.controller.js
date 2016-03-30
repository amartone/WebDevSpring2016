/**
 * Created by Andrew on 2/23/16.
 */
(function(){
    angular
        .module("ProjectIssuesApp")
        .controller("HeaderController", HeaderController);

    function HeaderController(UserService, $location) {
        var vm = this;
        vm.logout = logout;
        vm.search = search;

        function logout() {
            UserService.logout();
            $location.url("/home");

        }

        function search(keywords){
            $location.path("/search");
            $location.search("keyword", keywords);
        }
    }
})();