/**
 * Created by Andrew on 2/23/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController(UserService, $location, $scope) {
        console.log($location);
        $scope.$location = $location;
        $scope.logout = logout;


        function logout() {
        UserService.setCurrentUser(null);
        $location.url("/home");
        }
    }

})();