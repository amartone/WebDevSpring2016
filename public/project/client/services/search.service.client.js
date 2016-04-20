(function () {
    angular
        .module("ProjectIssuesApp")
        .factory("SearchService", searchService);

    function searchService($http) {
        var api = {
            searchByKeywordsInIssues: searchByKeywordsInIssues,
            searchByKeywordsInRooms: searchByKeywordsInRooms,
            searchByKeywordsInUsers: searchByKeywordsInUsers
        };
        return api;

        function searchByKeywordsInIssues(keywords) {
            return $http.get("/api/project/search/issues?keywords=" + keywords);
        }
        function searchByKeywordsInRooms(keywords) {
            return $http.get("/api/project/search/rooms?keywords=" + keywords);
        }
        function searchByKeywordsInUsers(keywords) {
            return $http.get("/api/project/search/users?keywords=" + keywords);
        }
    }

})();
