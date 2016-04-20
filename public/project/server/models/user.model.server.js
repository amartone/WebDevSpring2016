/**
 * Created by Andrew on 3/15/16.
 */

var mock = require("./user.mock.json");
var q = require("q");

module.exports = function (uuid, db, mongoose) {

  var UserSchema = require("./user.schema.server.js")(mongoose);

      // create user model from schema
    var UserModel = mongoose.model('User', UserSchema);

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        searchByKeywords: searchByKeywords

    };
    return api;

    function searchByKeywords(keywords) {

      // issueModel.createIndex({
      //   title: "text",
      //   description: "text"
      // });

      var deferred = q.defer();

      UserModel.find({$text: {$search: keywords}}, function(err, doc){
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

    function createUser(user) {
        user.photo = "./img/linkedin.jpg";
        user.registeredOn = (new Date()).getTime()

        var deferred = q.defer();

           UserModel.create(user, function(err, doc){

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

    function updateUser(userId, user) {

        var deferred = q.defer();
        UserModel.findByIdAndUpdate(userId, user, {new:true}, function(err, doc){
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


    function findUserById(userId) {
      var deferred = q.defer();
    UserModel.findOne({userId: userId}, function (err, doc) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(doc);
        }
    });
    return deferred.promise;
}

    function deleteUser(userId) {
      var deferred = q.defer();

      UserModel.remove({_id: userId}, function (err, doc) {
          if (err) {
              deferred.reject(err);
          } else {
              deferred.resolve(doc);
          }
      });
      return deferred.promise;

    }

    function findAllUsers() {
      var deferred = q.defer();
      UserModel.find({}, function(err, doc) {
          if(err){
            deferred.reject(err);
          }
          else{
            deferred.resolve(doc);
              console.log("All users: " + doc)
          }

      });
      return deferred.promise;
    }

    function findUserByUsername(username) {
        for (u in mock) {
            if (mock[u].username === username) {
                return mock[u];
            }
        }
        return null;
    }

    function findUserByCredentials(username, password) {
      var deferred = q.defer();

    // find one retrieves one document
    UserModel.findOne(

        // first argument is predicate
        { username: username,
            password: password },

        // doc is unique instance matches predicate
        function(err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

    return deferred.promise;
}


};
