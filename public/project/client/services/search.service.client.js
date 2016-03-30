(function () {
    angular
        .module("ProjectIssuesApp")
        .factory("SearchService", searchService);

    function searchService($http) {
        var api = {
            search: search
        };
        return api;

        function search(keywords) {
            return $http.get("/api/project/search?keywords=" + keywords);
        }
    }

})();