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


        function searchByKeywords(keywords){
            SearchService.search(keywords)
                .then(function(response){
                    if(response.data) {
                        console.log(response.data);
                        vm.searchResults = response.data;
                    }
                });
        }

        searchByKeywords(vm.keywords);


    }
})();