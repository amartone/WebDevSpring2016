module.exports = function (app, issueModel) {
    app.get("/api/project/user/:userId/issue", getIssuesForUser);
    app.get("/api/project/issue/:issueId", getIssueById);
    app.delete("/api/project/issue/:issueId", deleteIssue);
    app.post("/api/project/user/:userId/issue", createIssueForUser);
    app.put("/api/project/issue/:issueId", updateIssue);

    function getIssuesForUser(req, res) {
        console.log("here");
        var userId = req.params.userId;
        console.log(userId);
        res.json(issueModel.findIssuesByUserId(userId));
    }

    function getIssueById(req, res) {
        var issueId = req.params.issueId;
        res.json(issueModel.findIssueById(issueId));
    }

    function deleteIssue(req, res) {
        var issueId = req.params.issueId;
        issueModel.deleteIssue(issueId);
        res.send(200);
    }

    function createIssueForUser(req, res) {
        var userId = req.params.userId;
        var issue = req.body;
        res.json(issueModel.createIssueForUser(issue, userId));
    }

    function updateIssue(req, res) {
        var issueId = req.params.issueId;
        var issue = req.body;
        res.json(issueModel.updateIssue(issueId, issue));
    }
};