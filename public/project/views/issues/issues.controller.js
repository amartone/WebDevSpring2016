/**
 * Created by Andrew on 2/23/16.
 */
(function(){
    angular
        .module("ProjectIssuesApp")
        .controller("IssueController", IssueController);

    function IssueController(IssueService, $scope, $rootScope) {
        $scope.addIssue = addIssue;
        $scope.updateIssue = updateIssue;
        $scope.deleteIssue = deleteIssue;
        $scope.selectIssue = selectIssue;

        function showIssues() {
            var callback = function(response){
                $scope.issues = response;
                console.log($scope.issues);
            };

            IssueService.findAllIssuesForUser($rootScope.currentUser._id, callback);
        }

        showIssues();

        function addIssue(issue) {
            IssueService.createIssueForUser($rootScope.currentUser._id, issue, showIssues);
        }

        function updateIssue(issue){
            IssueService.updateIssueById(issue._id, issue, showIssues);
            delete $scope.issue;
        }

        function selectIssue(issueIndex){
            //Select the issue
            $scope.issue = $scope.issues[issueIndex];
        }

        function deleteIssue(issue){
            //Delete the selected issue
            console.log(issue)
            IssueService.deleteIssueById(issue._id, showIssues);
        }
    }
})();