/**
 * Created by Andrew on 2/23/16.
 */
(function () {
    angular
        .module("ProjectIssuesApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, IssueService, $rootScope, $location, $routeParams) {

        var vm = this;
        vm.update = update;
        vm.issues = [];
        vm.userId = null;


        function init() {
            vm.user = UserService.getLoggedIn();

            if ($routeParams.userId) {
                userId = $routeParams.userId;

                IssueService.findAllIssuesForUser(userId)
                    .then(function(response){
                        if(response.data) {
                            console.log(response.data);
                            vm.issues = response.data;
                        }
                    });

                UserService.findUserById(userId)
                    .then(function(response){
                        if(response.data) {
                            console.log(response.data);
                            vm.viewedUser = response.data;
                        }
                    });

            }
            else {

                IssueService.findAllIssuesForUser($rootScope.currentUser._id)
                    .then(function (response) {
                        if (response.data) {
                            console.log(response.data);
                            vm.issues = response.data;
                        }
                    });
            }
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