/**
 * Created by Andrew on 2/29/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var model = {
            issues: [
                {"_id": "000", "title": "Do the dishes", "priority": "high", "description": "put a description here", "assigned": [0, 1], "image": 0, "userId": 0},
                {"_id": "001", "title": "Take out the trash", "priority": "very high", "description": "put a description here", "assigned": [0, 1], "image": 1,"userId": 1},
                {"_id": "002", "title": "Clean my room", "priority": "medium", "description": "put a description here", "assigned": [0,1], "image": 2,"userId": 0},
                {"_id": "003", "title": "Buy groceries", "priority": "low", "description": "put a description here", "assigned": [0], "image": 3, "userId": 0}
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

        function createIssueForUser(userId, issueForm, callback) {
            var issue = {
                _id: (new Date).getTime(),
                title: issueForm.title,
                priority: issueForm.priority,
                assigned: issueForm.assigned,
                image: issueForm.image,
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

        function deleteIssueById(issueFormId, callback) {
            for (var form in model.forms) {
                if (model.issues[form]._id === issueFormId) {
                    model.issues.splice(form, 1);
                }
                callback(model.issues);
            }
        }

        function updateIssueById(issueFormId, newIssuesForm, callback) {
            for (var issue in model.issues) {

                if (model.issues[issue]._id === issueFormId) {
                    model.issues[issue].title = newIssuesForm.title;
                    model.issues[issue].priority = newIssuesForm.priority;
                    model.issues[issue].description = newIssuesForm.description;
                    model.issues[issue].assigned = newIssuesForm.assigned;
                    model.issues[issue].image = newIssuesForm.image;
                    callback(model.issues[issue]);
                }
            }
        }
    }
})();