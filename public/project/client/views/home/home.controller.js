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
        vm._issues = [];
        vm.test = "Hi";
        vm.user = 0;
        vm.rooms = []
        vm.getNumIssues = getNumIssues;

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

                IssueService.findIssuesWhereAsignee(vm.user)
                .then(function(response){
                  if(response.data){
                    console.log("Got all the issues" + response.data)
                    vm.issues = response.data;
                  }

                });
        }
        showIssues();


        function getNumIssues(roomId) {
          console.log("The room id:" +roomId)
            IssueService.getIssuesByRoomId(roomId)
                .then(function (response) {
                    if (response.data) {
                      console.log("num issues:" + response.data)

                        vm._issues = response.data;
                    }

                });
                return vm._issues;
        }
        getNumIssues();

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
