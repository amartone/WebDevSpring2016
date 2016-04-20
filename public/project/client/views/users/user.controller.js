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

    function UserController(UserService) {
        var vm = this;

        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;
        vm.users = null;


        function showUsers() {
            UserService.findAllUsers()
                .then(function(response){
                    if(response.data){
                        console.log(response.data);
                        vm.users = response.data;
                    }
                });
        }

        showUsers();

        function addUser(user) {
            UserService.register(user)
                .then(function(response){
                    if(response.data){
                        console.log(response.data);
                        vm.users.push(response.data);
                    }
                })
        }

        function updateUser(user){
            UserService.updateUser(user._id, user)
                .then(function(response){
                    if(response.data){
                        console.log(response.data);
                        delete vm.user;
                    }
                });
            //delete $scope.user;
        }

        function selectUser(userIndex){
            //Select the issue
            vm.user = vm.users[userIndex];
        }

        function deleteUser(userIndex){
            var userId = vm.users[userIndex]._id;
            //Delete the selected issue
            UserService.deleteUserById(userId)
                .then(showUsers())
        }
    }
})();
