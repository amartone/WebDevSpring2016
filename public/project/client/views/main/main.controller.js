/**
 * Created by Andrew on 2/24/16.
 */
(function(){
    angular
        .module("ProjectIssuesApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }
})();