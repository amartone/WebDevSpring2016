module.exports = function (uuid, issueModel, userModel) {

    var api = {
        searchByKeywords: searchByKeywords
    };
    return api;

    function searchByKeywords(keywords) {

        //Break up the keywords into list of keywords
        var issueResults = [];

        //Search each domain object for each keyword. If match found, return result.

            var issueResultId = issueModel.findIssueById(keywords);
            var issueResultTitle = issueModel.findIssueByTitle(keywords);
            if (issueResultId) {
                issueResults.push(issueResultId);
            }
            if(issueResultTitle){
                issueResults.push(issueResultTitle);
            }

        return issueResults;
    }


    };