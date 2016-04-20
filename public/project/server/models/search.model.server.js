
var q = require("q");
module.exports = function (uuid, issueModel, userModel, db, mongoose) {

    var api = {
        searchByKeywords: searchByKeywords
    };
    return api;

    function searchByKeywords(keywords) {

      // issueModel.createIndex({
      //   title: "text",
      //   description: "text"
      // });

      var deferred = q.defer();

      issueModel.find({$text: {$search: keywords}}, function(err, doc){
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

    };
