/**
 * Created by Andrew on 2/29/16.
 */
(function() {
    angular
        .module("ProjectIssuesApp")
        .factory("IssueService", IssueService);

    function IssueService() {
        var model = {
            issues: [
                {"_id": "000", "title": "Do the dishes", "priority": "high", "description": "put a description here", "assignee": "Andrew", "image": 0, "userId": 0},
                {"_id": "001", "title": "Take out the trash", "priority": "very high", "description": "put a description here", "assignee": "Brian", "image": 1,"userId": 1},
                {"_id": "002", "title": "Clean my room", "priority": "medium", "description": "put a description here", "assignee": "Andrew", "image": 2,"userId": 0},
                {"_id": "003", "title": "Buy groceries", "priority": "low", "description": "put a description here", "assignee": "Andrew", "image": 3, "userId": 0}
            ]
            ,
            images: [
                {"_imageId": 0, "imageTitle": "Image 1", "location": "put location here"},
                {"_imageId": 1, "imageTitle": "Image 2", "location": "put location here"},
                {"_imageId": 2, "imageTitle": "Image 3", "location": "put location here"},
                {"_imageId": 3, "imageTitle": "Image 4", "location": "put location here"}
            ]
            ,
            createIssueForUser: createIssueForUser,
            findAllIssuesForUser: findAllIssuesForUser,
            deleteIssueById: deleteIssueById,
            updateIssueById: updateIssueById
        };
        return model;

        function createIssueForUser(userId, issue, callback) {
            var issue = {
                _id: (new Date).getTime(),
                title: issue.title,
                priority: issue.priority,
                assignee: issue.assignee,
                image: issue.image,
                userId: userId

            };
            model.issues.push(issue);
            callback(issue);
        }

        function findAllIssuesForUser(userId, callback) {
            var listOfIssues = [];
            for (var issue in model.issues) {
                if (model.issues[issue].userId === userId) {
                    listOfIssues.push(model.issues[issue]);
                }
            }
            callback(listOfIssues);

        }

        function deleteIssueById(issueId, callback) {
            for (var issue in model.issues) {
                if (model.issues[issue]._id === issueId) {
                    model.issues.splice(issue, 1);
                }
                console.log(issueId)
                callback(model.issues);
            }
        }

        function updateIssueById(issueId, newIssue, callback) {
            for (var issue in model.issues) {

                if (model.issues[issue]._id === issueId) {
                    model.issues[issue].title = newIssue.title;
                    model.issues[issue].priority = newIssue.priority;
                    model.issues[issue].description = newIssue.description;
                    model.issues[issue].assigned = newIssue.assigned;
                    model.issues[issue].image = newIssue.image;
                    callback(model.issues[issue]);
                }
            }
        }
    }
})();