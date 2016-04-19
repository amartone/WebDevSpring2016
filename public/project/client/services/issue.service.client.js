/**
 * Created by Andrew on 3/28/16.
 */
(function () {
    angular
        .module("ProjectIssuesApp")
        .factory("IssueService", issueService);

    function issueService($http) {
        var api = {
            createIssueForUser: createIssueForUser,
            findAllIssuesForUser: findAllIssuesForUser,
            deleteIssueById: deleteIssueById,
            updateIssueById: updateIssueById,
            findIssueById: findIssueById
        };
        return api;

        function createIssueForUser(userId, issue) {
            return $http.post("/api/project/user/" + userId + "/issue", issue);
        }

        function findAllIssuesForUser(userId) {
            console.log("getting issues ");

            return $http.get("/api/project/user/" + userId + "/issue")
        }

        function deleteIssueById(issueId, issue) {
            return $http.delete("/api/project/issue/" + issueId, issue);
        }

        function updateIssueById(issueId, issue) {
            return $http.put("/api/project/issue/" + issueId, issue);
        }

        function findIssueById(issueId){
            return $http.get("/api/project/issue/" + issueId);


        }

    }

})();
