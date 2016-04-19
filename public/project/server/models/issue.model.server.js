
 var mock = require("./issue.mock.json"); //remove
 var q = require("q");

module.exports = function (db, mongoose) {

    var IssueSchema= require("./issue.schema.server.js")(mongoose);
    var IssueModel = mongoose.model('Issue', IssueSchema);

    var api = {
        createIssueForUser: createIssueForUser,
        findAllIssues: findAllIssues,
        findIssueById: findIssueById,
        updateIssue: updateIssue,
        deleteIssue: deleteIssue,
        findIssueByTitle: findIssueByTitle,
        findIssuesByUserId: findIssuesByUserId

    };
    return api;

    function createIssueForUser(issue, userId) {
        var deferred = q.defer();

        var newIssue = {
          userId: userId,
          title: issue.title,
          priority: issue.priority,
          description: issue.description,
          assignee: issue.assignee,
          created: (new Date()).getTime(),
          updated: (new Date()).getTime()
        };

        IssueModel.create(newIssue, function(err, doc){
                    if (err) {
                        // reject promise if error
                        deferred.reject(err);
                    } else {
                        // resolve promise
                        deferred.resolve(doc);
                    }

                });
                // return a promise
                return deferred.promise;
    }


    function findAllIssues() { //need to refactor
        return mock;
    }

    function findIssueById(issueId) {
      var deferred = q.defer();

      IssueModel.findById(issueId, function(err, doc) {
          if (err) {
              deferred.reject(err);
          } else {
              deferred.resolve(doc);
          }
      });
      return deferred.promise;
  }

    function updateIssue(issueId, issue){
    var deferred = q.defer();

    issue.updated = (new Date()).getTime();
    issue.image = issue.image.replace("./" , "");

    IssueModel.findByIdAndUpdate(issueId, {$set: issue}, {new:true, upsert:true}, function (err, doc) {
                if (err) {
                      deferred.reject(err);
                } else {
                    console.log("Issue updated in model: " + doc);
                    deferred.resolve(doc);
                }
            });
            return deferred.promise;

        }

    function deleteIssue(issueId, issue) {
      var deferred = q.defer();

      IssueModel.remove({_id: issueId}, function (err, doc) {
          if (err) {
              deferred.reject(err);
          } else {
              deferred.resolve(doc);
          }
      });
      return deferred.promise;
    }

    // Potentially refactor
    function findIssueByTitle(issueTitle) {

        for (var f in mock) {
            if (mock[f].title === formTitle) {
                return mock[f];
            }
        }
        return null;
    }

    function findIssuesByUserId(userId) {
        var deferred = q.defer();

        IssueModel.find({userId: userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }
}
