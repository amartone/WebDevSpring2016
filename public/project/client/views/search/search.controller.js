/**
 * Created by Andrew on 2/23/16.
 */
(function(){
    angular
        .module("ProjectIssuesApp")
        .controller("SearchController", SearchController);


    function SearchController(SearchService, $location) {

        var vm = this;
        vm.searchByKeywords = searchByKeywords;
        console.log($location.search());
        vm.keywords = $location.search().keyword.toString();


        vm.issueResults = null;
        vm.roomResults = null;
        vm.userResults = null;

        function searchByKeywords(keywords){
            SearchService.searchByKeywordsInIssues(keywords)
                .then(function(response){
                    if(response.data) {
                        vm.issueResults = response.data;
                    }
                });
            SearchService.searchByKeywordsInRooms(keywords)
                    .then(function(response){
                        if(response.data) {
                            vm.roomResults = response.data;
                        }
                    });
            SearchService.searchByKeywordsInUsers(keywords)
                        .then(function(response){
                            if(response.data) {
                                vm.userResults = response.data;
                            }
                        });
        }

        searchByKeywords(vm.keywords);


    }
})();
