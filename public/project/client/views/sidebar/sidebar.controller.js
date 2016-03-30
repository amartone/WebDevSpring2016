/**
 * Created by Andrew on 2/24/16.
 */
(function(){
    angular
        .module("ProjectIssuesApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($rootScope, $location, $scope) {
        console.log($location);
        $scope.$location = $location;
    }
})();

