/**
 * Created by Andrew on 2/23/16.
 */
(function(){
    angular
        .module("ProjectIssuesApp")
        .controller("IssueController", IssueController);

    function IssueController(IssueService, $rootScope, $routeParams, Upload, RoomService, UserService) {

        var vm = this;
        vm.addIssue = addIssue;
        vm.updateIssue = updateIssue;
        vm.deleteIssue = deleteIssue;
        vm.selectIssue = selectIssue;
        vm.updateIssueDetails = updateIssueDetails;
        vm.uploadPhoto = uploadPhoto;
        vm.findAllRoomsForUser = findAllRoomsForUser;
        vm.getUsersInSystem = getUsersInSystem;

        //The issue in the routeParams
        vm.issue = null;
        //The list of issues particular to a user
        vm.issues = [];
        vm.issueId = null;
        vm.users = [];

        function getUsersInSystem(){
          UserService.findAllUsers()
            .then(function(response){
              if(response){
                console.log(response.data)
                for (var user in response.data){
                  vm.users.push(response.data[user]);
                }
                console.log(vm.users);
              }
            })
        }
        getUsersInSystem();

        function findAllRoomsForUser(){

          RoomService.findRoomsUserBelongs($rootScope.currentUser._id)
            .then(function(response){
                if(response.data){
                  vm.rooms = response.data
                }

            });
        }

        findAllRoomsForUser();

        function init() {
            if ($routeParams.issueId) {
                issueId = $routeParams.issueId;
                IssueService.findIssueById(issueId)
                    .then(function (response) {
                        if (response.data) {
                            vm.issue = response.data;

                        }
                    });
            }
            else {
                IssueService.findAllIssuesForUser($rootScope.currentUser._id)
                    .then(function (response) {
                        if (response.data) {
                            vm.issues = response.data;
                        }
                    });
            }
        }

        init();

        function addIssue(issue) {

            IssueService.createIssueForUser($rootScope.currentUser._id, issue)
                .then(function (response) {
                    if (response.data) {
                        vm.issues.push(response.data);
                        console.log("Issue created:" + response.data)
                    }
                });
            //RoomService.updateRoomIssuesById(issueId, roomId)
            //  .then(function(response){
            //      if(response){
            //        console.log("Updated room with issue...")
            //      }
            //  });
            //    });
        }

        function updateIssue(issue) {
            IssueService.updateIssueById(issue._id, issue)
                .then(function (response) {
                    if (response.data) {
                        delete vm.issue;
                    }
                });
            //delete $scope.form;
        }


        function updateIssueDetails(issue) {
            IssueService.updateIssueById(issue._id, issue)
                .then(function (response) {
                    if (response.data) {
                    }
                });
            //delete $scope.form;
        }

        function selectIssue(issueIndex) {
            //Select the form
            vm.issue = vm.issues[issueIndex];
        }

        function deleteIssue(issueIndex) {
            var issueId = vm.issues[issueIndex]._id;
            //Delete the selected form
            IssueService.deleteIssueById(issueId)
                .then(init());
        }


        function uploadPhoto(image) {
            Upload.upload({
                url: '/api/project/photo/',
                data: {file: image}

            }).then(
                function (response) {
                    vm.issue.image = response.data;
                    updateIssueDetails(vm.issue);
                }
            )
        }
    }

})();
