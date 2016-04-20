/**
 * Created by Andrew on 2/23/16.
 */
(function(){
    angular
        .module("ProjectIssuesApp")
        .controller("HomeController", HomeController);

    function HomeController (IssueService, RoomService, $rootScope, $routeParams) {

        var vm = this;
        vm.issues = [];
        vm.test = "Hi";
        vm.user = 0;
        vm.rooms = []
        function showIssues() {
            if($rootScope.currentUser){
                vm.user = $rootScope.currentUser._id;
            }
            IssueService.findAllIssuesForUser(vm.user)
                .then(function(response){
                    if(response.data) {
                        console.log(response.data);
                        vm.issues = response.data;
                    }
                });
        }
        showIssues();

        function showRooms(){

          RoomService.findRoomsUserBelongs(vm.user)
            .then(function(response){

              if(response.data){
                console.log(response.data);
                vm.rooms = response.data;
              }
            });
        }
        showRooms();

    }
})();
