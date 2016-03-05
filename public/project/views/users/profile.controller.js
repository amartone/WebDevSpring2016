/**
 * Created by Andrew on 2/23/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, UserService) {

        $scope.update = update;
        $scope.user = $rootScope.currentUser;

        function update(user) {

            var callback = function(response){
                $rootScope.currentUser = response;
                console.log($rootScope.currentUser);
                console.log("Succesfully updated profile");
            };

            UserService.updateUser(user._id, user, callback);
        }
    }
})();