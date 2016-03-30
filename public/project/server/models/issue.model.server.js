var mock = require("./issue.mock.json");
module.exports = function (uuid) {

    var api = {
        createIssueForUser: createIssueForUser,
        findAllIssues: findAllIssues,
        findIssueById: findIssueById,
        updateIssue: updateIssue,
        deleteIssue: deleteIssue,
        findIssueByTitle: findIssueByTitle,
        findIssuesByUserId: findIssuesByUserId,

    };
    return api;



    function createIssueForUser(issue, userId) {
        issue._id = uuid.v1();
        issue.userId = userId;

        mock.push(issue);
        return issue;
    }

    function findAllIssues() {
        return mock;
    }

    function findIssueById(issueId) {
        for (u in mock) {
            if (mock[u]._id === issueId) {
                return mock[u];
            }
        }
        return null;

    }

    function updateIssue(issueId, issue) {
        console.log(issueId);
        for (var u in mock) {
            if (mock[u]._id == issueId) {
                mock[u].title = issue.title;
                mock[u].priority = issue.priority;
                mock[u].description = issue.description;
                mock[u].assignee = issue.assignee;
                return mock[u];
            }
        }
    }

    function deleteIssue(formId, form) {
        for (var u in mock) {
            if (mock[u]._id == formId) {
                mock.splice(u, 1);
            }
        }
    }

    function findIssueByTitle(formTitle) {

        for (var f in mock) {
            if (mock[f].title === formTitle) {
                return mock[f];
            }
        }
        return null;
    }

    function findIssuesByUserId(userId) {
        var listOfIssues = [];
        for (var f in mock) {
            if (mock[f].userId == userId) {
                listOfIssues.push(mock[f]);
            }
        }
        return listOfIssues;
    }

}