/**
 * Created by Andrew on 3/11/16.
 */
/**
 * Created by Andrew on 2/23/16.
 */
(function(){
    angular
        .module("ProjectIssuesApp")
        .controller("UserController", UserController);

    function UserController(UserService, $scope, $rootScope) {
        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;

        function showUsers() {
            var callback = function(response){
                $scope.users = response;
                console.log($scope.users);
            };

            UserService.findAllUsers(callback);
        }

        showUsers();

        function addUser(user) {
            UserService.createUser(user, showUsers);
        }

        function updateUser(user){
            UserService.updateUser(user._id, user, showUsers);
            delete $scope.user;
        }

        function selectUser(userIndex){
            //Select the issue
            $scope.user = $scope.users[userIndex];
        }

        function deleteUser(user){
            //Delete the selected issue
            UserService.deleteUserById(user._id, showUsers);
        }
    }
})();